export type PasswordStrength = {
    hasNumber: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasSpecial: boolean;
};

export const getPasswordStrength = (
    password: string
): PasswordStrength => ({
    hasNumber: [...password].some(
        (char) => char >= '0' && char <='9'
    ),
    hasUppercase: [...password].some(
        (char) => char >='A' && char <='Z'
    ),
    hasLowercase: [...password].some(
        (char) => char >='a' && char <='z'
    ),
    hasSpecial: [...password].some(
        (char) => 
            !(
                (char >='a' && char <='z') ||
                (char >='A' && char <='Z') ||
                (char >='0' && char <='9')
            )
    ),
})