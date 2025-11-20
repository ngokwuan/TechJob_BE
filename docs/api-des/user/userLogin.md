# User Login

## Endpoint

`POST /auth/users/login`

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| email    | string    | \*       | Email đã đăng ký  |
| password | string    | \*       | Mật khẩu          |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    | \*       | User ID           |
| fullName | string    | \*       | Họ và tên         |
| role     | string    | \*       | Quyền hạn         |
| token    | string    | \*       | JWT token         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Login Successful      | -                         |
| 400    | Bad request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Email/Password không đúng |
| 500    | Internal Server Error | -                         |
