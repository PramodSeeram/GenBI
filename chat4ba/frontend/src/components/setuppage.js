import React from 'react';

const SetupPage = ({ onSelectDataSource }) => {
    return (
        <div>
            <h2>Setup your project</h2>

            <h3>Start with a sample dataset</h3>
            <div className="option">
                <button onClick={() => onSelectDataSource("sampleDataset")}>E-commerce</button>
            </div>

            <h3>Start with a data boilerplate</h3>
            <div className="option">
                <button onClick={() => onSelectDataSource("dataBoilerplate")}>HubSpot</button>
                <button onClick={() => onSelectDataSource("dataBoilerplate")}>Google Analytics 4</button>
                <button onClick={() => onSelectDataSource("dataBoilerplate")}>Facebook Marketing</button>
            </div>

            <h3>Connect an external data source</h3>
            <div className="option">
                <button onClick={() => onSelectDataSource("mysql")}>MySQL</button>
                <button onClick={() => onSelectDataSource("postgresql")}>PostgreSQL</button>
                <button onClick={() => onSelectDataSource("sqlServer")}>SQL Server</button>
                <button onClick={() => onSelectDataSource("bigQuery")}>BigQuery</button>
            </div>
        </div>
    );
};

export default SetupPage;
