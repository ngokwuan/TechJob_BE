# Get all cities

## Endpoint

`GET /cities`

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| id       | string    |          | ID thành phố      |
| cityName | string    |          | Tên thành phố     |

## Status

| Status | Message               | Error Reason                |
| ------ | --------------------- | --------------------------- |
| 200    | Successful            | -                           |
| 404    | Not Found             | Không thành phố nào tồn tại |
| 500    | Internal Server Error | -                           |
