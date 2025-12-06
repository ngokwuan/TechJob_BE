# Toggle status of company with admin role

## Endpoint

`PATCH admin/companies/:id/toggle`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| company  | object    |          | Công ty           |

## Status

| Status | Message               | Error Reason                     |
| ------ | --------------------- | -------------------------------- |
| 200    | Successful            | -                                |
| 401    | Unauthorized          | Token không hợp lệ               |
| 403    | Forbidden             | Không có quyền chỉnh công ty này |
| 404    | Not Found             | Không tồn tại tại công ty này    |
| 500    | Internal Server Error | -                                |
