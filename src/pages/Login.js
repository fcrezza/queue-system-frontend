import React from "react";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {useAuth} from "../context/AuthContext";
import useError from "../hooks/useError";
import useAsyncError from "../hooks/useAsyncError";
import Layout from "../layout";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Seo from "../components/Seo";
import {ButtonBlock, BackButton} from "../components/Button";
import {
  Container,
  Title,
  ErrorMessage,
  Form,
  RadioContainer
} from "../components/Form";

const validationSchema = object().shape({
  role: string().required("Pilih salah satu role"),
  username: string().required("Username tidak boleh kosong"),
  password: string().required("Password tidak boleh kosong")
});

function Loginpage({history}) {
  const {login} = useAuth();
  const {errors, reset, handleSubmit, register, formState} = useForm({
    validationSchema,
    reValidateMode: "onSubmit"
  });
  const {errorMessage, setError} = useError(errors);
  const setAsyncError = useAsyncError();
  const {isSubmitting} = formState;

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await login(data);
      reset();
      history.push("/");
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
      <Seo title="Login | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Masuk sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioContainer>
            <Radio
              id="student"
              label="Mahasiswa"
              value="student"
              ref={register}
              defaultChecked
            />
            <Radio
              id="professor"
              label="Dosen"
              value="professor"
              ref={register}
            />
          </RadioContainer>
          <Input placeholder="Username" name="username" ref={register} />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            ref={register}
          />
          <ButtonBlock disabled={isSubmitting}>Masuk</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default Loginpage;
