# Get Dashboard (Admin)

## Endpoint

`GET /admin/dashboard/stats`

## Headers

| Header        | Value               |
| ------------- | ------------------- |
| Authorization | Bearer {adminToken} |

## Response Data

| JSON Key             | Data Type | Required | Value Description         |
| -------------------- | --------- | -------- | ------------------------- |
| totalCompanies       | int       | \*       | Tổng số công ty           |
| totalActiveCompanies | int       | \*       | Số công ty đang hoạt động |
| totalUsers           | int       | \*       | Tổng số người dùng        |
| totalJobs            | int       | \*       | Tổng số công việc         |
| totalActiveJobs      | int       | \*       | Số công việc đang tuyển   |
| totalCVs             | int       | \*       | Tổng số CV                |
| totalPendingCVs      | int       | \*       | Số CV chờ xử lý           |
| totalAcceptedCVs     | int       | \*       | Số CV được chấp nhận      |
| totalRejectedCVs     | int       | \*       | Số CV bị từ chối          |

## Status

| Status | Message                   | Error Reason         |
| ------ | ------------------------- | -------------------- |
| 200    | Get Statistics Successful | -                    |
| 401    | Unauthorized              | Token không hợp lệ   |
| 403    | Forbidden                 | Không có quyền admin |
| 500    | Internal Server Error     | -                    |
