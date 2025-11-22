# Get Company Profile

## Endpoint

`GET /companies/me`

## Headers

| Header        | Value          |
| ------------- | -------------- |
| Authorization | Bearer {token} |

## Response Data

| JSON Key    | Data Type | Required | Value Description |
| ----------- | --------- | -------- | ----------------- |
| companyId   | string    | \*       | Company ID        |
| companyName | string    | \*       | Tên công ty       |
| email       | string    | \*       | Email             |
| address     | string    | \*       | Địa chỉ           |
| cityID      | string    | \*       | ID thành phố      |
| phone       | string    | \*       | Số điện thoại     |
| logo        | string    | \*       | Logo công ty      |

## Status

| Status | Message                       | Error Reason          |
| ------ | ----------------------------- | --------------------- |
| 200    | Get Company Detail Successful | -                     |
| 404    | Not Found                     | Company không tồn tại |
| 500    | Internal Server Error         | -                     |
