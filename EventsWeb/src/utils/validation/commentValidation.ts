import * as yup from "yup";

export const addCommentValidation = yup.object().shape({
  comment: yup.string().required(),
});
