import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './HomeComponent';

const MainComponent = () => {
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
            </Routes>
        </Router>
    );
}

export default MainComponent;