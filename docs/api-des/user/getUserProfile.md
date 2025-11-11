# Get Job Detail

## Endpoint

`GET /users/me`

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    | \*       | User ID           |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    | \*       | User ID           |
| fullName | string    | \*       | Họ và tên         |
| email    | string    | \*       | Email             |

## Status

| Status | Message                    | Error Reason       |
| ------ | -------------------------- | ------------------ |
| 200    | Get User Detail Successful | -                  |
| 404    | Not Found                  | User không tồn tại |
| 500    | Internal Server Error      | -                  |
