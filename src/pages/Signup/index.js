import React, {useRef} from 'react'
import {Switch, Route} from 'react-router-dom'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import {useAuth} from '../../context/AuthContext'

function Signup({match, history}) {
	const {signup} = useAuth()
	const data = useRef(
		JSON.parse(window.sessionStorage.getItem('formData')) || {},
	)

	const nextStep = (formData, step) => {
		if (formData.role && data.current.role !== formData.role) {
			data.current = {
				...formData,
			}
		} else {
			data.current = {
				...data.current,
				...formData,
			}
		}

		sessionStorage.setItem = JSON.stringify(
			'formData',
			JSON.stringify(data.current),
		)

		history.push(`${match.url}/step-${step}`)
	}

	const sendData = (formData, callback) => {
		data.current = {
			...data.current,
			...formData,
		}
		signup(data.current, callback)
		sessionStorage.removeItem('formData')
		data.current = {}
	}

	return (
		<div>
			<Switch>
				<Route
					path={`${match.path}/step-2`}
					render={() => (
						<Step2
							data={data.current}
							sendData={sendData}
							nextStep={nextStep}
						/>
					)}
				/>
				<Route
					path={`${match.path}/step-3`}
					render={(routerProps) => (
						<Step3 data={data.current} sendData={sendData} {...routerProps} />
					)}
				/>
				<Route
					path={match.path}
					render={() => <Step1 data={data.current} nextStep={nextStep} />}
				/>
			</Switch>
		</div>
	)
}

export default Signup
