# Company Login

## Endpoint

`POST /auth/companies/login`

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| email    | string    | \*       | Email công ty     |
| password | string    | \*       | Mật khẩu          |

## Response Data

| JSON Key            | Data Type | Required | Value Description |
| ------------------- | --------- | -------- | ----------------- |
| accessToken         | string    | \*       | JWT token         |
| company             | object    | \*       | Công ty           |
| company.id          | string    | \*       | Company ID        |
| company.role        | string    | \*       | Quyền hạn         |
| company.companyName | string    | \*       | Tên công ty       |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 400    | Bad request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Email/Password không đúng |
| 500    | Internal Server Error | -                         |
