import * as yup from "yup"

export const changePasswordValidation = yup.object().shape({
    password: yup
        .string()
        .required("Hasło jest wymagane.")
        .min(6, "Hasło musi składać się minimum z 6 znaków."),
    confirmPassword: yup
        .string()
        .required("Potwierdzenie hasła jest wymagane.")
        .oneOf([yup.ref("password")], "Hasła muszą się zgadzać."),
})
