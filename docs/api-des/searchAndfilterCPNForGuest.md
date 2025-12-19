# Search and filter company for guest

## Endpoint

`GET /companies/search`

## Query Parameters

| Parameter | Data Type | Required | Value Description               |
| --------- | --------- | -------- | ------------------------------- |
| keyword   | string    |          | Từ khóa tìm kiếm (company name) |
| cityId    | string    |          | ID của thành phố                |

## Response Data

| JSON Key              | Data Type | Required | Value Description |
| --------------------- | --------- | -------- | ----------------- |
| totalCompany          | string    | \*       | Số lượng công ty  |
| company               | array     | \*       | Mảng công ty      |
| company[].companyName | string    | \*       | Tên công ty       |
| company[].logo        | string    | \*       | Logo công ty      |
| company[].cityName    | string    | \*       | Tên thành phố     |
| company[].totalJobs   | string    | \*       | Tổng số công việc |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Successful            | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
