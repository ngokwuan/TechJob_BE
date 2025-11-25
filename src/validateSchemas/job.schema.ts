import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(1, 'title không được để trống'),
  salaryMin: z.string().min(1, 'salaryMin không được để trống'),
  salaryMax: z.string().min(1, 'salaryMax không được để trống'),
  position: z.string().min(1, 'position không được để trống'),
  workingForm: z.string().min(1, 'working form không được để trống'),
  technologies: z.string().min(1, 'technologies không được để trống'),
  description: z.string().min(1, 'description không được để trống'),
  images: z.string().optional(),
});
