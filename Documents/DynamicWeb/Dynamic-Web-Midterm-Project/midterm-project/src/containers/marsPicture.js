import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'YlYcIjjzFeGM92bsta2pYAdOu5pyaicg7LngjK3I'; // NASA API key

export default function Pic(props) {
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);

	const [date, setDate] = useState(''); // creating date variable
	const [marsData, setMarsData] = useState({});

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

	
	useEffect(() => {
		const urlParams = new URLSearchParams(props.location.search)
		const dateParam = urlParams.get('date') ? urlParams.get('date') : '2019-9-10'; // default Earth date: 2015-6-3
		setDate(dateParam);
		console.log('img test', queryMarsImgAPI(dateParam));
	}, []);
	
	console.log('date', date);
	
	return (
		<div>

			<div className="Card infoCard">
				<p>Picture taken on: {marsData.data && marsData.data.photos[0].earth_date}</p>
				<p>Sol: {marsData.data && marsData.data.photos[0].sol}</p>
			</div>

			<div className="Card roverCard">
				<p>Rover name: {marsData.data && marsData.data.photos[0].rover.name}</p>
				<p>Landing Date: {marsData.data && marsData.data.photos[0].rover.landing_date}</p>
			</div>

			<div className="picture">
				<img className="marsPic" src={marsData.data && marsData.data.photos[0].img_src} />
			</div>

		</div>
	);
}