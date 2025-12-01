import { z } from 'zod';

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z
    .string()
    .min(9, 'Phone number must be at least 9 characters')
    .optional(),
  avatar: z.any().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
