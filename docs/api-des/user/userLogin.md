# User Login

## Endpoint

`POST /auth/users/login`

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| email    | string    | \*       | Email đã đăng ký  |
| password | string    | \*       | Mật khẩu          |

## Response Data

| JSON Key      | Data Type | Required | Value Description |
| ------------- | --------- | -------- | ----------------- |
| accessToken   | string    | \*       | Token             |
| user          | object    | \*       | Người dùng        |
| user.id       | string    | \*       | ID người dùng     |
| user.role     | string    | \*       | Quyền hạn         |
| user.fullName | string    | \*       | Họ và tên         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 400    | Bad request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Email/Password không đúng |
| 500    | Internal Server Error | -                         |
