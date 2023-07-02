import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import CommentInput from "../../Inputs/CommentInput/CommentInput.tsx";
import CommentSubmit from "../../Inputs/CommentSubmit/CommentSubmit.tsx";

import classes from "./commentForm.module.scss";

import { yupResolver } from "@hookform/resolvers/yup";
import { addCommentValidation } from "../../../utils/validation/commentValidation.ts";
import { createComment } from "../../../supabase/requests/events.ts";

interface CommentFormProps {
  id: number | undefined;
  refetch: any;
}

const CommentForm: React.FC<CommentFormProps> = ({ id, refetch }) => {
  const client: QueryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(addCommentValidation),
    defaultValues: {
      comment: "",
    },
  });

  let addCommentMutation: UseMutationResult<
    PostgrestSingleResponse<never>,
    unknown,
    any
  >;

  if (typeof id !== "undefined") {
    addCommentMutation = useMutation({
      mutationFn: (data: any) => createComment(id, data.comment),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["events", id]);
        await reset();
        await refetch();
      },
    });
  }

  return (
    <form
      className={classes.comment_form}
      onSubmit={handleSubmit((values: FieldValues) =>
        addCommentMutation.mutate(values)
      )}
    >
      <CommentInput name="comment" register={register} />
      <CommentSubmit />
    </form>
  );
};

export default CommentForm;
