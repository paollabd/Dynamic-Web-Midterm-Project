import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'YlYcIjjzFeGM92bsta2pYAdOu5pyaicg7LngjK3I'; // NASA API key

export default function Pic(props) {
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);

	const [date, setDate] = useState(''); // creating date variable
	const [marsData, setMarsData] = useState({});
	const [marsWeather, setMarsWeather] = useState({});

	function queryMarsImgAPI(queryDate) {
		axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${queryDate}&api_key=${apiKey}`) // API address

		.then(function(response) {
			console.log('response', response);
			if (response.status != 200) {
				isError(true);
				setErrorMessage(`${response.status}: ${'Error'}`);
			} else {
				isSuccess(true);
			}
			setMarsData(response);
			return response;
		})
		.catch(function(error) {
			console.log('error', error);
			return error;		
		});
	}

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

	var solNum = marsWeather.data && marsWeather.data.sol_keys[0];
	var solObject = marsWeather.data && marsWeather.data[0];
    var featuredSol = marsWeather.data && marsWeather.data.sol_keys[marsWeather.data.sol_keys.length - 1];
    var featuredSolObject = marsWeather.data && marsWeather.data[featuredSol];
    var solObjectAT = marsWeather.data && marsWeather.data.sol_keys[0] && marsWeather.data.sol_keys[0]['AT'] && marsWeather.data.sol_keys[0]['AT']['av'];

    const minDay = 1;
    const maxDay = 30;
	useEffect(() => {
		console.log('weather test', queryMarsWeatherAPI());
		const urlParams = new URLSearchParams(props.location.search)
		const dateParam = urlParams.get('date') ? urlParams.get('date') : '2019'+'-'+'09'+'-'+(minDay + (Math.random() * (maxDay - minDay))); // default Earth date: 2015-6-3
		setDate(dateParam);
		console.log('img test', queryMarsImgAPI(dateParam));
	}, []);
	

	return (
		<div className="Info">
			<div className="title">
				<h1>Mars.</h1>
				<h3>Using NASA's InSight API, I was able to pull daily weather measurements from mars, and 
				using the Mars Rover Photos API, I was able to pull images taken form rovers in mars.
				To see more information about these rovers, hover over the image.</h3>
			</div>
			<div className="picture">
				<img className="marsPic" src={marsData.data && marsData.data.photos[0].img_src} />
				<div class="overlay overlayFade">
					<div className="text">
						<p>Picture taken on: {marsData.data && marsData.data.photos[0].earth_date}</p>
						<p>Sol: {marsData.data && marsData.data.photos[0].sol}</p>
						<p>Rover name: {marsData.data && marsData.data.photos[0].rover.name}</p>
						<p>Landing Date: {marsData.data && marsData.data.photos[0].rover.landing_date}</p>
					</div>
				</div> 
			</div> 
			<div class="container">
				<div class="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[0]}</p>
					<p>Temp: {solObjectAT}</p>
				</div>
				<div class="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[1]}</p>
				</div>
				<div class="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[2]}</p>
				</div>
				<div class="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[3]}</p>
				</div>
			</div>
		</div>
	);
}