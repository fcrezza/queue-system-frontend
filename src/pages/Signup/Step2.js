import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Redirect} from 'react-router-dom'

import Input from '../../components/Input'
import {Button, BackButton} from '../../components/Button'
import {
	Container,
	Form,
	FormWrapper,
	Title,
	Select,
	ErrorMessage,
} from '../../components/Signup'

function Step2({data, nextStep, sendData}) {
	if (data.role === 'dosen') {
		return <DosenForm data={data} sendData={sendData} />
	}

	if (data.role === 'mahasiswa') {
		return <MahasiswaForm data={data} nextStep={nextStep} />
	}

	return <Redirect to="/signup" />
}

function DosenForm({sendData, data}) {
	const {register, errors, handleSubmit, setValue} = useForm()

	useEffect(() => {
		register({name: 'gender'})
		register({name: 'fakultas'})
	}, [register])

	return (
		<Container>
			<BackButton to="/signup" />
			<FormWrapper>
				<Title>Data diri dosen</Title>
				<Form onSubmit={handleSubmit(sendData)}>
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
						items={['Fastikom', 'Ekonomi', 'FKSP']}
					/>
					<Select
						name="gender"
						defaultValue={data.gender}
						placeholder="Jenis kelamin"
						setValue={setValue}
						items={['Laki-laki', 'Perempuan']}
					/>
					<Button>Daftar</Button>
				</Form>
				<ErrorMessage>Sudah ada akun yang menggunakan NIP ini</ErrorMessage>
			</FormWrapper>
		</Container>
	)
}

function MahasiswaForm({nextStep, data}) {
	const {register, errors, handleSubmit, setValue} = useForm()

	useEffect(() => {
		register({name: 'gender'})
		register({name: 'prodi'})

		Object.keys(data).forEach((key) => {
			if (key === 'gender' || key === 'prodi') {
				setValue(key, data[key])
			}
		})
	}, [register])
	
	return (
		<Container>
			<BackButton to="/signup" />
			<FormWrapper>
				<Title>Data diri mahasiswa</Title>
				<Form onSubmit={handleSubmit((formData) => nextStep(formData, 3))}>
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
						items={['Laki-laki', 'Perempuan']}
					/>
					<Select
						name="prodi"
						defaultValue={data.prodi}
						placeholder="Prodi"
						setValue={setValue}
						items={['Teknik informatika', 'Teknik Mesin', 'Teknik Sipil']}
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
				<ErrorMessage>Sudah ada akun yang menggunakan nim ini</ErrorMessage>
			</FormWrapper>
		</Container>
	)
}

export default Step2
