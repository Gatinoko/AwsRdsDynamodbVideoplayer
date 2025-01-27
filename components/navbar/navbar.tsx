'use client';

import React, { useEffect, useState } from 'react';
import {
	Navbar as Navigation,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Link,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
	Input,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
('./login-signup-buttons/nav-content');
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

type NavigationProps = {
	jwtToken?: any;
};

export default function Navbar({ jwtToken }: NavigationProps) {
	// Router reference
	const router = useRouter();

	// Auth context information
	const { authInformation, setAuthInformation } = useContext(AuthContext);

	// Logout button handler function
	async function logoutButtonHandler() {
		await fetch('http://localhost:3000/api/auth', {
			method: 'DELETE',
		});
		router.push('/login');
		router.refresh();
	}

	useEffect(() => {
		// If token is present, update the auth context
		if (jwtToken)
			setAuthInformation({
				isAuthenticated: true,
				id: jwtToken.id,
				email: jwtToken.email,
				username: jwtToken.username,
			});
	}, [jwtToken, setAuthInformation]);

	return (
		<Navigation>
			<NavbarBrand>
				<div className='w-8 h-8 bg-red-400 rounded-md me-2'></div>
				<p className='font-bold text-inherit'>VideoTube</p>
			</NavbarBrand>

			<NavbarContent
				justify='end'
				className='flex gap-4'>
				{jwtToken ? (
					<>
						{/* All videos link button */}
						<Link href='/all-videos'>
							<Button className='bg-transparent'>All Videos</Button>
						</Link>

						{/* Avatar with dropdown menu */}
						<Dropdown placement='bottom-end'>
							{/* Avatar */}
							<DropdownTrigger>
								<Avatar
									isBordered
									as='button'
									className='transition-transform'
									size='sm'
									src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
								/>
							</DropdownTrigger>

							{/* Dropdown menu */}
							<DropdownMenu
								aria-label='Profile Actions'
								variant='flat'>
								{/* User profile */}
								<DropdownItem
									key='profile'
									className='h-14 gap-2'>
									<p className='font-semibold'>
										{`Welcome, ${authInformation.username}!`}
									</p>
									<p className=' text-green-500'>zoey@example.com</p>
								</DropdownItem>

								{/* Logout button */}
								<DropdownItem
									key='logout'
									onClick={logoutButtonHandler}>
									Log Out
								</DropdownItem>

								{/* My videos page button */}
								<DropdownItem
									key='myVideos'
									href='/my-videos'>
									My Videos
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</>
				) : (
					<>
						{/* Sign-up page button */}
						<NavbarItem>
							<Button
								className='bg-transparent'
								as={Link}
								href='/sign-up'
								variant='flat'>
								Sign Up
							</Button>
						</NavbarItem>

						{/* Login page button */}
						<NavbarItem>
							<Button
								className='bg-transparent'
								as={Link}
								href='/login'
								variant='flat'>
								Login
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navigation>
	);
}
