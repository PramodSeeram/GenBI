import React, { useState } from 'react';

const MySQLConnectionPage = ({ onConnect }) => {
    const [host, setHost] = useState('');
    const [port, setPort] = useState('3306');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [database, setDatabase] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/connect-db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    host, 
                    port, 
                    user: username,  
                    password, 
                    db: database 
                })
            });
            const data = await response.json();
            if (response.ok) {
                onConnect(data);  
            } else {
                alert(data.detail || 'Connection failed');
            }
        } catch (error) {
            console.error('Connection error:', error);
            alert('An error occurred while connecting to the database.');
        }
    };

    return (
        <div>
            <h2>Connect the data source</h2>
            <h3>MySQL</h3>
            <form onSubmit={handleSubmit}>
                <label>Host</label>
                <input type="text" value={host} onChange={(e) => setHost(e.target.value)} required />

                <label>Port</label>
                <input type="text" value={port} onChange={(e) => setPort(e.target.value)} required />

                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Database name</label>
                <input type="text" value={database} onChange={(e) => setDatabase(e.target.value)} required />

                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default MySQLConnectionPage;
