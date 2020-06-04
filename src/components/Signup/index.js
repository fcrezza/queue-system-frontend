import styled from 'styled-components'
import Select from './Select'

const Container = styled.div`
	padding: 3rem 2rem;
`

const Form = styled.form`
	& > * {
		margin-bottom: 3.5rem;
	}

	button {
		margin-left: auto;
	}
`

const FormWrapper = styled.div`
	margin-top: 5rem;
`

const Title = styled.h1`
	font-size: 3rem;
	margin: 0 0 3rem;
`

const ErrorMessage = styled.p`
	font-size: 1.4rem;
	color: #ff304f;
	margin-top: 2rem;
`

export {Container, Form, FormWrapper, Title, ErrorMessage, Select}