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

| JSON Key            | Data Type | Required | Value Description |
| ------------------- | --------- | -------- | ----------------- |
| company             | object    | \*       | Công ty           |
| company.id          | string    | \*       | ID công ty        |
| company.role        | string    | \*       | Quyền hạn         |
| company.companyName | string    | \*       | Tên công ty       |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 201    | Successful            | -                    |
| 400    | Bad Request           | Dữ liệu không hợp lệ |
| 409    | Conflict              | Email đã tồn tại     |
| 500    | Internal Server Error | -                    |
