import React from 'react';
import { useLocation } from 'react-router-dom';

const ModelingPage = () => {
    const location = useLocation();
    const { selectedTables = [] } = location.state || {};  // Get selected tables with default empty array

    return (
        <div>
            <h2>Define relationships</h2>
            <h3>Selected Tables:</h3>
            {selectedTables.length > 0 ? (
                <ul>
                    {selectedTables.map((table, index) => (
                        <li key={index}>{table}</li>
                    ))}
                </ul>
            ) : (
                <p>No tables selected. Please go back to the table selection page.</p>
            )}
            <h3>Define relationships</h3>
            <div>
                <button disabled={selectedTables.length === 0}>Add Relationship</button>
                {/* Add logic to define relationships */}
            </div>
        </div>
    );
};

export default ModelingPage;
