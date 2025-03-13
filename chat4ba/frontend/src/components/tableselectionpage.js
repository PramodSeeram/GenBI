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
        // Navigate to the modeling page with selected tables
        navigate('/modeling', { state: { selectedTables } });
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
        </div>
    );
};

export default TableSelectionPage;
