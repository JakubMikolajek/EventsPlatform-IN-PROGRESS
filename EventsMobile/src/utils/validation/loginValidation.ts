import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .required("Adres email jest wymagany.")
        .email("Adres email musi zawierać @."),
    password: yup
        .string()
        .required("Hasło jest wymagane.")
        .min(6, "Hasło musi składać się minimum z 6 znaków."),
});
