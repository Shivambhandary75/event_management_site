import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const [role, setRole] = useState(null);
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		} else {
			// Manually decode the token to get the role
			try {
				const decoded = decodeJwt(token);
				setRole(decoded.role); // Set role from the decoded token
			} catch (error) {
				console.error("Error decoding token:", error);
				navigate("/login");
			}
		}
	}, [token, navigate]);

	const decodeJwt = (token) => {
		const [header, payload, signature] = token.split('.');

		// Base64 decode the payload
		const decodedPayload = atob(payload);

		// Parse the decoded payload as a JSON object
		return JSON.parse(decodedPayload);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		window.location.href = "/login";
	};

	if (!role) {
		return <div>Loading...</div>;
	}

	if (role === 'admin') {
		return (
			<div>
				<h1>Admin Dashboard</h1>
				<button onClick={logout}>Logout</button>
			</div>
		);
	} else if (role === 'organizer') {
		return (
			<div>
				<h1>Organizer Dashboard</h1>
				<button onClick={logout}>Logout</button>
			</div>
		);
	} else {
		return (
			<div>
				<h1>User Dashboard</h1>
				<button onClick={logout}>Logout</button>
			</div>
		);
	}
}

export default Dashboard;
