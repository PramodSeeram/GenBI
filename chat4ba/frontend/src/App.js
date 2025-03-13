import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import SetupPage from './components/setuppage';
import MySQLConnectionPage from './components/mysqlconnection';
import TableSelectionPage from './components/tableselectionpage';
import ModelingPage from './components/modellingpage';

const App = () => {
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();

    const handleConnect = (data) => {
        setTables(data.tables);  
        navigate('/select-tables');  
    };

    const handleSelectDataSource = (source) => {
        if (source === "mysql") {
            navigate('/mysql-connection');
        }
        
    };

    return (
      <Routes>
        <Route path="/" element={<SetupPage onSelectDataSource={handleSelectDataSource} />} />
        <Route path="/mysql-connection" element={<MySQLConnectionPage onConnect={handleConnect} />} />
        <Route path="/select-tables" element={<TableSelectionPage tables={tables} />} />
        <Route path="/modeling" element={<ModelingPage />} />
      </Routes>
    );
};
    
export default App;
