import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'YlYcIjjzFeGM92bsta2pYAdOu5pyaicg7LngjK3I'; // NASA API key

export default function Pic(props) {
	const urlParams = new URLSearchParams(props.location.search);
	const dateParam = urlParams.get('date') ? urlParams.get('date') : '2019-9-10'; // default Earth date: 2015-6-3

	const [date, setDate] = useState(''); // creating date variable
	const [marsData, setMarsData] = useState({});
	const [marsWeather, setMarsWeather] = useState({});
	const [input, setInput] = useState('')

	function queryMarsImgAPI(queryDate) {
		axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${queryDate}&api_key=${apiKey}`) // API address

		.then(function(response) {
			console.log('response', response);
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
			setMarsWeather(response);
			return response;
		})
		.catch(function(error) {
			console.log('error', error);
			return error;		
		});
	}	

    //var temp = marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[322]['AT'].av
    console.log('DATA', marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['AT'].av)

	useEffect(() => {
		console.log('weather test', queryMarsWeatherAPI());
		
		setDate(dateParam);
		console.log('img test', queryMarsImgAPI(dateParam));
	}, [dateParam]);
	

	return (

		<div className="info">
		<link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/tex-gyre-adventor" type="text/css"/>
			<div className="title">
				<h1>Mars.</h1>
				<h3>Using NASA's InSight API, I was able to pull daily weather measurements from Mars, and 
				using the Mars Rover Photos API, I was able to pull images taken from rovers in mars.
				To see more information about the photo, hover over the image.</h3>
				<div className="moreInfo">
					<h4>Sol {marsWeather.data && marsWeather.data.sol_keys[0]}</h4>
					<h3>Season: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['Season']}</h3>
					<h3>Temperature: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['AT'].av} °F</h3>
					<h3>Pressure: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['PRE'].av} Pa</h3>
					<h3>Wind: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['HWS'].av} m/s</h3>
				</div>
			</div>
			{marsData.data && marsData.data.photos[0] &&
				<div className="picture">
					<img className="marsPic" src={marsData.data.photos[0].img_src} alt="from Mars" />
					<div className="overlay overlayFade">
						<div className="text">
							<p>Picture taken on: {marsData.data.photos[0].earth_date}</p>
							<p>Sol: {marsData.data.photos[0].sol}</p>
							<p>Rover name: {marsData.data.photos[0].rover.name}</p>
							<p>Landing Date: {marsData.data.photos[0].rover.landing_date}</p>
							<form>
								<h3>Day of Picture:</h3>
								<p>To change images, enter date (yyyy-mm-dd)</p>
								<p>Click the 'set date' button</p>
								<input onChange={event => setInput(event.target.value)} />
							</form>
							<a className={`WeatherNav__Item ${date === {input} ? 'WeatherNav__Item--active' : ''}`} href={`/?date=${input}`}>Set Date</a>
						</div>
					</div>
				</div> 
			}
			{marsData.data && !marsData.data.photos[0] && 
				<div className="noImage">
				<div className="text">
					<h1>Darn!</h1>
					<p>Date doesn't have image. try again</p>
						<form>
							<h3>Day of Picture:</h3>
							<p>To change images, enter date (yyyy-mm-dd)</p>
							<p>Click the 'set date' button</p>
							<input onChange={event => setInput(event.target.value)} />
						</form>
						<a className={`WeatherNav__Item ${date === {input} ? 'WeatherNav__Item--active' : ''}`} href={`/?date=${input}`}>Set Date</a>
					</div>
				</div>
			}
			<div className={`container ${marsData.data && !marsData.data.photos[0] ? 'noContainer' : ''}`}>
				<div className="container_item container_item_1">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[0]}</p>
					<p>Temp: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['AT'].av} °F</p>
					<p>Min: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['AT'].mn} °F</p>
					<p>Max: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[0]] && marsWeather.data[marsWeather.data.sol_keys[0]]['AT'].mx} °F</p>
				</div>
				<div className="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[1]}</p>
					<p>Temp: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[1]] && marsWeather.data[marsWeather.data.sol_keys[1]]['AT'].av} °F</p>
					<p>Min: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[1]] && marsWeather.data[marsWeather.data.sol_keys[1]]['AT'].mn} °F</p>
					<p>Max: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[1]] && marsWeather.data[marsWeather.data.sol_keys[1]]['AT'].mx} °F</p>
				</div>
				<div className="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[2]}</p>
					<p>Temp: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[2]] && marsWeather.data[marsWeather.data.sol_keys[2]]['AT'].av} °F</p>
					<p>Min: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[2]] && marsWeather.data[marsWeather.data.sol_keys[2]]['AT'].mn} °F</p>
					<p>Max: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[2]] && marsWeather.data[marsWeather.data.sol_keys[2]]['AT'].mx} °F</p>
				</div>
				<div className="container_item">
					<p>Sol: {marsWeather.data && marsWeather.data.sol_keys[3]}</p>
					<p>Temp: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[3]] && marsWeather.data[marsWeather.data.sol_keys[3]]['AT'].av} °F</p>
					<p>Min: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[3]] && marsWeather.data[marsWeather.data.sol_keys[3]]['AT'].mn} °F</p>
					<p>Max: {marsWeather.data && marsWeather.data[marsWeather.data.sol_keys[3]] && marsWeather.data[marsWeather.data.sol_keys[3]]['AT'].mx} °F</p>
				</div>
			</div>
		</div>
	);
}