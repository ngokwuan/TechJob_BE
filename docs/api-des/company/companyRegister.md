# Company Registration

## Endpoint

`POST /api/auth/companies/register`

## Request Data

| JSON Key    | Data Type | Required | Value Description      |
| ----------- | --------- | -------- | ---------------------- |
| companyName | string    | \*       | Tên công ty            |
| email       | string    | \*       | Email công ty (unique) |
| password    | string    | \*       | Mật khẩu (min 6 ký tự) |
| phone       | string    | \*       | Số điện thoại          |
| address     | string    |          | Địa chỉ                |
| cityId      | string    | \*       | ID thành phố           |

## Response Data

| JSON Key    | Data Type | Required | Value Description |
| ----------- | --------- | -------- | ----------------- |
| companyId   | string    | \*       | Company ID        |
| companyName | string    | \*       | Tên công ty       |
| email       | string    | \*       | Email             |
| createdAt   | string    | \*       | Thời gian tạo     |
| token       | string    | \*       | JWT token         |

## Status

| Status | Message                         | Error Reason                          |
| ------ | ------------------------------- | ------------------------------------- |
| 201    | Company Registration Successful | -                                     |
| 400    | Bad Request                     | Email đã tồn tại/Dữ liệu không hợp lệ |
| 500    | Internal Server Error           | -                                     |
