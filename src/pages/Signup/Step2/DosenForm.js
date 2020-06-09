import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useForm} from 'react-hook-form'
import {object, string, number} from 'yup'
import {useHistory} from 'react-router-dom'

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

const dosenAvatars = {
	male: ['dosenMale1', 'dosenMale2', 'dosenMale3'],
	female: ['dosenFemale1', 'dosenFemale2', 'dosenFemale3'],
}

function DosenForm({sendData, data}) {
	const history = useHistory()
	const [error, setError] = useState({})
	const [fakultas, setFakultas] = useState(
		JSON.parse(localStorage.getItem('fakultas')) || [],
	)
	const [gender, setGender] = useState(
		JSON.parse(localStorage.getItem('gender')) || [],
	)
	const validationSchema = object().shape({
		nip: number()
			.transform((value) => (value ? parseInt(value, 10) : undefined))
			.required('NIP harus di isi'),
		fullname: string().required('Nama lengkap harus di isi'),
		alamat: string().required('Alamat harus diisi'),
		fakultas: number()
			.oneOf(fakultas.map((value) => value.id))
			.required('fakultas harus di isi'),
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
		register({name: 'fakultas'})
	}, [])

	useEffect(() => {
		if (!fakultas.length) {
			axios
				.get('http://localhost:4000/fakultas')
				.then((res) => {
					setFakultas(res.data)
					localStorage.setItem('fakultas', JSON.stringify(res.data))
				})
				.catch((err) => {
					if (err.response) {
						setError({type: 'failed-fetch', message: err.response.data.message})
					} else {
						setError({
							type: 'failed-fetch',
							message: 'Pastikan kamu terhubung ke internet',
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
						setError({type: 'failed-fetch', message: err.response.data.message})
					} else {
						setError({
							type: 'failed-fetch',
							message: 'Pastikan kamu terhubung ke internet',
						})
					}
				})
		}
	}, [])

	const onSubmit = (formData) => {
		axios
			.post('http://localhost:4000/checkUserById', {
				id: formData.nip,
				role: 'dosen',
			})
			.then((_res) => {
				const randomNumber = Math.floor(Math.random() * 3)
				const randomAvatar =
					data.gender === 1
						? dosenAvatars.male[randomNumber]
						: dosenAvatars.female[randomNumber]

				sendData(
					{
						...data,
						...formData,
						avatar: randomAvatar,
					},
					(err) => {
						if (err) {
							setError({type: 'invalid-input', message: err})
							return 
						}

						history.push('/')
					},
				)
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

	if (fakultas.length === 0 || gender.length === 0) {
		return <div>enteni bos ....</div>
	}

	return (
		<Container>
			<BackButton to="/signup" />
			<FormWrapper>
				<Title>Data diri dosen</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input
						placeholder="Nomor induk pegawai"
						type="number"
						name="nip"
						ref={register}
					/>
					<Input placeholder="Nama lengkap" name="fullname" ref={register} />
					<Input placeholder="Alamat" name="alamat" ref={register} />
					<Select
						defaultValue={data.fakultas}
						name="fakultas"
						placeholder="Fakultas"
						setValue={setValue}
						items={fakultas}
					/>
					<Select
						name="gender"
						defaultValue={data.gender}
						placeholder="Jenis kelamin"
						setValue={setValue}
						items={gender}
					/>
					<Button>Daftar</Button>
				</Form>
				<ErrorMessage>{error.message}</ErrorMessage>
			</FormWrapper>
		</Container>
	)
}

export default DosenForm
