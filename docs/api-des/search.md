# Search (Jobs & Companies)

## Endpoint

`GET /search`

## Query Parameters

| Parameter | Data Type | Required | Value Description                                    |
| --------- | --------- | -------- | ---------------------------------------------------- |
| keyword   | string    |          | Từ khóa tìm kiếm (title, company name, technologies) |

## Response Data

| JSON Key                     | Data Type | Required | Value Description   |
| ---------------------------- | --------- | -------- | ------------------- |
| jobs                         | array     | \*       | Danh sách công việc |
| jobs[].jobId                 | string    | \*       | Job ID              |
| jobs[].title                 | string    | \*       | Tiêu đề công việc   |
| jobs[].salaryMin             | string    | \*       | Lương tối thiểu     |
| jobs[].salaryMax             | string    | \*       | Lương tối đa        |
| jobs[].position              | string    | \*       | Vị trí              |
| jobs[].workingForm           | boolean   | \*       | Hình thức làm việc  |
| jobs[].technologies          | string    | \*       | Công nghệ yêu cầu   |
| jobs[].description           | string    |          | Mô tả công việc     |
| jobs[].images                | string    |          | Hình ảnh            |
| jobs[].createdAt             | string    | \*       | Ngày đăng           |
| jobs[].company               | object    | \*       | Thông tin công ty   |
| jobs[].company.companyId     | string    | \*       | Company ID          |
| jobs[].company.companyName   | string    | \*       | Tên công ty         |
| jobs[].company.logo          | string    |          | Logo công ty        |
| jobs[].company.address       | string    |          | Địa chỉ công ty     |
| companies                    | array     | \*       | Danh sách công ty   |
| companies[].companyId        | string    | \*       | Company ID          |
| companies[].companyName      | string    | \*       | Tên công ty         |
| companies[].email            | string    | \*       | Email               |
| companies[].address          | string    |          | Địa chỉ             |
| companies[].cityID           | string    |          | ID thành phố        |
| companies[].companyEmployees | string    |          | Số lượng nhân viên  |
| companies[].companyModel     | string    |          | Mô hình công ty     |
| companies[].description      | string    |          | Mô tả công ty       |
| companies[].phone            | string    |          | Số điện thoại       |
| companies[].workOverTime     | string    |          | Chế độ làm thêm giờ |
| companies[].workingTime      | string    |          | Giờ làm việc        |
| companies[].logo             | string    |          | Logo công ty        |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Search Successful     | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
