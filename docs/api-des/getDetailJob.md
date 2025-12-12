# Get Job Detail

## Endpoint

`GET /jobs/:jobId`

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| jobId     | string    | \*       | Job ID            |

## Response Data

| JSON Key                       | Data Type | Required | Value Description   |
| ------------------------------ | --------- | -------- | ------------------- |
| job                            | object    | \*       | Công việc           |
| job.id                         | string    | \*       | ID công việc        |
| job.companyId                  | object    | \*       | ID công ty          |
| job.companyId.companyName      | string    | \*       | Tên công ty         |
| job.companyId.companyEmployees | string    | \*       | Số lượng nhân sự    |
| job.companyId.companyModel     | string    | \*       | Mô hình công ty     |
| job.companyId.workingTime      | string    | \*       | Thời gian làm việc  |
| job.companyId.logo             | string    | \*       | Logo công ty        |
| job.companyId.cityID           | string    | \*       | ID thành phố        |
| job.companyId.cityID.cityName  | string    | \*       | Tên thành phố       |
| job.title                      | string    | \*       | Tiêu đề công việc   |
| job.salaryMin                  | string    | \*       | Lương tối thiểu     |
| job.salaryMax                  | number    | \*       | Lương tối đa        |
| job.position                   | string    | \*       | Vị trí              |
| job.workingForm                | string    | \*       | Hình thức làm việc  |
| job.technologies               | array     | \*       | Công nghệ yêu cầu   |
| job.description                | string    | \*       | Mô tả công việc     |
| job.images                     | string    |          | Hình ảnh            |
| job.isDeleted                  | string    | \*       | Trạng thái đã xóa   |
| job.createdAt                  | string    | \*       | Ngày đăng           |
| job.updatedAt                  | string    | \*       | Ngày cập nhật       |
| relateJobs                     | array     | \*       | Công việc liên quan |

## Status

| Status | Message               | Error Reason      |
| ------ | --------------------- | ----------------- |
| 200    | Successful            | -                 |
| 404    | Not Found             | Job không tồn tại |
| 500    | Internal Server Error | -                 |
