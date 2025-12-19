# Get Dashboard (company)

## Endpoint

`GET /companies/dashboard`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key         | Data Type | Required | Value Description                 |
| ---------------- | --------- | -------- | --------------------------------- |
| totalJobs        | int       | \*       | Tổng số công việc                 |
| totalLockJobs    | int       | \*       | Tổng số công việc bị khóa         |
| totalActiveJobs  | int       | \*       | Tổng số công việc đang tuyển dụng |
| totalPendingCVs  | int       | \*       | Tổng số CV đang chờ duyệt         |
| totalAcceptedCVs | int       | \*       | Tổng số CV đã duyệt               |

## Status

| Status | Message               | Error Reason           |
| ------ | --------------------- | ---------------------- |
| 200    | Successful            | -                      |
| 401    | Unauthorized          | Token không hợp lệ     |
| 403    | Forbidden             | Không có quyền công ty |
| 500    | Internal Server Error | -                      |
