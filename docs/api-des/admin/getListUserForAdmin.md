# Get all users with admin role

## Endpoint

`GET admin/users/all`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key  | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| totalUser | string    |          | Số lượng công ty  |
| user[]    | array     |          | Mảng người dùng   |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 401    | Unauthorized          | Token không hợp lệ            |
| 403    | Forbidden             | Không có quyền xem công ty    |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
