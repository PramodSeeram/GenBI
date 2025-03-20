import React, { useState } from 'react';

const HomePage = () => {
    const [userQuery, setUserQuery] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQueryChange = (event) => {
        setUserQuery(event.target.value);
    };

    const handleQuerySubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/ask-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userQuery, selected_tables: [], relationships: [] }),
            });
            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error('Error submitting query:', error);
        }
    };

    return (
        <div>
            <h2>Ask a query about the database</h2>
            <input
                type="text"
                value={userQuery}
                onChange={handleQueryChange}
                placeholder="e.g. Give the customer id"
            />
            <button onClick={handleQuerySubmit}>Submit Query</button>
            <h3>Answer:</h3>
            <p>{answer}</p>
        </div>
    );
};

export default HomePage;
