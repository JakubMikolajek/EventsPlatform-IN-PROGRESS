import * as yup from "yup";

export const editProfileValidation = yup.object().shape({
    firstName: yup.string().required("Imię jest wymagane."),
    lastName: yup.string().required("Nazwisko jest wymagane."),
});
