# Get Dashboard (Admin)

## Endpoint

`GET /admin/dashboard`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key       | Data Type | Required | Value Description          |
| -------------- | --------- | -------- | -------------------------- |
| totalCompanies | int       | \*       | Tổng số công ty            |
| totalUsers     | int       | \*       | Tổng số người dùng         |
| totalLockUsers | int       | \*       | Tổng số người dùng bị khóa |
| totalJobs      | int       | \*       | Tổng số công việc          |
| totalCVs       | int       | \*       | Tổng số CV                 |

## Status

| Status | Message                   | Error Reason         |
| ------ | ------------------------- | -------------------- |
| 200    | Get Statistics Successful | -                    |
| 401    | Unauthorized              | Token không hợp lệ   |
| 403    | Forbidden                 | Không có quyền admin |
| 500    | Internal Server Error     | -                    |
