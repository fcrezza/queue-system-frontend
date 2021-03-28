import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {object, string} from "yup";

import Seo from "../components/Seo";
import ErrorMessage from "../components/ErrorMessage";
import Layout from "../layout";
import Radio, {RadioGroup} from "../components/Radio";
import {InputV2, InputGroup, InputRightElement} from "../components/Input";
import {EyeClose, EyeOpen} from "../components/Icon";
import {Button, BackButton, IconButton} from "../components/Button";
import {useAuth} from "../context/AuthContext";

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

const Container = styled.div`
  margin-top: 4rem;

  & > ${ErrorMessage} {
    margin-top: 3rem;
  }
`;

const Form = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 3.5rem;
  }
`;

const validationSchema = object().shape({
  role: string().required("Pilih salah satu role"),
  username: string().required("Username tidak boleh kosong"),
  password: string()
    .required("Password tidak boleh kosong")
    .min(8, state => `Password minimal mengandung ${state.min} karakter`)
});

function Loginpage({history}) {
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
      history.push("/");
    } catch (error) {
      if (error.response) {
        setError("server", {
          type: "server",
          message: error.response.data.message
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
      <Seo title="Login | UNIQUEUE" />
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
          <InputV2 placeholder="Username" name="username" ref={register} />
          <InputGroup>
            <InputV2
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              ref={register}
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
          <Button type="submit" disabled={formState.isSubmitting}>
            Masuk
          </Button>
        </Form>
        {Object.keys(errors).length ? (
          <ErrorMessage>
            {errors[Object.keys(errors)[0]].message ||
              errors[Object.keys(errors)[0]].types.message}
          </ErrorMessage>
        ) : null}
      </Container>
    </Layout>
  );
}

export default Loginpage;
