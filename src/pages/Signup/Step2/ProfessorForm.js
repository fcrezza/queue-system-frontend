import React, {useEffect} from "react";
import useSWR from "swr";
import {useForm} from "react-hook-form";
import {object, string, number} from "yup";
import {useHistory} from "react-router-dom";
import useError from "../../../hooks/useError";
import useAsyncError from "../../../hooks/useAsyncError";
import Select from "../../../components/Select";
import Seo from "../../../components/Seo";
import Input from "../../../components/Input";
import Layout from "../../../layout";
import Spinner from "../../../components/Spinner";
import {ButtonBlock, BackButton} from "../../../components/Button";
import {Container, Form, Title, ErrorMessage} from "../../../components/Form";
import axios from "../../../libs/axios";

const professorAvatars = {
  male: ["professorMale1", "professorMale2", "professorMale3"],
  female: ["professorFemale1", "professorFemale2", "professorFemale3"]
};

const validationSchema = object().shape({
  nip: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .required("NIP harus di isi"),
  fullname: string().required("Nama lengkap harus di isi"),
  address: string().required("Alamat harus diisi"),
  faculty: number().required("fakultas harus di isi"),
  gender: number().required("Jenis kelamin harus diisi")
});

function DosenForm({sendData, cacheFormData}) {
  const history = useHistory();
  const {data: genders = [], error: gendersError} = useSWR("/genders");
  const {data: faculties = [], error: facultiesError} = useSWR("/faculties");
  const {register, errors, handleSubmit, setValue, formState} = useForm({
    reValidateMode: "onSubmit",
    validationSchema
  });
  const {errorMessage, setError} = useError(errors);
  const setAsyncError = useAsyncError();
  const {isSubmitting} = formState;

  useEffect(() => {
    if (facultiesError || gendersError) {
      setAsyncError(facultiesError || gendersError);
    }
  }, [facultiesError, gendersError, setAsyncError]);

  useEffect(() => {
    register({name: "gender"});
    register({name: "faculty"});
  }, [register]);

  const onSubmit = async formData => {
    try {
      await axios.get(`/professors/nip/${formData.nip}`);
      const randomNumber = Math.floor(Math.random() * 3);
      const randomAvatar =
        formData.gender === 1
          ? professorAvatars.male[randomNumber]
          : professorAvatars.female[randomNumber];
      await sendData({
        ...cacheFormData,
        ...formData,
        avatar: randomAvatar
      });
      history.push("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
        return;
      }

      setAsyncError(err);
    }
  };

  if (!faculties.length && !genders.length) {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title="Signup step-2 | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Data diri dosen</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nomor induk pegawai"
            type="number"
            name="nip"
            ref={register}
          />
          <Input placeholder="Nama lengkap" name="fullname" ref={register} />
          <Input placeholder="Alamat" name="address" ref={register} />
          <Select
            name="faculty"
            placeholder="Fakultas"
            setValue={setValue}
            items={faculties}
          />
          <Select
            name="gender"
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <ButtonBlock disabled={isSubmitting}>Daftar</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default DosenForm;
