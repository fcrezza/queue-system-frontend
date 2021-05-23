import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {object, string} from "yup";

import Seo from "../components/Seo";
import ErrorMessage from "../components/ErrorMessage";
import Label from "../components/Label";
import Layout from "../layout";
import Radio, {RadioGroup} from "../components/Radio";
import {InputV2, InputGroup, InputRightElement} from "../components/Input";
import {EyeClose, EyeOpen} from "../components/Icon";
import {BackButton, Button, IconButton} from "../components/Button";
import {useAuth} from "../utils/auth";

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

const Container = styled.div`
  margin-top: 4rem;
`;

const Form = styled.form``;

const ErrorMessageWrapper = styled.div`
  margin: 2rem 0;
  height: 1rem;
`;

const validationSchema = object().shape({
  role: string().required("Pilih salah satu role"),
  email: string()
    .email("Alamat email tidak valid")
    .required("Email tidak boleh kosong"),
  password: string()
    .required("Password tidak boleh kosong")
    .min(8, state => `Password minimal mengandung ${state.min} karakter`)
});

function Login({history}) {
  const {login} = useAuth();
  const {errors, handleSubmit, register, setError, formState} = useForm({
    validationSchema,
    reValidateMode: "onSubmit"
  });
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await login(data);
      history.push("/home");
    } catch (error) {
      if (error.response) {
        setError("server", {
          type: "server",
          message: error.response.data.error.message
        });
        return;
      }

      setError("server", {
        type: "server",
        message: "Upzzz ada yang tidak beres, coba lagi"
      });
    }
  };

  return (
    <Layout>
      <Seo title="Masuk | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Masuk sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup>
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
          </RadioGroup>
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.role?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="email">Email</Label>
          <InputV2
            id="email"
            name="email"
            ref={register}
            error={errors.email}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="password">Password</Label>
          <InputGroup>
            <InputV2
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              ref={register}
              error={errors.password}
            />
            <InputRightElement>
              <IconButton
                onClick={() => setPasswordVisibility(prevState => !prevState)}
              >
                {isPasswordVisible ? (
                  <EyeClose width="24" height="24" />
                ) : (
                  <EyeOpen width="24" height="24" />
                )}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Button type="submit" disabled={formState.isSubmitting}>
            Masuk
          </Button>
        </Form>
        <ErrorMessageWrapper>
          <ErrorMessage>{errors?.server?.types?.message}</ErrorMessage>
        </ErrorMessageWrapper>
      </Container>
    </Layout>
  );
}

export default Login;
