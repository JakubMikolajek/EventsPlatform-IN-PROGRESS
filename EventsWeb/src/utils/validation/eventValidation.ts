import * as yup from "yup";

export const addEventValidation = yup.object().shape({
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
