import React, {useState} from "react";
import {StyleSheet, View} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import {QueryClient, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {FieldValues, useForm} from "react-hook-form";
import User from "../../User/User";
import CustomButton from "../../Buttons/CustomButton/CustomButton";
import {supabaseClient} from "../../../supabase/supabase";
import {decode} from "base64-arraybuffer";
import FormInput from "../../Inputs/FormInput/FormInput";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {updateProfile} from "../../../supabase/requests/users";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

interface EditProfileFormProps {
    first_name: string | null | undefined
    last_name: string | null | undefined
    image_url: string | null | undefined
    uuid: string | undefined
    refetch: any
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({first_name, last_name, image_url, uuid, refetch}) => {
    const [url, setUrl] = useState<string | undefined | null>(image_url)
    const client: QueryClient = useQueryClient()
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const {control, handleSubmit, reset, formState: {errors, defaultValues}} = useForm({
        defaultValues: {
            first_name: first_name ? first_name : "",
            last_name: last_name ? last_name : ""
        }
    })

    let updateProfileMutation: UseMutationResult<
        PostgrestSingleResponse<null>,
        unknown,
        any
    >;

    if (typeof uuid === "string" && typeof url === "string") {
        updateProfileMutation = useMutation({
            mutationFn: (data: any) =>
                updateProfile(uuid, data.first_name, data.last_name, url),
            onError: () => {
                console.log("Error");
            },
            onSuccess: async () => {
                await client.invalidateQueries(["user", uuid]);
                refetch();
                reset()
                navigation.goBack();
            },
        });
    }

    const uploadImage = async (image: any) => {
        const imageId: string = Date.now().toString()
        await supabaseClient.storage
            .from("images")
            .upload(`${uuid}/profile/${imageId}.png`, decode(image), {
                contentType: "image/png"
            })
        const {data} = supabaseClient.storage
            .from("images")
            .getPublicUrl(`${uuid}/profile/${imageId}.png`)
        setUrl(data?.publicUrl)
    }

    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true
        })

        if (!res.canceled) {
            await uploadImage(res.assets[0].base64);
        }
    }

    return (
        <View style={styles.container}>
            <User first_name={defaultValues?.first_name} last_name={defaultValues?.last_name}
                  image_url={url}/>
            <CustomButton title="Wybierz zdjęcie" onPress={pickImage} isAlt={true}/>
            <FormInput placeholder="Imię" name="first_name" control={control} errors={errors.first_name}/>
            <FormInput placeholder="Nazwisko" name="last_name" control={control} errors={errors.last_name}/>
            <CustomButton title="Zapisz"
                          onPress={handleSubmit((values: FieldValues) => updateProfileMutation.mutate(values))}
                          isAlt={false}/>
        </View>
    )
}

export default EditProfileForm

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: globalStyles.spacing.xl
    }
})
