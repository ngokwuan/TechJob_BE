# Get Account

## Endpoint

`GET /auth/check`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| id       | string    | \*       | ID                |
| fullName | string    | \*       | Họ và tên         |
| email    | string    | \*       | Email             |
| role     | string    | \*       | Quyền truy cập    |

## Status

| Status | Message               | Error Reason       |
| ------ | --------------------- | ------------------ |
| 200    | Successful            | -                  |
| 404    | Not Found             | User không tồn tại |
| 500    | Internal Server Error | -                  |
