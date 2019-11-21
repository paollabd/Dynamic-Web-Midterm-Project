import React from "react";

export default function Login() {
	function submitFunction(e) {
		console.log(e);
	}

// export default function userProfile() {
// 	return (
// 		<div>
// 			<div>Login</div>
// 			<UserInformation />
// 		</div>
// 	);
// }


	return (
		<form action='/submit' method='GET' className="formContainer">

			<label for='loginEmail'>Email</label>
			<input type='text' name='email' placeholder='who@where.com' />
			<br>
			<br>
			<label for='loginPassword'>Password</label>
			<input type='text' name='text' placeholder='..........' />
			<br>
			<br>
			<input type='submit' value='submit' className="btn" />
		</form>
	);	
}

export default LoginForm;