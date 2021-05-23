import React, {useEffect} from "react";
import {object, number, string} from "yup";
import useSWR, {mutate} from "swr";
import {useForm} from "react-hook-form";
import Layout from "../../../layout";
import useError from "../../../hooks/useError";
import useAsyncError from "../../../hooks/useAsyncError";
import Input from "../../../components/Input";
import Seo from "../../../components/Seo";
import Select from "../../../components/Select";
import Spinner from "../../../components/Spinner";
import {BackButton, ButtonBlock} from "../../../components/Button";
import {Container, Title, Form, ErrorMessage} from "../../../components/Form";
import axios from "../../../utils/axios";

const validationSchema = object().shape({
  nip: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .required("NIP harus di isi"),
  username: string().required("Username harus di isi"),
  fullname: string().required("Nama lengkap harus di isi"),
  address: string().required("Alamat harus diisi"),
  faculty: number().required("Fakultas harus di isi"),
  gender: number().required("Jenis kelamin harus diisi")
});

function EditProfile({user, history}) {
  const {register, handleSubmit, setValue, formState, errors} = useForm({
    reValidateMode: "onSubmit",
    validationSchema
  });
  const {data: faculties, error: errorFaculties} = useSWR("/faculties");
  const {data: genders, error: errorGenders} = useSWR("/genders");
  const {errorMessage, setError} = useError(errors);
  const {id, gender, username, nip, address, fullname, faculty} = user;
  const {isSubmitting} = formState;
  const setAsyncError = useAsyncError();

  useEffect(() => {
    register("gender");
    register("faculty");
  }, [register]);

  useEffect(() => {
    setValue("gender", gender.id);
    setValue("faculty", faculty.id);
  }, [faculty.id, gender.id, setValue]);

  useEffect(() => {
    if (errorGenders || errorFaculties) {
      setAsyncError(errorGenders || errorFaculties);
    }
  }, [errorGenders, errorFaculties, setAsyncError]);

  const onSubmit = async formData => {
    try {
      await axios.post(`/professors/${id}`, formData);
      await mutate("/user");
      history.push("/profile", {status: 1});
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }

      setAsyncError(error);
    }
  };

  if (!faculties || !genders) {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title={`Edit profil || ${fullname}`} />
      <BackButton />
      <Container>
        <Title>Ubah profil</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Username"
            name="username"
            ref={register}
            defaultValue={username}
          />
          <Input
            placeholder="Nama Lengkap"
            name="fullname"
            ref={register}
            defaultValue={fullname}
          />
          <Input
            placeholder="NIP"
            name="nip"
            ref={register}
            defaultValue={nip}
          />
          <Select
            name="faculty"
            defaultValue={faculty.id}
            placeholder="Fakultas"
            setValue={setValue}
            items={faculties}
          />
          <Select
            name="gender"
            defaultValue={gender.id}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <Input
            placeholder="Alamat"
            name="address"
            ref={register}
            defaultValue={address}
          />
          <ButtonBlock disabled={isSubmitting}>Simpan</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default EditProfile;
