import { z } from 'zod';
import countryOptions from '../data/countries.json';

export const userSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: 'required' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name should only contain letters and spaces' }),
  country: z.enum(countryOptions as [string, ...string[]], {
    errorMap: () => ({ message: 'Invalid country selection' }),
  }),
  email: z
    .string()
    .min(1, { message: 'required' })
    .email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .min(1, { message: 'required' })
    .regex(/^\+[0-9]+$/, {
      message: "Phone number should start with '+' and contain only numbers",
    })
    .refine((value) => value.split('+').length === 2, {
      message: "Phone number should contain only one '+' at the beginning",
    }),
});

export type User = z.infer<typeof userSchema>;
