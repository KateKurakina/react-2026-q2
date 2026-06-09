import type { FormEvent } from "react";

export default function UncontrolledForm() {
    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            name: formData.get('name'),
            age: formData.get('age'),
            email: formData.get('email'),
            gender: formData.get('gender'),
            acceptedTerms: formData.get('terms') === 'on',
        }

        console.log(data);
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

            <label htmlFor="age">
                Age
            </label>
            <input 
            id="age"
            name="age"
            type="number" 
            />

            <label htmlFor="email">
                Email
            </label>
            <input 
            id="email"
            name="email"
            type="email" 
            />

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

            <label htmlFor="terms">
                Accept Terms
            </label>
            <input 
            id="terms"
            name="terms"
            type="checkbox" 
            />

            <button type="submit">
                Submit
            </button>
        </form>
    );
}