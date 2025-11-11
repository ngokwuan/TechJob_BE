# User Login

## Endpoint

`POST /auth/user/login`

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
| email    | string    | \*       | Email             |
| token    | string    | \*       | JWT token         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Login Successful      | -                         |
| 401    | Unauthorized          | Email/Password không đúng |
| 500    | Internal Server Error | -                         |
