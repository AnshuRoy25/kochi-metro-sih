// src/components/RankedTrainList.jsx
import React, { useState } from 'react';
import './RankedTrainList.css';  // Add this line
import { generateRankedData } from '../data/rankedTrainsData';

const RankedTrainList = () => {
    // State for ranked trains functionality
    const [rankedTrains, setRankedTrains] = useState([]);
    const [rankedCurrentPage, setRankedCurrentPage] = useState(1);
    const [rankedItemsPerPage, setRankedItemsPerPage] = useState(25);
    const [isRanking, setIsRanking] = useState(false);
    const [showRankedResults, setShowRankedResults] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [topK, setTopK] = useState('all');

    // Pagination logic for ranked trains
    const rankedTotalPages = Math.ceil(rankedTrains.length / rankedItemsPerPage);
    const rankedStartIndex = (rankedCurrentPage - 1) * rankedItemsPerPage;
    const rankedEndIndex = rankedStartIndex + rankedItemsPerPage;
    const currentPageRanked = rankedTrains.slice(rankedStartIndex, rankedEndIndex);

    // Ranking function
    const rankTrains = async () => {
        if (isRanking) return;

        setIsRanking(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await generateRankedData(topK);
            
            if (response.success) {
                setRankedTrains(response.data);
                setRankedCurrentPage(1);
                setShowRankedResults(true);
                setSuccessMessage(`Successfully ranked ${response.total} trains!`);
                
                // Auto-remove success message after 5 seconds
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                setErrorMessage('Failed to rank trains. Please try again.');
                setTimeout(() => setErrorMessage(''), 5000);
            }
        } catch (error) {
            console.error('Error ranking trains:', error);
            setErrorMessage('An error occurred while ranking trains.');
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setIsRanking(false);
        }
    };

    // Ranked pagination handlers
    const goToRankedPreviousPage = () => {
        if (rankedCurrentPage > 1) {
            setRankedCurrentPage(rankedCurrentPage - 1);
        }
    };

    const goToRankedNextPage = () => {
        if (rankedCurrentPage < rankedTotalPages) {
            setRankedCurrentPage(rankedCurrentPage + 1);
        }
    };

    const handleRankedItemsPerPageChange = (e) => {
        setRankedItemsPerPage(parseInt(e.target.value));
        setRankedCurrentPage(1);
    };

    const handleTopKChange = (e) => {
        setTopK(e.target.value);
    };

    // Badge helper functions
    const getRankBadge = (rank) => {
        let rankClass = '';
        if (rank <= 3) {
            rankClass = `rank-${rank}`;
        }
        return <span className={`rank-badge ${rankClass}`}>{rank}</span>;
    };

    const getScoreBadge = (score) => {
        return <span className="score-badge">{score}</span>;
    };

    const getStatusBadge = (status) => {
        return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
    };

    const getPriorityBadge = (priority) => {
        return <span className={`priority-badge priority-${priority.toLowerCase()}`}>{priority}</span>;
    };

    return (
        <section className="ranked-trains-section">
            {/* Dark background section for controls */}
            <div className="ranked-trains-controls">
                <h2>AI-Ranked Trains</h2>
                <p>Get intelligently ranked train recommendations based on performance metrics and operational efficiency</p>
                
                <div className="ranking-controls">
                    <select 
                        className="filter-select ranking-select"
                        value={topK}
                        onChange={handleTopKChange}
                    >
                        <option value="all">All Trains</option>
                        <option value="5">Top 5</option>
                        <option value="10">Top 10</option>
                        <option value="15">Top 15</option>
                        <option value="20">Top 20</option>
                    </select>
                    
                    <button 
                        className="rank-btn" 
                        onClick={rankTrains}
                        disabled={isRanking}
                    >
                        <span className="btn-text" style={{display: isRanking ? 'none' : 'inline-flex'}}>
                            <strong>Rank Trains</strong>
                        </span>
                        <span className="loading-spinner" style={{display: isRanking ? 'inline-flex' : 'none'}}>
                            <strong>Ranking...</strong>
                        </span>
                    </button>
                </div>
            </div>

            {/* Results container */}
            <div className="ranked-results-container">
                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                {/* Results Table */}
                {showRankedResults ? (
                    <div className="ranked-container">
                        <div className="results-info">
                            <span>
                                {rankedTrains.length === 0 
                                    ? 'No ranked trains found' 
                                    : `Showing ${rankedStartIndex + 1}-${Math.min(rankedEndIndex, rankedTrains.length)} of ${rankedTrains.length} ranked trains`
                                }
                            </span>
                        </div>

                        <div className="table-container">
                            <table className="trains-table">
                                <thead>
                                    <tr>
                                        <th><strong>Rank</strong></th>
                                        <th><strong>Train ID</strong></th>
                                        <th><em>Train Name</em></th>
                                        <th><strong>Score</strong></th>
                                        <th><strong>Status</strong></th>
                                        <th><em>Priority Level</em></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageRanked.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                                                No ranked trains available
                                            </td>
                                        </tr>
                                    ) : (
                                        currentPageRanked.map(train => (
                                            <tr key={train.train_id}>
                                                <td>{getRankBadge(train.rank)}</td>
                                                <td><strong>{train.train_id}</strong></td>
                                                <td>{train.train_name}</td>
                                                <td>{getScoreBadge(train.score)}</td>
                                                <td>{getStatusBadge(train.status)}</td>
                                                <td>{getPriorityBadge(train.priority_level)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="pagination-container">
                            <button 
                                className="pagination-btn" 
                                onClick={goToRankedPreviousPage}
                                disabled={rankedCurrentPage === 1}
                            >
                                <strong>← Previous</strong>
                            </button>
                            
                            <span className="page-info">
                                {rankedTotalPages === 0 ? 'Page 0 of 0' : `Page ${rankedCurrentPage} of ${rankedTotalPages}`}
                            </span>
                            
                            <button 
                                className="pagination-btn" 
                                onClick={goToRankedNextPage}
                                disabled={rankedCurrentPage === rankedTotalPages || rankedTotalPages === 0}
                            >
                                <strong>Next →</strong>
                            </button>
                            
                            <select 
                                className="items-per-page" 
                                value={rankedItemsPerPage} 
                                onChange={handleRankedItemsPerPageChange}
                            >
                                <option value="10">10 per page</option>
                                <option value="25">25 per page</option>
                                <option value="50">50 per page</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    /* Placeholder */
                    <div className="ranking-placeholder">
                        <div className="placeholder-content">
                            <div className="placeholder-icon"></div>
                            <h3>AI Train Ranking</h3>
                            <p>Click "Rank Trains" to see your trains ranked by our ML model based on performance metrics, availability, and operational efficiency.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RankedTrainList;