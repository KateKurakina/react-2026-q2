import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

import { formSchema } from "../../schemas/formSchema";
import type { FormData } from "../../schemas/formSchema";

import { useFormStore } from "../../store/useFormStore";
import { getPasswordStrength } from "../../utils/passwordStrength";
import { useMemo } from "react";

type Props = {
    onSuccess: () => void;
}

export default function RHFForm({ onSuccess }: Props) {
    const addSubmission = useFormStore((state) => state.addSubmission);

    const countries = useFormStore((state) => state.countries);

    const schema = formSchema(countries);

    // const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
        watch,
        setValue,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const password = watch('password') || "";
    const strength = useMemo(() => getPasswordStrength(password), [password]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        addSubmission(data);

        reset();

        onSuccess();
    };

    const handleImage = (file?: File) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result !== "string") return;

            setValue("image", result, {
                shouldValidate: true,
            });
        }

        reader.readAsDataURL(file);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>React Hook Form</h2>

            <label htmlFor="rhf-name">
                Name
            </label>
            <input 
            id="rhf-name"
            {...register('name')}
            />
            {errors.name && (
                <p role="alert" className="error">{errors.name.message}</p>
            )}

            <label htmlFor="rhf-age">
                Age
            </label>
            <input 
            id="rhf-age"
            type="number" 
            {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
                <p role="alert" className="error">{errors.age.message}</p>
            )}

            <label htmlFor="rhf-email">
                Email
            </label>
            <input 
            id="rhf-email"
            type="email" 
            {...register('email')}
            />
            {errors.email && (
                <p role="alert" className="error">{errors.email.message}</p>
            )}

            <label htmlFor="rhf-gender">
                Gender
            </label>
            <select 
            id="rhf-gender"
            {...register('gender')}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && (
                <p role="alert" className="error">{errors.gender.message}</p>
            )}

            <label htmlFor="rhf-country">
                Country
            </label>
            <input 
            id="rhf-country" 
            list="countries" 
            {...register('country')}
            />
            <datalist id="countries">
                {countries.map((country) => (
                    <option key={country} value={country}/>
                ))}
            </datalist>
            {errors.country && (
                <p role="alert">{errors.country.message}</p>
            )}

            <label htmlFor="rhf-password">
                Password
            </label>
            <input
            id="rhf-password"
            type="password"
            {...register('password')}
            />
            
            <ul>
                <li>
                    {strength.hasNumber ? 'yes' : 'no'}{' '}
                    Number
                </li>
                <li>
                    {strength.hasUppercase ? 'yes' : 'no'}{' '}
                    Uppercase
                </li>
                <li>
                    {strength.hasLowercase ? 'yes' : 'no'}{' '}
                    Lowercase
                </li>
                <li>
                    {strength.hasSpecial ? 'yes' : 'no'}{' '}
                    Special character
                </li>
             </ul>
            {errors.password && (
                <p role="alert">{errors.password.message}</p>
            )}

            <label htmlFor="rhf-confirmPassword">
                Confirm Password
            </label>
            <input
            id="rhf-confirmPassword"
            type="password"
            {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
                <p role="alert">{errors.confirmPassword.message}</p>
            )}

            <label htmlFor="rhf-image">
                Image
            </label>
            <input 
            id="rhf-image"
            type="file" 
            accept="image/png, image/jpeg"
            onChange={(e) => handleImage( e.target.files?.[0])}
            />
            {errors.image && (
                <p role="alert" className="error">{errors.image.message}</p>
            )}

            <label htmlFor="rhf-terms">
                Accept Terms
            </label>
            <input 
            id="rhf-terms"
            type="checkbox" 
            {...register('acceptedTerms')}
            />
            {errors.acceptedTerms && (
                <p role="alert" className="error">{errors.acceptedTerms.message}</p>
            )}


            <button type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
}