# Toggle status of user with admin role

## Endpoint

`PATCH admin/users/:id/toggle`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| user     | object    |          | Người dùng        |

## Status

| Status | Message               | Error Reason                        |
| ------ | --------------------- | ----------------------------------- |
| 200    | Successful            | -                                   |
| 401    | Unauthorized          | Token không hợp lệ                  |
| 403    | Forbidden             | Không có quyền chỉnh người dùng này |
| 404    | Not Found             | Không tồn tại tại công ty này       |
| 500    | Internal Server Error | -                                   |
