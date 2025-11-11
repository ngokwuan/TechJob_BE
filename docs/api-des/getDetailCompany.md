# Get Company Detail

## Endpoint

`GET /companies/:companyId`

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| companyId | string    | \*       | Company ID        |

## Response Data

| JSON Key         | Data Type | Required | Value Description              |
| ---------------- | --------- | -------- | ------------------------------ |
| companyId        | string    | \*       | Company ID                     |
| companyName      | string    | \*       | Tên công ty                    |
| email            | string    | \*       | Email                          |
| address          | string    |          | Địa chỉ                        |
| cityID           | string    |          | ID thành phố                   |
| companyEmployees | string    |          | Số lượng nhân viên             |
| companyModel     | string    |          | Mô hình công ty                |
| description      | string    |          | Mô tả công ty                  |
| phone            | string    |          | Số điện thoại                  |
| workOverTime     | string    |          | Chế độ làm thêm giờ            |
| workingTime      | string    |          | Giờ làm việc                   |
| logo             | string    |          | Logo công ty                   |
| jobs             | array     | \*       | Danh sách công việc đang tuyển |
| jobs[].jobId     | string    | \*       | Job ID                         |
| jobs[].title     | string    | \*       | Tiêu đề công việc              |
| jobs[].salaryMin | string    | \*       | Lương tối thiểu                |
| jobs[].salaryMax | string    | \*       | Lương tối đa                   |
| jobs[].position  | string    | \*       | Vị trí                         |
| jobs[].createdAt | string    | \*       | Ngày đăng                      |

## Status

| Status | Message                       | Error Reason          |
| ------ | ----------------------------- | --------------------- |
| 200    | Get Company Detail Successful | -                     |
| 404    | Not Found                     | Company không tồn tại |
| 500    | Internal Server Error         | -                     |
