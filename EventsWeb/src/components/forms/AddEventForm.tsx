import React, { useState } from "react";
import { supabaseClient } from "../../supabase/supabase.ts";
import FileInput from "../inputs/FileInput.tsx";
import FormInput from "../inputs/FormInput.tsx";
import { FieldValues, useForm } from "react-hook-form";
import SubmitInput from "../inputs/SubmitInput.tsx";
import TextAreaInput from "../inputs/TextAreaInput.tsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEventValidation } from "../../utils/validation/eventValidation.ts";
import classes from "./addEventForm.module.scss";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { createEvent } from "../../supabase/api/events.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const AddEventForm: React.FC = () => {
  const [url, setUrl] = useState<string>();
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  const client: QueryClient = useQueryClient();
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEventValidation),
    defaultValues: {
      title: "",
      description: "",
      event_date: "",
      event_location: "",
      event_category: "",
      tickets_number: "",
    },
  });

  const handleFileChange = async (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const name = file.name;
      await supabaseClient.storage
        .from("images")
        .upload(`${ownId}/${name}`, file);
      const { data } = supabaseClient.storage
        .from("images")
        .getPublicUrl(`${ownId}/${name}`);
      setUrl(data?.publicUrl);
    }
  };

  const createEventMutation: UseMutationResult<
    PostgrestSingleResponse<never>,
    unknown,
    any
  > = useMutation({
    mutationFn: (data: any) =>
      createEvent(
        data.title,
        data.description,
        data.event_date,
        data.event_location,
        data.event_category,
        data.tickets_number,
        url
      ),
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["events"]);
      await reset();
      await setUrl("");
      await navigate("/", { replace: true });
    },
  });

  return (
    <form
      className={classes.addEventForm}
      onSubmit={handleSubmit((values: FieldValues) => {
        createEventMutation.mutate(values);
      })}
    >
      <FileInput isAlt={false} url={url} handleFileChange={handleFileChange} />
      <div className={classes.inputContainer}>
        <div className={classes.inputLeftCol}>
          <FormInput
            register={register}
            type="text"
            name="title"
            placeholder="Nazwa wydarzenia"
            errors={errors.title?.message}
          />
          <TextAreaInput
            register={register}
            name="description"
            placeholder="Opis wydarzenia"
            errors={errors.description?.message}
          />
          <FormInput
            register={register}
            type="datetime-local"
            name="event_date"
            placeholder="Data wydarzenia"
            errors={errors.event_date?.message}
          />
        </div>
        <div className={classes.inputRightCol}>
          <FormInput
            register={register}
            type="text"
            name="event_category"
            placeholder="Kategoria wydarzenia"
            errors={errors.event_category?.message}
          />
          <TextAreaInput
            register={register}
            name="event_location"
            placeholder="Lokalizacja wydarzenia"
            errors={errors.event_location?.message}
          />
          <FormInput
            register={register}
            type="number"
            name="tickets_number"
            placeholder="Ilość miejsc na wydarzeniu"
            errors={errors.tickets_number?.message}
          />
        </div>
      </div>
      <SubmitInput type="submit" value="Dodaj wydarzenie" />
    </form>
  );
};

export default AddEventForm;
