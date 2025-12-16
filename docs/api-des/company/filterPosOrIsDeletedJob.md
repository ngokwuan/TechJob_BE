filter job for guest

## Endpoint

`GET /jobs/filter`

## Query Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| position  | string    |          | Vị trí cấp bậc    |
| isDeleted | boolean   |          | Trạng thái đã xóa |

## Response Data

| JSON Key           | Data Type | Required | Value Description               |
| ------------------ | --------- | -------- | ------------------------------- |
| jobs               | array     | \*       | Danh sách công việc             |
| jobs[].id          | string    | \*       | Job ID                          |
| jobs[].title       | string    | \*       | Tiêu đề công việc               |
| jobs[].position    | string    | \*       | Vị trí                          |
| jobs[].workingForm | string    | \*       | Hình thức làm việc              |
| jobs[].isDeleted   | boolean   | \*       | Trạng thái đã xóa của công việc |
| jobs[].createAt    | string    | \*       | Ngày đăng tải việc làm          |
| jobs[].totalCV     | string    | \*       | Số lượng CV đã nộp              |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Successful            | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
