import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {object, string} from "yup";

import Layout from "../../layout";
import Seo from "../../components/Seo";
import ErrorMessage from "../../components/ErrorMessage";
import Radio, {RadioGroup} from "../../components/Radio";
import {InputV2, InputGroup, InputRightElement} from "../../components/Input";
import {Button, BackButton, IconButton} from "../../components/Button";
import {EyeClose, EyeOpen} from "../../components/Icon";
import axios from "../../utils/axios";
import Label from "../../components/Label";

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

export const Container = styled.div`
  margin-top: 4rem;
`;

export const Form = styled.form``;

export const ErrorMessageWrapper = styled.div`
  margin: 2rem 0;
  height: 1rem;
`;

const validationSchema = object().shape({
  role: string().required("Pilih salah satu role"),
  email: string()
    .email("Alamat email tidak valid")
    .required("Email tidak boleh kosong"),
  password: string()
    .min(8, ({min}) => {
      return `Password minimal mengandung ${min} karakter`;
    })
    .required("Password tidak boleh kosong")
});

function Auth({formData, nextStep}) {
  const {
    role: initialRole,
    email: initialEmail,
    password: initialPassword
  } = formData;
  const {register, errors, setError, handleSubmit, formState} = useForm({
    validationSchema
  });
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

  const onSubmit = async data => {
    try {
      const {email, role} = data;
      let url = "";

      if (role === "student") {
        url = "/api/auth/signup/student/email";
      } else {
        url = "/api/auth/signup/professor/email";
      }

      await axios.post(url, {email});
      nextStep(data, "account-details");
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
      <Seo title="Daftar | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Daftar sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup>
            <Radio
              id="student"
              label="Mahasiswa"
              value="student"
              ref={register}
              defaultChecked={initialRole === "student" || true}
            />
            <Radio
              id="professor"
              label="Dosen"
              value="professor"
              ref={register}
              defaultChecked={initialRole === "professor"}
            />
          </RadioGroup>
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.role?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="email">Email</Label>
          <InputV2
            id="email"
            name="email"
            defaultValue={initialEmail || ""}
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
              defaultValue={initialPassword || ""}
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
            Lanjut
          </Button>
        </Form>
        <ErrorMessageWrapper>
          <ErrorMessage>{errors?.server?.types?.message}</ErrorMessage>
        </ErrorMessageWrapper>
      </Container>
    </Layout>
  );
}

export default Auth;
