# Get All Jobs

## Endpoint

`GET /admin/jobs`

## Response Data

| JSON Key            | Data Type | Required | Value Description                                |
| ------------------- | --------- | -------- | ------------------------------------------------ |
| jobs                | array     | \*       | Danh sách công việc                              |
| jobs[].jobId        | string    | \*       | Job ID                                           |
| jobs[].companyId    | string    | \*       | Company ID                                       |
| jobs[].title        | string    | \*       | Tiêu đề công việc                                |
| jobs[].salaryMin    | number    | \*       | Lương tối thiểu                                  |
| jobs[].salaryMax    | number    | \*       | Lương tối đa                                     |
| jobs[].position     | string    | \*       | Vị trí                                           |
| jobs[].workingForm  | boolean   | \*       | Hình thức làm việc (true: remote, false: office) |
| jobs[].technologies | string    | \*       | Công nghệ yêu cầu                                |
| jobs[].description  | string    |          | Mô tả ngắn (200 ký tự đầu)                       |
| jobs[].images       | string    |          | URL hình ảnh                                     |
| jobs[].createdAt    | string    | \*       | Ngày đăng                                        |
| jobs[].updatedAt    | string    | \*       | Ngày cập nhật                                    |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Get Jobs Successful   | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
