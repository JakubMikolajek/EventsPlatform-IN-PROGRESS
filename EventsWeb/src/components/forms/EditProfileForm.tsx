import React, { useState } from "react";
import classes from "./editProfileForm.module.scss";
import BackButton from "../buttons/BackButton.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import FileInput from "../inputs/FileInput.tsx";
import { supabaseClient } from "../../supabase/supabase.ts";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../inputs/FormInput.tsx";
import SubmitInput from "../inputs/SubmitInput.tsx";
import {
  FetchSingleUserDataProps,
  UserProps,
} from "../../utils/types/types.ts";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { updateProfile } from "../../supabase/api/user.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface EditProfileForm {
  ownId: string | undefined;
}

const EditProfileForm: React.FC<EditProfileForm> = ({ ownId }) => {
  const navigate: NavigateFunction = useNavigate();
  const client: QueryClient = useQueryClient();
  let user_data: UserProps | undefined | null;

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

  const [url, setUrl] = useState<string | undefined | null>(
    user_data?.image_url
  );

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
    any,
    unknown
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
    <div className={classes.main}>
      <div className={classes.backContainer}>
        <BackButton onClick={() => navigate(-1)} />
        <h1>Edytuj profil</h1>
      </div>
      <div className={classes.formContainer}>
        <form
          className={classes.form}
          onSubmit={handleSubmit((values: FieldValues) => {
            updateProfileMutation.mutate(values);
          })}
        >
          <div className={classes.innerForm}>
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
    </div>
  );
};

export default EditProfileForm;
