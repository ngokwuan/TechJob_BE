# Logout Account

## Endpoint

`POST /auth/logout`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Status

| Status | Message               | Error Reason                       |
| ------ | --------------------- | ---------------------------------- |
| 200    | Successful            | -                                  |
| 401    | Unauthorized          | Token không hợp lệ hoặc đã hết hạn |
| 500    | Internal Server Error | -                                  |
