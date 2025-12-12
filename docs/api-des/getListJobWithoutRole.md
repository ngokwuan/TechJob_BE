# Get all job in company without role

## Endpoint

`GET /jobs/all`

## Response Data

| JSON Key           | Data Type | Required | Value Description       |
| ------------------ | --------- | -------- | ----------------------- |
| job[]              | array     |          | Mảng công việc          |
| job[].title        | string    |          | Tiêu đề công việc       |
| job[].salaryMin    | string    |          | Lương tối thiểu         |
| job[].salaryMax    | string    |          | Lương tối đa            |
| job[].position     | string    |          | Vị trí việc làm         |
| job[].workingForm  | string    |          | Mô hình làm việc        |
| job[].technologies | string    |          | Công nghệ               |
| job[].createdAt    | string    |          | Thời gian tạo công việc |
| job[].jobId        | string    |          | Id công việc            |
| job[].companyName  | string    |          | Tên công ty             |
| job[].logo         | string    |          | Logo công việc          |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
