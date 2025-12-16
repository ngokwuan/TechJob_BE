# Get all companies


## Endpoint

`GET /companies/all`

## Response Data

| JSON Key              | Data Type | Required | Value Description             |
| --------------------- | --------- | -------- | ----------------------------- |
| company[]             | array     |          | Mảng công ty                  |
| company[].id          | string    |          | ID công ty                    |
| company[].companyName | string    |          | Tên công ty                   |
| company[].logo        | string    |          | Logo công ty                  |
| company[]totalJob     | string    |          | Số lượng việc làm của công ty |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
