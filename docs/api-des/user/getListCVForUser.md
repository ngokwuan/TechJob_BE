# Get all CV of user (user)

## Endpoint

`GET /cvs/me`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key         | Data Type | Required | Value Description   |
| ---------------- | --------- | -------- | ------------------- |
| totalCV          | string    | \*       | Số lượng CV         |
| cv[]             | array     | \*       | Mảng CV             |
| cv[].jobId       | string    | \*       | ID công việc        |
| cv[].fullName    | string    | \*       | Tên người dùng      |
| cv[].email       | string    | \*       | Email               |
| cv[].fileCV      | string    | \*       | file CV             |
| cv[].status      | string    | \*       | Trạng thái CV       |
| cv[].createdAt   | string    | \*       | Thời gian tạo       |
| cv[].jobTitle    | string    | \*       | Tên công việc       |
| cv[].position    | string    | \*       | Vị trí việc làm     |
| cv[].salaryMin   | string    | \*       | Mức lương thấp nhất |
| cv[].salaryMax   | string    | \*       | Mức lương cao nhất  |
| cv[].workingForm | string    | \*       | Hình thức công việc |
| cv[].companyName | string    | \*       | Tên công ty         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 401    | Unauthorized          | Không xác thực người dùng |
| 403    | Forbidden             | Không có quyền xem cv     |
| 404    | Not Found             | Không tồn tại CV nào      |
| 500    | Internal Server Error | -                         |
