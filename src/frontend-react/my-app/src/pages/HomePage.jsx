// src/pages/HomePage.jsx
import React from 'react';
import './HomePage.css';  // Add this line
import TrainList from '../components/TrainList';
import RankedTrainList from '../components/RankedTrainList';

const HomePage = () => {
    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <h1>Your Train Fleet<br /></h1>
                    <p><em>Experience the relief of having everything you need in one powerful platform</em></p>
                </div>
            </header>

            {/* Main Container */}
            <div className="container">
                {/* Train List Component */}
                <TrainList />

                {/* Ranked Train List Component */}
                <RankedTrainList />
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 <strong>Train Management System</strong>. <em>All rights reserved</em>.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;