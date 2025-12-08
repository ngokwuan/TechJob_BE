# Get User Detail

## Endpoint

`GET /users/me`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    | \*       | User ID           |
| fullName | string    | \*       | Họ và tên         |
| email    | string    | \*       | Email             |
| phone    | string    | \*       | SDT               |
| avatar   | string    | \*       | Ảnh đại diện      |
| gender   | string    | \*       | Giới tính         |
| role     | string    | \*       | Quyền truy cập    |

## Status

| Status | Message                    | Error Reason       |
| ------ | -------------------------- | ------------------ |
| 200    | Get User Detail Successful | -                  |
| 404    | Not Found                  | User không tồn tại |
| 500    | Internal Server Error      | -                  |
