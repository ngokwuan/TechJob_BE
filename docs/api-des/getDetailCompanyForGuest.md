# Get Company Detail

## Endpoint

`GET /companies/:companyId`

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| companyId | string    | \*       | Company ID        |

## Response Data

| JSON Key               | Data Type | Required | Value Description              |
| ---------------------- | --------- | -------- | ------------------------------ |
| company                | object    | \*       | Công ty                        |
| company.id             | string    | \*       | Company ID                     |
| company.companyName    | string    | \*       | Tên công ty                    |
| company.address        | string    |          | Địa chỉ                        |
| company.logo           | string    |          | Logo công ty                   |
| jobs                   | array     | \*       | Danh sách công việc đang tuyển |
| jobs[].id              | string    | \*       | Id công việc                   |
| jobs[].title           | string    | \*       | Tiêu đề công việc              |
| jobs[].workingForm     | string    | \*       | Mô hình làm việc               |
| jobs[].isDeleted       | string    | \*       | Trạng thái đã xóa              |
| jobs[].totalApplicants | string    | \*       | Số lượng cv đã nộp             |
| jobs[].createdAt       | string    | \*       | Ngày đăng                      |

## Status

| Status | Message               | Error Reason          |
| ------ | --------------------- | --------------------- |
| 200    | Successful            | -                     |
| 404    | Not Found             | Company không tồn tại |
| 500    | Internal Server Error | -                     |
