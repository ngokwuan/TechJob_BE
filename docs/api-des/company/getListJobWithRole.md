# Get all job in company

## Endpoint

`GET /jobs/`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key              | Data Type | Required | Value Description  |
| --------------------- | --------- | -------- | ------------------ |
| totalJob              | string    |          | Số lượng công việc |
| job[]                 | array     |          | Mảng công việc     |
| job[].title           | string    |          | Tiêu đề công việc  |
| job[].workingForm     | string    |          | Hình thức làm việc |
| job[].isDeleted       | boolean   |          | Trình trạng đã xóa |
| job[].jobId           | string    |          | ID công việc       |
| job[].createdAt       | string    |          | Thời gian tạo      |
| job[].totalApplicants | number    |          | Tổng số CV         |

## Status

| Status | Message               | Error Reason                     |
| ------ | --------------------- | -------------------------------- |
| 200    | Successful            | -                                |
| 401    | Unauthorized          | Không xác thực công ty           |
| 403    | Forbidden             | Không có quyền chỉnh xem job này |
| 404    | Not Found             | Không tồn tại công việc nào      |
| 500    | Internal Server Error | -                                |
