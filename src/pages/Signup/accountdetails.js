import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import {useForm, Controller} from "react-hook-form";
import {object, string, number} from "yup";
import {useErrorHandler} from "react-error-boundary";

import {InputV2} from "../../components/Input";
import Spinner from "../../components/Spinner";
import Layout from "../../layout";
import Seo from "../../components/Seo";
import {Button, BackButton} from "../../components/Button";
import {SelectV2} from "../../components/Select";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "../../utils/axios";
import Label from "../../components/Label";

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

const Container = styled.div`
  margin-top: 4rem;
`;

const ErrorMessageWrapper = styled.div`
  margin: 2rem 0;
  height: 1rem;
`;

const Form = styled.form``;

const studentValidationSchema = object().shape({
  nim: string().trim().required("NIM harus di isi"),
  semester: number()
    .transform(value => (value ? Number(value) : undefined))
    .min(1, "Masukan semester yang valid")
    .required("Semester harus diisi"),
  fullname: string().required("Nama lengkap harus di isi"),
  address: string().required("Alamat harus diisi"),
  study: object().required("Prodi harus di isi"),
  gender: object().required("Jenis kelamin harus diisi")
});

const professorValidationSchema = object().shape({
  nidn: string().required("NIDN harus di isi"),
  fullname: string().required("Nama lengkap harus diisi"),
  address: string().required("Alamat harus diisi"),
  study: object().required("Fakultas harus diisi"),
  gender: object().required("Jenis kelamin harus diisi")
});

function AccountDetails({formData, nextStep, sendData}) {
  if (formData.role === "professor") {
    return <ProfessorForm formData={formData} sendData={sendData} />;
  }

  if (formData.role === "student") {
    return <StudentForm formData={formData} nextStep={nextStep} />;
  }

  return <Redirect to="/signup" />;
}

function StudentForm({nextStep, formData}) {
  const {data: studyPrograms = [], error: studyError} = useSWR("/api/studies");
  const {data: genders = [], error: genderError} = useSWR("/api/genders");
  useErrorHandler(studyError || genderError);
  const {
    register,
    errors,
    handleSubmit,
    setError,
    formState,
    control
  } = useForm({
    studentValidationSchema
  });

  const onSubmit = async data => {
    try {
      await axios.post(`/api/auth/signup/student/nim`, {nim: data.nim});
      nextStep({...formData, ...data}, "choose-professor");
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

  if (!studyPrograms.length || !genders.length) {
    return <Spinner>Memuat data...</Spinner>;
  }

  return (
    <Layout>
      <Seo title="Signup Account Details | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Data diri mahasiswa</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label id="nim">NIM (Nomor Induk Mahasiswa)</Label>
          <InputV2
            id="nim"
            name="nim"
            defaultValue={formData.nim || ""}
            ref={register}
            error={errors.nim}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.nim?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="fullname">Nama Lengkap</Label>
          <InputV2
            id="fullname"
            name="fullname"
            defaultValue={formData.fullname || ""}
            ref={register}
            error={errors.fullname}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.fullname?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="address">Alamat</Label>
          <InputV2
            id="address"
            name="address"
            defaultValue={formData.address || ""}
            ref={register}
            error={errors.address}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.address?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Controller
            as={
              <SelectV2
                items={genders}
                label="Jenis kelamin"
                error={errors.gender}
              />
            }
            defaultValue={formData.gender}
            control={control}
            name="gender"
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.gender?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Controller
            as={
              <SelectV2
                items={studyPrograms}
                label="Prodi"
                error={errors.study}
              />
            }
            defaultValue={formData.study}
            control={control}
            name="study"
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.study?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="semester">Semester</Label>
          <InputV2
            id="semester"
            type="number"
            name="semester"
            defaultValue={formData.semester || ""}
            ref={register}
            error={errors.semester}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.semester?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Button disabled={formState.isSubmitting} type="submit">
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

function ProfessorForm({sendData, formData}) {
  const history = useHistory();
  const {data: genders = [], error: gendersError} = useSWR("/api/genders");
  const {data: studies = [], error: studiesError} = useSWR("/api/studies");
  useErrorHandler(gendersError || studiesError);
  const {
    register,
    errors,
    handleSubmit,
    setError,
    formState,
    control
  } = useForm({professorValidationSchema});

  const onSubmit = async data => {
    try {
      await axios.post(`/api/auth/signup/professor/nidn`, {nidn: data.nidn});
      await sendData({
        ...formData,
        ...data,
        study: data.study.id,
        gender: data.gender.id
      });
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

  if (!studies.length && !genders.length) {
    return <Spinner>Memuat data...</Spinner>;
  }

  return (
    <Layout>
      <Seo title="Daftar - Detail Akun | UNIQUEUE" />
      <BackButton />
      <Container>
        <Title>Data diri dosen</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label id="nidn">NIDN (Nomor Induk Dosen Nasional)</Label>
          <InputV2
            id="nidn"
            type="number"
            name="nidn"
            ref={register}
            error={errors.nidn}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.nidn?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="fullname">Nama Lengkap</Label>
          <InputV2
            id="fullname"
            name="fullname"
            ref={register}
            error={errors.fullname}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.fullname?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Label id="address">Alamat</Label>
          <InputV2
            id="address"
            name="address"
            ref={register}
            error={errors.address}
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.address?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Controller
            as={
              <SelectV2 items={studies} label="Fakultas" error={errors.study} />
            }
            control={control}
            name="study"
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.study?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Controller
            as={
              <SelectV2
                items={genders}
                label="Jenis kelamin"
                error={errors.gender}
              />
            }
            control={control}
            name="gender"
          />
          <ErrorMessageWrapper>
            <ErrorMessage>{errors?.gender?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          <Button type="submit" disabled={formState.isSubmitting}>
            Daftar
          </Button>
        </Form>
        <ErrorMessageWrapper>
          <ErrorMessage>{errors?.server?.types?.message}</ErrorMessage>
        </ErrorMessageWrapper>
      </Container>
    </Layout>
  );
}

export default AccountDetails;
