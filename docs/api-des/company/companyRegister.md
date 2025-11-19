# Company Registration

## Endpoint

`POST /auth/companies/register`

## Request Data

| JSON Key    | Data Type | Required | Value Description      |
| ----------- | --------- | -------- | ---------------------- |
| companyName | string    | \*       | Tên công ty            |
| email       | string    | \*       | Email công ty (unique) |
| password    | string    | \*       | Mật khẩu (min 6 ký tự) |

## Response Data

| JSON Key    | Data Type | Required | Value Description |
| ----------- | --------- | -------- | ----------------- |
| companyId   | string    | \*       | Company ID        |
| companyName | string    | \*       | Tên công ty       |
| role        | string    | \*       | Quyền hạn         |

## Status

| Status | Message                         | Error Reason                          |
| ------ | ------------------------------- | ------------------------------------- |
| 201    | Company Registration Successful | -                                     |
| 400    | Bad Request                     | Email đã tồn tại/Dữ liệu không hợp lệ |
| 500    | Internal Server Error           | -                                     |
