import { z } from 'zod';

export const createCVSchema = z.object({
  fullName: z.string().min(1, 'fullName không được để trống'),
  email: z.string().email('email không hợp lệ'),
  phone: z.string().min(1, 'phone không được để trống'),
  fileCV: z.string().url('fileCV phải là URL hợp lệ'),
  jobId: z.string().min(1, 'jobID không được để trống'),
});
