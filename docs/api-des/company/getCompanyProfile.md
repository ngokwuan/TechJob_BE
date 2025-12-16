# Get Company Profile

## Endpoint

`GET /companies/me`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key         | Data Type | Required | Value Description  |
| ---------------- | --------- | -------- | ------------------ |
| Id               | string    | \*       | Company ID         |
| companyName      | string    | \*       | Tên công ty        |
| address          | string    | \*       | Địa chỉ            |
| companyEmployees | string    | \*       | Số lượng nhân sự   |
| companyModel     | string    | \*       | Mô hình công ty    |
| phone            | string    | \*       | Số điện thoại      |
| workingTime      | string    | \*       | Thời gian làm việc |
| workOverTime     | string    | \*       | Làm việc ngoài giờ |
| logo             | string    | \*       | Logo công ty       |
| cityID           | string    | \*       | ID thành phố       |

## Status

| Status | Message               | Error Reason           |
| ------ | --------------------- | ---------------------- |
| 200    | Successful            | -                      |
| 404    | Not Found             | Không tìm thấy công ty |
| 500    | Internal Server Error | -                      |
