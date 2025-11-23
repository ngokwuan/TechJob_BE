# User Registration

## Endpoint

`POST  /auth/users/register`

## Request Data

| JSON Key | Data Type | Required | Value Description      |
| -------- | --------- | -------- | ---------------------- |
| fullName | string    | \*       | Họ và tên              |
| email    | string    | \*       | Email (unique)         |
| password | string    | \*       | Mật khẩu (min 6 ký tự) |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    | \*       | User ID           |
| fullName | string    | \*       | Họ và tên         |
| role     | string    | \*       | Quyền hạn         |

## Status

| Status | Message                      | Error Reason         |
| ------ | ---------------------------- | -------------------- |
| 201    | User Registration Successful | -                    |
| 400    | Bad Request                  | Dữ liệu không hợp lệ |
| 409    | Conflict                     | Email đã tồn tại     |
| 500    | Internal Server Error        | -                    |
