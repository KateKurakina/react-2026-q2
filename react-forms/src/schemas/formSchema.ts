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

export const formSchema = (countries: string[]) => z.object({
    name: z.string().min(1, 'Name is required').refine(
        (value) => value[0] === value[0].toUpperCase(),
        {
            message: 'First letter must be uppercase',
        }
    ),

    age: z
    .number()
    .int('Age must be intenger')
    .min(0, 'Age must be non-negative'),

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

    country: z.string().refine(
        (value) => countries.includes(value),
        {
            message: 'Country is not valid',
        }
    ),

    password: z.string().min(
        1,
        'Password is required'
    ),

    confirmPassword: z.string().min(
        1,
        'Confirm password is required'
    ),

    image: z
    .string()
    .refine(
        (value) => value.startsWith('data:image/'),
        {
            message: 'Invalid image format'
        }
    ),

    acceptedTerms: z.boolean().refine(
        (val) => val === true,
        {
            message: 'You must accept terms',
        }
    ),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ['confirmPassword'],
        message: 'Password must match',
    }
);

type Schema = ReturnType<typeof formSchema>;

export type FormData = z.infer<Schema>;