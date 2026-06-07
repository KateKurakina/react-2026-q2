export type Gender = 'male' | 'female' | 'other';

export interface FormSubmission {
    id: string;

    name: string;
    age: string;
    email: string;

    gender: Gender;

    country: string;

    image: string;

    password: string;

    acceptedTerms: boolean;

    createdAt: number;
}