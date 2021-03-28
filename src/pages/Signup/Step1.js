import React from "react";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import useError from "../../hooks/useError";
import useAsyncError from "../../hooks/useAsyncError";
import Layout from "../../layout";
import Seo from "../../components/Seo";
import Radio from "../../components/Radio";
import Input from "../../components/Input";
import {Button, BackButton} from "../../components/Button";
import {
  ErrorMessage,
  Container,
  Form,
  Title,
  RadioContainer
} from "../../components/Form";
import axios from "../../libs/axios";

const validationSchema = object().shape({
  role: string().required("Pilih salah satu role"),
  username: string().required("Username tidak boleh kosong"),
  password: string()
    .min(8, ({min}) => {
      return `Password minimal mengandung ${min} karakter`;
    })
    .required("Password tidak boleh kosong")
});

function Step1({cacheFormData, nextStep}) {
  const {
    role: cacheRole,
    username: cacheUsername,
    password: cachePassword
  } = cacheFormData;
  const {register, errors, handleSubmit, formState} = useForm({
    reValidateMode: "onSubmit",
    validationSchema
  });
  const {errorMessage, setError} = useError(errors);
  const setAsyncError = useAsyncError();
  const {isSubmitting} = formState;

  const onSubmit = async formData => {
    try {
      const {username, role} = formData;
      const url =
        role === "student"
          ? `/students/username/${username}`
          : `/professors/username/${username}`;

      await axios.get(url);
      nextStep(formData, 2);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
        return;
      }

      setAsyncError(err);
    }
  };

  return (
    <Layout>
      <Seo title="Signup | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Daftar sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioContainer>
            <Radio
              id="student"
              label="Mahasiswa"
              value="student"
              ref={register}
              defaultChecked={cacheRole === "student" || true}
            />
            <Radio
              id="professor"
              label="Dosen"
              value="professor"
              ref={register}
              defaultChecked={cacheRole === "professor"}
            />
          </RadioContainer>
          <Input
            placeholder="Username"
            name="username"
            defaultValue={cacheUsername || ""}
            ref={register}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            defaultValue={cachePassword || ""}
            ref={register}
          />
          <Button disabled={isSubmitting}>Lanjut</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default Step1;
