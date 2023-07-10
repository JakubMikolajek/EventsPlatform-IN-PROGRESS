import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";

import FileInput from "../../Inputs/FileInput/FileInput.tsx";
import FormInput from "../../Inputs/FormInput/FormInput.tsx";
import SubmitInput from "../../Inputs/SubmitInput/SubmitInput.tsx";

import classes from "./editForm.module.scss";

import { StateProps } from "../../../store/store.ts";
import { fetchSingleUser } from "../../../hooks/fetchSingleUser.tsx";
import {
  FetchSingleUserDataProps,
  UserProps,
} from "../../../utils/types/types.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { updateProfile } from "../../../supabase/requests/user.ts";
import { supabaseClient } from "../../../supabase/supabase.ts";

const EditForm: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  const client: QueryClient = useQueryClient();
  let user_data: UserProps | undefined | null;

  const [url, setUrl] = useState<string | undefined | null>(
    user_data?.image_url
  );

  if (typeof ownId !== "undefined") {
    const { user, isLoading }: FetchSingleUserDataProps = fetchSingleUser(
      ownId,
      true
    );
    if (isLoading) {
      return null;
    }
    user_data = user;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user_data?.first_name ? user_data.first_name : "",
      last_name: user_data?.last_name ? user_data.last_name : "",
    },
  });

  let updateProfileMutation: UseMutationResult<
    PostgrestSingleResponse<null>,
    unknown,
    any
  >;

  if (typeof ownId === "string" && typeof url === "string") {
    updateProfileMutation = useMutation({
      mutationFn: (data: any) =>
        updateProfile(ownId, data.first_name, data.last_name, url),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["user", ownId]);
        await alert("Zaktualizowano dane!!!");
      },
    });
  }

  const handleFileChange = async (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const name = file.name;
      await supabaseClient.storage
        .from("images")
        .upload(`${ownId}/profile/${name}`, file);
      const { data } = supabaseClient.storage
        .from("images")
        .getPublicUrl(`${ownId}/profile/${name}`);
      setUrl(data?.publicUrl);
    }
  };
  return (
    <div
      className={
        isDark ? classes.form_container_dark : classes.form_container_light
      }
    >
      <h2>Edytuj profil</h2>
      <form
        className={classes.form}
        onSubmit={handleSubmit((values: FieldValues) => {
          updateProfileMutation.mutate(values);
        })}
      >
        <div className={classes.inner_form}>
          <FileInput
            url={url}
            handleFileChange={handleFileChange}
            isAlt={true}
          />
          <FormInput
            register={register}
            type="text"
            name="first_name"
            placeholder="Imię"
            errors={errors.first_name?.message}
          />
          <FormInput
            register={register}
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            errors={errors.last_name?.message}
          />
        </div>
        <SubmitInput type="submit" value="Zapisz" />
      </form>
    </div>
  );
};

export default EditForm;
