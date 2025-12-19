# Get Dashboard (company)

## Endpoint

`GET /users/dashboard`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key         | Data Type | Required | Value Description         |
| ---------------- | --------- | -------- | ------------------------- |
| totalCVs         | int       | \*       | Tổng số CV                |
| totalRejectedCVs | int       | \*       | Tổng số CV bị từ chối     |
| totalPendingCVs  | int       | \*       | Tổng số CV đang chờ duyệt |
| totalAcceptedCVs | int       | \*       | Tổng số CV đã duyệt       |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 401    | Unauthorized          | Token không hợp lệ        |
| 403    | Forbidden             | Không có quyền người dùng |
| 500    | Internal Server Error | -                         |
