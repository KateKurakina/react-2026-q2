import type { FormEvent } from "react";
import { formSchema } from "../../schemas/formSchema";
import type { FormData } from "../../schemas/formSchema";
import { useState } from "react";

export default function UncontrolledForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        console.log('1. submit fired');

        const formData = new FormData(event.currentTarget);

        console.log('2. image:', formData.get('image'));

        const imageValue = formData.get('image');

        if (!(imageValue instanceof File)) {
            setErrors((prev) => ({
                ...prev,
                image: 'Image is required',
            }));
            return;
        }

        const file = imageValue;

        const isValidType = 
            file.type === 'image/png' || 
            file.type === 'image/jpeg';

        const isValidSize = file.size <= 2 * 1024 * 1024;

        if (!isValidType) {
            setErrors((prev) => ({
                ...prev,
                image: 'Only PNG or JPEG allowed',
            }));
            return;
        }

        if (!isValidSize) {
            setErrors((prev) => ({
                ...prev,
                image: 'Image must be <= 2MB',
            }));
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const data: FormData = {
                name: String(formData.get('name')),
                age: Number(formData.get('age')),
                email: String(formData.get('email')),
                gender: formData.get('gender') as 'male' | 'female' | 'other',
                country: String(formData.get('country')),
                password: String(formData.get('password')),
                confirmPassword: String(formData.get('confirmPassword')),
                image: reader.result as string,
                acceptedTerms: formData.get('terms') === 'on',
            }
            const result = formSchema.safeParse(data);

            if (!result.success) {
                const errors: Record<string, string> = {};

                result.error.issues.forEach(
                    (issue) => {
                        const field = issue.path[0] as string;

                        errors[field] = issue.message;
                    }
                );

                setErrors(errors);
                return;
            }

            setErrors({})

            console.log(result.data);

        }
        reader.readAsDataURL(file);
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Uncontrolled Form</h2>

            <label htmlFor="name">
                Name
            </label>
            <input 
            id="name"
            name="name"
            type="text" 
            />
            {errors.name && (
                <p role="alert" className="error">{errors.name}</p>
            )}

            <label htmlFor="age">
                Age
            </label>
            <input 
            id="age"
            name="age"
            type="number" 
            />
            {errors.age && (
                <p role="alert" className="error">{errors.age}</p>
            )}

            <label htmlFor="email">
                Email
            </label>
            <input 
            id="email"
            name="email"
            type="email" 
            />
            {errors.email && (
                <p role="alert" className="error">{errors.email}</p>
            )}

            <label htmlFor="gender">
                Gender
            </label>
            <select 
            id="gender"
            name="gender"
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && (
                <p role="alert" className="error">{errors.gender}</p>
            )}

            <label htmlFor="image">
                Image
            </label>
            <input 
            id="image"
            name="image"
            type="file" 
            accept="image/png, image/jpeg"
            />
            {errors.image && (
                <p role="alert" className="error">{errors.image}</p>
            )}

            <label htmlFor="terms">
                Accept Terms
            </label>
            <input 
            id="terms"
            name="terms"
            type="checkbox" 
            />
            {errors.acceptedTerms && (
                <p role="alert" className="error">{errors.acceptedTerms}</p>
            )}


            <button type="submit">
                Submit
            </button>
        </form>
    );
}