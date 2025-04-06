import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users");
                setUsers(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    if (loading) return <div>Loading.....</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
            <h1>UserList</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    );

}

export default UserList;