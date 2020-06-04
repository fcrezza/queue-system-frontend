import React from 'react'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'

import {BackButton} from '../../components/Button'
import {Container, Title as OriginalTitle} from '../../components/Signup'
import dosenMale1 from '../../images/dosen/dosen-male-1.svg'

const Title = styled(OriginalTitle)`
	margin: 3rem 0 1rem;
`

const Subtitle = styled.p`
	color: #333;
	margin: 0 0 3rem;
	font-size: 1.8rem;
`

const SearchInput = styled.input`
	background: #f0f0f0;
	color: #333;
	border: 0;
	font-size: 1.6rem;
	width: 100%;
	padding: 1.3rem;
	outline: none;
`

const ListItem = styled.div`
	margin: 5rem 0;

	& > div {
		margin-bottom: 3.5rem;
	}
`

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	box-shadow: 0px 0px 20px #d9d9d9;
	padding: 2rem;
	border-radius: 5px;
	color: #333;
`

const ItemImage = styled.div`
	img {
		width: 60px;
	}
`

const ItemText = styled.div`
	margin-left: 1.8rem;

	h3 {
		font-size: 1.6rem;
		margin: 0 0 0.5rem;
	}

	p {
		margin: 0;
		font-size: 1.3rem;
	}
`

const ItemButton = styled.button`
	background: transparent;
	border: 1px solid #222;
	color: #222;
	font-size: 1.2rem;
	outline: none;
	font-weight: 700;
	padding: 0.8rem 1.2rem;
	border-radius: 5px;
	cursor: pointer;
	margin-left: auto;
`

function Step3({data, sendData}) {
	if (data.role === 'mahasiswa') {
		return (
			<Container>
				<BackButton to="/signup/step-2" replace />
				<Title>Pilih dosen</Title>
				<Subtitle>
					Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
				</Subtitle>
				<SearchInput placeholder="Cari dosen..." />
				<ListItem>
					<Item
						sendData={sendData}
						fakultas="Fastikom"
						id={1}
						name="Jahn Doe"
					/>
					<Item
						sendData={sendData}
						fakultas="Fastikom"
						id={2}
						name="Khasmir"
					/>
				</ListItem>
			</Container>
		)
	}

	return <Redirect to="/signup" />
}

function Item({sendData, fakultas, name, id}) {
	return (
		<ItemContainer>
			<ItemImage>
				<img src={dosenMale1} alt="" />
			</ItemImage>
			<ItemText>
				<h3>{name}</h3>
				<p>{fakultas}</p>
			</ItemText>
			<ItemButton onClick={() => sendData({dosenId: id})}>Pilih</ItemButton>
		</ItemContainer>
	)
}

export default Step3
