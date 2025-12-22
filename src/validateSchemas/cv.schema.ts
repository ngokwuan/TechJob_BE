import { z } from 'zod';

export const createCVSchema = z.object({
  fullName: z.string().min(1, 'fullName không được để trống'),
  email: z.string().email('email không hợp lệ'),
  phone: z.string().min(1, 'phone không được để trống'),
  jobId: z.string().min(1, 'jobID không được để trống'),
});
export const updateCVSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.union([
    z.literal('Pending'),
    z.literal('Rejected'),
    z.literal('Accepted'),
  ]),
});

export const filterStatusSchema = z
  .object({
    status: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(['Pending', 'Rejected', 'Accepted']).optional()
    ),
  })
  .passthrough();

export type UpdateStatusCVInput = z.infer<typeof updateStatusSchema>;
