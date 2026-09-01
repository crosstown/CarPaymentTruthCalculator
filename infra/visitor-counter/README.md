# Visitor counter backend

The site is otherwise fully static (`output: "export"`, no server) --
this is the one exception, a tiny public HTTP endpoint that atomically
increments a page-view count in DynamoDB and returns the new total.
Called from `src/components/VisitorCounter.tsx` on every page load.

Same pattern as paycheckovertime.com's counter (see that project's
`infra/visitor-counter/README.md`) -- a fully separate stack per
domain, not a shared counter, so each site's page-view count is its
own.

## AWS resources (account 654654435055, us-east-1)

- **DynamoDB table**: `car-payment-truth-visitor-counter` (on-demand
  billing, single item `{id: "pageviews", count: N}`)
- **Lambda function**: `car-payment-truth-visitor-counter`
  (`index.mjs` in this directory), Node.js 20.x, IAM role
  `car-payment-truth-visitor-counter-role` (basic execution +
  `dynamodb:UpdateItem` scoped to just that one table)
- **Function URL**: `https://2vx4ejvk4ffruv45ns746k6w2a0piezu.lambda-url.us-east-1.on.aws/`,
  `AuthType: NONE` (public), CORS restricted to
  `https://carpaymenttruth.com` + `http://localhost:3010` (this
  project's dev port)

## The October-2025 Lambda gotcha

Public (`AuthType: NONE`) Function URLs created via the CLI/API (not
the console) need **two** separate resource-policy statements, not
one -- this changed in October 2025 and isn't obvious from a first
read of the docs:

```bash
# 1. Allow invoking the URL itself
aws lambda add-permission \
  --function-name car-payment-truth-visitor-counter \
  --statement-id FunctionURLAllowPublicAccess \
  --action lambda:InvokeFunctionUrl \
  --principal '*' \
  --function-url-auth-type NONE

# 2. Allow the underlying function invocation, restricted to
#    function-URL-originated calls
aws lambda add-permission \
  --function-name car-payment-truth-visitor-counter \
  --statement-id FunctionURLInvokeAllowPublicAccess \
  --action lambda:InvokeFunction \
  --principal '*' \
  --invoked-via-function-url
```

Missing the second statement produces a 403 Forbidden with no
indication of which permission is missing.

## A separate gotcha hit setting this one up: stale AWS CLI

The AWS CLI installed on this machine (`aws-cli/1.22.82`,
Feb-2022-era botocore) predates Function URL support entirely --
`aws lambda create-function-url-config` isn't even a recognized
subcommand on that version, no error message pointing at the version
being the problem. Fixed with:

```bash
python3 -m pip install --upgrade --user awscli
```

## Redeploying the function after a code change

```bash
cd infra/visitor-counter
zip -X function.zip index.mjs
aws lambda update-function-code \
  --function-name car-payment-truth-visitor-counter \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## Resetting the counter

```bash
aws dynamodb put-item \
  --table-name car-payment-truth-visitor-counter \
  --item '{"id":{"S":"pageviews"},"count":{"N":"0"}}' \
  --region us-east-1
```
