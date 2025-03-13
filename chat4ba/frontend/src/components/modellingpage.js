import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModelingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTables = [] } = location.state || {}; // Get selected tables passed from previous page

    // State for managing relationships
    const [relationships, setRelationships] = useState([]);
    const [newRelationship, setNewRelationship] = useState({
        tableFrom: '',
        columnFrom: '',
        tableTo: '',
        columnTo: '',
    });

    // Function to handle the form inputs for the relationship
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRelationship({ ...newRelationship, [name]: value });
    };

    // Function to handle adding the relationship
    const addRelationship = () => {
        if (
            newRelationship.tableFrom &&
            newRelationship.columnFrom &&
            newRelationship.tableTo &&
            newRelationship.columnTo
        ) {
            setRelationships([...relationships, newRelationship]);
            setNewRelationship({
                tableFrom: '',
                columnFrom: '',
                tableTo: '',
                columnTo: '',
            }); 
        } else {
            alert('Please fill out all fields.');
        }
    };

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <h2>Define Relationships</h2>
            <h3>Selected Tables:</h3>
            <ul>
                {selectedTables.map((table, index) => (
                    <li key={index}>{table}</li>
                ))}
            </ul>

            <h3>Add Relationship</h3>
            <div>
                <label>
                    From Table:
                    <select
                        name="tableFrom"
                        value={newRelationship.tableFrom}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Table</option>
                        {selectedTables.map((table, index) => (
                            <option key={index} value={table}>
                                {table}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    From Column:
                    <input
                        type="text"
                        name="columnFrom"
                        value={newRelationship.columnFrom}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    To Table:
                    <select
                        name="tableTo"
                        value={newRelationship.tableTo}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Table</option>
                        {selectedTables.map((table, index) => (
                            <option key={index} value={table}>
                                {table}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    To Column:
                    <input
                        type="text"
                        name="columnTo"
                        value={newRelationship.columnTo}
                        onChange={handleInputChange}
                    />
                </label>
                <button onClick={addRelationship}>Add Relationship</button>
            </div>

            <h3>Defined Relationships:</h3>
            <ul>
                {relationships.map((relationship, index) => (
                    <li key={index}>
                        {relationship.tableFrom}.{relationship.columnFrom} &rarr;{' '}
                        {relationship.tableTo}.{relationship.columnTo}
                    </li>
                ))}
            </ul>

            <button onClick={goToHome}>Home</button>
        </div>
    );
};

export default ModelingPage;
