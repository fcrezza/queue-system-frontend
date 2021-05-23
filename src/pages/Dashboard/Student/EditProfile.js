import React, {useEffect} from "react";
import useSWR, {mutate} from "swr";
import {object, string, number} from "yup";
import {useForm} from "react-hook-form";
import Layout from "../../../layout";
import useError from "../../../hooks/useError";
import useAsyncError from "../../../hooks/useAsyncError";
import Input from "../../../components/Input";
import Select, {ControlledSelect} from "../../../components/Select";
import Spinner from "../../../components/Spinner";
import Seo from "../../../components/Seo";
import {BackButton, ButtonBlock} from "../../../components/Button";
import {Container, Title, Form, ErrorMessage} from "../../../components/Form";
import axios from "../../../utils/axios";

const validationSchema = object().shape({
  nim: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .required("NIM harus di isi"),
  semester: number()
    .transform(value => (value ? parseInt(value, 10) : undefined))
    .required("Semester harus diisi"),
  username: string().required("Username harus di isi"),
  fullname: string().required("Nama lengkap harus di isi"),
  address: string().required("Alamat harus diisi"),
  study: number().required("Prodi harus di isi"),
  gender: number().required("Jenis kelamin harus diisi"),
  professor: number().required("Dosen pembimbing harus diisi")
});

function EditProfile({user, history}) {
  const {
    id,
    semester,
    professor,
    username,
    fullname,
    study,
    address,
    gender,
    nim
  } = user;
  const {register, handleSubmit, errors, setValue, formState, watch} = useForm({
    reValidateMode: "onSubmit",
    validationSchema
  });
  const studyValue = watch("study");
  const professorValue = watch("professor");
  const {data: studyPrograms, errorStudyPrograms} = useSWR("/studyPrograms");
  const {data: genders, errorGenders} = useSWR("/genders");
  const {data: professors, errorProfessors} = useSWR(
    studyValue ? `/studyPrograms/${studyValue}/professors` : null
  );
  const {errorMessage, setError} = useError(errors);
  const setAsyncError = useAsyncError();
  const {isSubmitting} = formState;
  const formattedProfessors =
    professors &&
    professors.map(p => {
      const {fullname: nama, ...rest} = p;
      return {nama, ...rest};
    });

  let selectedProfessorID = null;
  if (studyValue === study.id) {
    selectedProfessorID = professor.id;
  } else if (studyValue !== study.id && formattedProfessors?.length) {
    selectedProfessorID = formattedProfessors[0].id;
  }

  useEffect(() => {
    register({name: "professor"});
    register({name: "study"});
    register({name: "gender"});
  }, [register]);

  useEffect(() => {
    setValue("gender", gender.id);
    setValue("study", study.id);
  }, [gender.id, setValue, study.id]);

  useEffect(() => {
    if (selectedProfessorID) {
      setValue("professor", selectedProfessorID);
    }
  }, [selectedProfessorID, setValue]);

  useEffect(() => {
    if (errorGenders || errorProfessors || errorStudyPrograms) {
      setAsyncError(errorGenders || errorProfessors || errorStudyPrograms);
    }
  }, [errorGenders, errorProfessors, errorStudyPrograms, setAsyncError]);

  const onSubmit = async formData => {
    try {
      await axios.post(`/students/${id}`, formData);
      await mutate("/user");
      history.push("/profile", {status: 1});
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }

      setAsyncError(err);
    }
  };

  if (!formattedProfessors || !studyPrograms || !genders) {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title={`Edit profil | ${fullname}`} />
      <BackButton />
      <Container>
        <Title>Edit profil</Title>
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
            placeholder="NIM"
            name="nim"
            ref={register}
            defaultValue={nim}
          />
          <Select
            name="study"
            defaultValue={studyValue}
            placeholder="Prodi"
            setValue={setValue}
            items={studyPrograms}
          />
          <Input
            placeholder="Semester"
            type="number"
            name="semester"
            ref={register}
            defaultValue={semester}
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
          {formattedProfessors.length ? (
            <ControlledSelect
              name="professor"
              selectedItemID={professorValue}
              placeholder="Dosen pembimbing"
              setValue={setValue}
              items={formattedProfessors}
            />
          ) : null}
          <ButtonBlock disabled={isSubmitting}>Simpan</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  );
}

export default EditProfile;
