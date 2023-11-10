import { signUpUser } from '@/server/actions/user-actions';
import { Button, Input } from '@nextui-org/react';
import { useRef, useState } from 'react';

export default function SignUpForm() {
	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	// Sign up form handler function
	async function signUpFormHandler(formData: FormData) {
		const serverResponse = await signUpUser(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');
		}
	}

	return (
		<form
			ref={formElementRef}
			className='flex flex-col gap-2'
			action={signUpFormHandler}>
			{/* Email input field */}
			<Input
				key='email'
				type='email'
				label='Email'
				name='email'
				isRequired={true}
			/>

			{/* Username input field */}
			<Input
				key='username'
				type='text'
				label='Username'
				name='username'
				isRequired={true}
			/>

			{/* Password input field */}
			<Input
				key='password'
				type='password'
				label='Password'
				name='password'
				isRequired={true}
			/>

			{/* Form error message */}
			<p className='text-red-500'>{errorMessage}</p>

			{/* Sign up button */}
			<Button type='submit'>Sign Up</Button>
		</form>
	);
}
