import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {object, string, number} from 'yup'
import useDeepCompareEffect from 'use-deep-compare-effect'

import Input from '../../../components/Input'
import {Button, BackButton} from '../../../components/Button'
import {
	Container,
	Form,
	FormWrapper,
	Title,
	Select,
	ErrorMessage,
} from '../../../components/Signup'

function MahasiswaForm({nextStep, data}) {
	const [error, setError] = useState({})
	const [prodi, setProdi] = useState(
		JSON.parse(localStorage.getItem('prodi')) || [],
	)
	const [gender, setGender] = useState(
		JSON.parse(localStorage.getItem('gender')) || [],
	)
	const validationSchema = object().shape({
		nim: number()
			.transform((value) => (value ? parseInt(value, 10) : undefined))
			.required('NIM harus di isi'),
		semester: number()
			.transform((value) => (value ? parseInt(value, 10) : undefined))
			.required('Semester harus diisi'),
		fullname: string().required('Nama lengkap harus di isi'),
		alamat: string().required('Alamat harus diisi'),
		prodi: number()
			.oneOf(prodi.map((value) => value.id))
			.required('Prodi harus di isi'),
		gender: number()
			.oneOf(gender.map((value) => value.id))
			.required('Jenis kelamin harus diisi'),
	})
	const {register, errors, handleSubmit, setValue} = useForm({
		reValidateMode: 'onSubmit',
		validationSchema,
	})

	useDeepCompareEffect(() => {
		if (Object.keys(errors).length !== 0) {
			setError({
				type: 'invalid-input',
				message: errors[Object.keys(errors)[0]].message,
			})
		}
	}, [errors])

	useEffect(() => {
		register({name: 'gender'})
		register({name: 'prodi'})

		Object.keys(data).forEach((key) => {
			if (key === 'gender' || key === 'prodi') {
				setValue(key, data[key])
			}
		})
	}, [])

	useEffect(() => {
		if (!prodi.length) {
			axios
				.get('http://localhost:4000/prodi')
				.then((res) => {
					setProdi(res.data)
					localStorage.setItem('prodi', JSON.stringify(res.data))
				})
				.catch((err) => {
					if (err.response) {
						setError({
							type: 'failed-fetch',
							message: err.response.data.message,
						})
					} else {
						setError({
							type: 'failed-fetch',
							message: 'Pastikan kamu terhubung internet',
						})
					}
				})
		}
	}, [])

	useEffect(() => {
		if (!gender.length) {
			axios
				.get('http://localhost:4000/genders')
				.then((res) => {
					setGender(res.data)
					localStorage.setItem('gender', JSON.stringify(res.data))
				})
				.catch((err) => {
					if (err.response) {
						setError({
							type: 'failed-fetch',
							message: err.response.data.message,
						})
					} else {
						setError({
							type: 'failed-fetch',
							message: 'Pastikan kamu terhubung internet',
						})
					}
				})
		}
	}, [])

	const onSubmit = (formData) => {
		axios
			.post('http://localhost:4000/checkUserById', {
				id: formData.nim,
				role: 'mahasiswa'
			})
			.then((_res) => {
				nextStep(formData, 3)
			})
			.catch((err) => {
				if (err.response) {
					setError({type: 'invalid-input', message: err.response.data.message})
				} else {
					setError({
						type: 'invalid-input',
						message: 'Pastikan kamu mempunyai internet koneksi',
					})
				}
			})
	}

	if (error?.type === 'failed-fetch') {
		return <div>{error.message}</div>
	}

	if (prodi.length === 0 || gender.length === 0) {
		return <div>enteni bos ....</div>
	}

	return (
		<Container>
			<BackButton to="/signup" />
			<FormWrapper>
				<Title>Data diri mahasiswa</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input
						placeholder="Nomor induk mahasiswa"
						type="number"
						name="nim"
						defaultValue={data.nim || ''}
						ref={register}
					/>
					<Input
						placeholder="Nama lengkap"
						name="fullname"
						defaultValue={data.fullname || ''}
						ref={register}
					/>
					<Input
						placeholder="Alamat"
						name="alamat"
						defaultValue={data.alamat || ''}
						ref={register}
					/>
					<Select
						name="gender"
						defaultValue={data.gender}
						placeholder="Jenis kelamin"
						setValue={setValue}
						items={gender}
					/>
					<Select
						name="prodi"
						defaultValue={data.prodi}
						placeholder="Prodi"
						setValue={setValue}
						items={prodi}
					/>
					<Input
						placeholder="Semester"
						type="number"
						name="semester"
						defaultValue={data.semester || ''}
						ref={register}
					/>
					<Button type="submit">Lanjut</Button>
				</Form>
				<ErrorMessage>{error.message}</ErrorMessage>
			</FormWrapper>
		</Container>
	)
}

export default MahasiswaForm
