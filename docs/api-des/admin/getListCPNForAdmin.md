# Get all companies with admin role

## Endpoint

`GET admin/companies/all`

## Response Data

| JSON Key     | Data Type | Required | Value Description |
| ------------ | --------- | -------- | ----------------- |
| totalCompany | string    |          | Số lượng công ty  |
| company[]    | array     |          | Mảng công ty      |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
