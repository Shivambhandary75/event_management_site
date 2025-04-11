import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signin", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            window.location.href = "/dashboard";
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;