import * as yup from "yup";

//Register Validation
export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required("Adres Email jest wymagany.")
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

//Login Validation
export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required("Adres Email jest wymagany.")
    .email("Adres email musi zawierać @."),
  password: yup
    .string()
    .required("Hasło jest wymagane.")
    .min(6, "Hasło musi składać się minimum z 6 znaków."),
});

//Event Validation
export const addEventValdation = yup.object().shape({
  title: yup
    .string()
    .required("Nazwa wydarzenia jest wymagana.")
    .min(3, "Nazwa wydarzenia musi mieć minimum 3 liter."),
  description: yup.string().required("Opis wydarzenia jest wymagany."),
  event_date: yup.date().required("Data wydarzenia jest wymagana."),
  event_location: yup
    .string()
    .required("Miejsce odbycia wydarzenia jest wymagane."),
  event_category: yup.string().required("Kategoria wydzarzenia wymagana."),
  tickets_number: yup
    .number()
    .required("Ilość miejsc na wydarzeniu wymagana.")
    .positive("Ilość biletów musi być dodatnia."),
});

//Comment Validation

export const addCommentValidation = yup.object().shape({
  comment: yup.string().required(),
});
