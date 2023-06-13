import * as yup from "yup";

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required("Adres email jest wymagany.")
    .email("Adres email musi zawierać @."),
  password: yup
    .string()
    .required("Hasło jest wymagane.")
    .min(6, "Hasło musi składać się minimum z 6 znaków."),
  confirmPassword: yup
    .string()
    .required("Potwierdzenie hasła jest wymagane.")
    .oneOf([yup.ref("password")], "Hasła muszą się zgadzać."),
  firstName: yup.string().required("Imię jest wymagane."),
  lastName: yup.string().required("Nazwisko jest wymagane."),
});
