import React, {useEffect} from "react";
import useSWR from "swr";
import {useForm} from "react-hook-form";
import {object, string, number} from "yup";
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";
import Layout from "../../../layout";
import Seo from "../../../components/Seo";
import useAsyncError from "../../../hooks/useAsyncError";
import useError from "../../../hooks/useError";
import {Button, BackButton} from "../../../components/Button";
import Select from "../../../components/Select";
import {Container, Form, Title, ErrorMessage} from "../../../components/Form";
import axios from "../../../libs/axios";

const validationSchema = object().shape({
  nim: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .required("NIM harus di isi"),
  semester: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .min(1, "Masukan Semester yang valid")
    .required("Semester harus diisi"),
  fullname: string().required("Nama lengkap harus di isi"),
  address: string().required("Alamat harus diisi"),
  study: number().required("Prodi harus di isi"),
  gender: number().required("Jenis kelamin harus diisi")
});

function MahasiswaForm({nextStep, cacheFormData}) {
  const {data: studyPrograms = [], error: studyError} = useSWR(
    "/studyPrograms"
  );
  const {data: genders = [], error: genderError} = useSWR("/genders");

  const {register, errors, handleSubmit, setValue, formState} = useForm({
    reValidateMode: "onSubmit",
    validationSchema
  });
  const {errorMessage, setError} = useError(errors);
  const setAsyncError = useAsyncError();
  const {isSubmitting} = formState;

  useEffect(() => {
    register({name: "gender"});
    register({name: "study"});
    setValue("study", cacheFormData.study);
    setValue("gender", cacheFormData.gender);
  }, [cacheFormData.gender, cacheFormData.study, register, setValue]);

  const onSubmit = async formData => {
    try {
      await axios.get(`/students/nim/${formData.nim}`);
      nextStep(formData, 3);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
        return;
      }

      setAsyncError(err);
    }
  };

  useEffect(() => {
    if (studyError || genderError) {
      setAsyncError(studyError || genderError);
    }
  }, [studyError, genderError, setAsyncError]);

  if (!studyPrograms.length || !genders.length) {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title="Signup step-2 | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Data diri mahasiswa</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nomor induk mahasiswa"
            type="number"
            name="nim"
            defaultValue={cacheFormData.nim || ""}
            ref={register}
          />
          <Input
            placeholder="Nama lengkap"
            name="fullname"
            defaultValue={cacheFormData.fullname || ""}
            ref={register}
          />
          <Input
            placeholder="Alamat"
            name="address"
            defaultValue={cacheFormData.address || ""}
            ref={register}
          />
          <Select
            name="gender"
            defaultValue={cacheFormData.gender}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <Select
            name="study"
            defaultValue={cacheFormData.study}
            placeholder="Prodi"
            setValue={setValue}
            items={studyPrograms}
          />
          <Input
            placeholder="Semester"
            type="number"
            name="semester"
            defaultValue={cacheFormData.semester || ""}
            ref={register}
          />
          <Button disabled={isSubmitting} type="submit">
            Lanjut
          </Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default MahasiswaForm;
