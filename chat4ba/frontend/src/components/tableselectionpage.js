import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableSelectionPage = ({ tables }) => {
    const [selectedTables, setSelectedTables] = useState([]);
    const navigate = useNavigate();

    const handleTableSelection = (tableName) => {
        if (selectedTables.includes(tableName)) {
            setSelectedTables(selectedTables.filter(table => table !== tableName));
        } else {
            setSelectedTables([...selectedTables, tableName]);
        }
    };

    const handleNext = () => {
        navigate('/modeling', { state: { selectedTables } });
    };

    const saveRelationships = async () => {
        const relationships = [
            {
                tableFrom: "orders",
                columnFrom: "customer_id",
                tableTo: "customers",
                columnTo: "customer_id",
            },
        ];

        try {
            const response = await fetch('http://127.0.0.1:8000/define-relationships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ relationships }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Relationships successfully saved!');
                navigate('/home');
            } else {
                alert('Error: ' + data.detail);
            }
        } catch (error) {
            alert('Error saving relationships');
        }
    };

    return (
        <div>
            <h2>Select tables to create data models</h2>
            <div>
                {tables.length > 0 ? (
                    tables.map((table, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={selectedTables.includes(table)}
                                onChange={() => handleTableSelection(table)}
                            />
                            <label>{table}</label>
                        </div>
                    ))
                ) : (
                    <p>Loading tables...</p>
                )}
            </div>
            <button onClick={handleNext} disabled={selectedTables.length === 0}>
                Next
            </button>

            <button onClick={saveRelationships} disabled={selectedTables.length === 0}>
                Save Relationships
            </button>
        </div>
    );
};

export default TableSelectionPage;
