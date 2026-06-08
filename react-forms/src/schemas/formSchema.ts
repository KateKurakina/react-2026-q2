import { z } from 'zod';

const isValidEmail = (
    email: string
): boolean => {
    const parts = email.split('@');

    if (parts.length !== 2) {
        return false;
    }

    const [local, domain] = parts;

    if (!local) {
        return false;
    }

    const domainParts = domain.split('.');

    return domainParts.length >= 2;
};

export const formSchema = z.object({
    name: z.string().min(1).refine(
        (value) => value[0] === value[0].toUpperCase(),
        {
            message: 'First letter must be uppercase',
        }
    ),

    age: z.coerce.number().min(0),

    email: z.string().refine(
        isValidEmail,
        {
            message: 'Invalid email',
        }
    ),

    gender: z.enum([
        'male',
        'female',
        'other',
    ]),

    country: z.string(),

    password: z.string(),

    confirmPassword: z.string(),

    image: z.string(),

    acceptedTerms: z.literal(true),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ['confirmPassword'],
        message: 'Password must match',
    }
);

export type FormData = z.infer<typeof formSchema>;