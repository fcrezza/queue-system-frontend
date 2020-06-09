import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'

import Radio from '../../../components/Radio'
import Input from '../../../components/Input'
import {Button, BackButton} from '../../../components/Button'
import {
	ErrorMessage,
	Container,
	Form,
	FormWrapper,
	Title,
} from '../../../components/Signup'

const RadioContainer = styled.div`
	display: flex;
	align-items: center;
`

function Step1({data, nextStep}) {
	const [error, setError] = useState(null)
	const validationSchema = object().shape({
		role: string().oneOf(['mahasiswa', 'dosen']).required(),
		username: string().required('Username harus di isi'),
		password: string()
			.min(8, ({min}) => {
				return `Password minimal mengandung ${min} karakter`
			})
			.required('Password harus di isi'),
	})
	const {register, errors, handleSubmit} = useForm({
		reValidateMode: 'onSubmit',
		validationSchema,
	})

	useDeepCompareEffect(() => {
		if (Object.keys(errors).length !== 0) {
			setError(errors[Object.keys(errors)[0]].message)
		}
	}, [errors])

	const onSubmit = (formData) => {
		axios
			.post('http://localhost:4000/checkUsername', {
				username: formData.username,
				role: formData.role,
			})
			.then((_res) => {
				nextStep(formData, 2)
			})
			.catch((err) => {
				if (err.response) {
					setError(err.response.data.message)
				} else {
					setError('Pastikan kamu mempunyai internet koneksi')
				}
			})
	}

	return (
		<Container>
			<BackButton to="/" />
			<FormWrapper>
				<Title>Daftar sebagai</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<RadioContainer>
						<Radio
							id="mahasiswa"
							label="Mahasiswa"
							value="mahasiswa"
							ref={register}
							defaultChecked={data.role === 'mahasiswa' || true}
						/>
						<Radio
							id="dosen"
							label="Dosen"
							value="dosen"
							ref={register}
							defaultChecked={data.role === 'dosen'}
						/>
					</RadioContainer>
					<Input
						placeholder="Username"
						name="username"
						defaultValue={data.username || ''}
						ref={register}
					/>
					<Input
						placeholder="Password"
						name="password"
						type="password"
						defaultValue={data.password || ''}
						ref={register}
					/>
					<Button type="submit">Lanjut</Button>
				</Form>
				<ErrorMessage>{error}</ErrorMessage>
			</FormWrapper>
		</Container>
	)
}

export default Step1
