# Get all job in company without role

## Endpoint

`GET /jobs/all`

## Request Data

| JSON Key  | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| companyId | string    | \*       | Id công ty        |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| job[]    | array     |          | Mảng công việc    |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
