import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'YlYcIjjzFeGM92bsta2pYAdOu5pyaicg7LngjK3I'; // NASA API key

export default function Home(props) {
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);

	const [marsWeather, setMarsWeather] = useState({});

	function queryMarsWeatherAPI() {
		axios.get(`https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`) // API address
		.then(function(response) {
			console.log('response', response);
			if (response.status != 200) {
				isError(true);
				setErrorMessage(`${response.status}: ${'Error'}`);
			} else {
				isSuccess(true);
			}
			setMarsWeather(response);
			return response;
		})
		.catch(function(error) {
			console.log('error', error);
			return error;		
		});
	}
	
	useEffect(() => {
		console.log('weather test', queryMarsWeatherAPI());
	}, []);

	var sol = {};
	sol['curr_sol'] = marsWeather.data && marsWeather.data.sol_keys[0];
	console.log('temp test', sol.curr_sol);

	let temperature = sol && sol.curr_sol && sol.curr_sol.AT && sol.curr_sol.AT.av
	console.log('sol', sol);
	console.log('sol.curr_sol', sol.curr_sol);
	console.log('sol.curr_sol.AT', sol.curr_sol.AT);
	console.log('sol.curr_sol.AT.av', sol.curr_sol.AT.av);

	return (
		<div>

			<div className="sol">
				<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[0]}</p>
			</div>
			<div className="temp">
				<p>Temp: {temperature}</p>
			</div>

		</div>
	);
}