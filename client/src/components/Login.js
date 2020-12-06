import React, { useState } from 'react';
import FirebaseContext from '../auth/context'

const Login = () => {
	
	return (
		<div>
			<FirebaseContext.Consumer>
				{firebase => ( <>
					{ 
					firebase.loading ? (<> Loading. </>) : 
					!firebase.user ? (
						<>
							<h1> Login with google</h1>
							<button onClick= { () => firebase.signInWithGoogle() }> Sign me In </button>
							{console.log(JSON.stringify(firebase.user))}
						</>
					) : 
					(<>
						<h1> You are logged in </h1>
						<button onClick={ () => firebase.signOut() }> Sign out </button>

					</>) }
				</> )}
				
				
			</FirebaseContext.Consumer>
			
		</div>
			
	);
}

export default (Login);