# Company Login

## Endpoint

`POST /auth/companies/login`

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| email    | string    | \*       | Email công ty     |
| password | string    | \*       | Mật khẩu          |

## Response Data

| JSON Key    | Data Type | Required | Value Description |
| ----------- | --------- | -------- | ----------------- |
| companyId   | string    | \*       | Company ID        |
| companyName | string    | \*       | Tên công ty       |
| email       | string    | \*       | Email             |
| token       | string    | \*       | JWT token         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Login Successful      | -                         |
| 401    | Unauthorized          | Email/Password không đúng |
| 500    | Internal Server Error | -                         |
