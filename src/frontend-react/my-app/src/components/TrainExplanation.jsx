// src/components/TrainExplanation.jsx
import React, { useState, useEffect } from 'react';
import './TrainExplanation.css';
import { fetchTrainExplanation } from '../api/explanationApi';

const TrainExplanation = ({ trainId, isVisible, onClose }) => {
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isVisible && trainId) {
            loadExplanation();
        }
    }, [isVisible, trainId]);

    const loadExplanation = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetchTrainExplanation(trainId);
            
            if (response.success) {
                setExplanation(response.data);
            } else {
                setError(response.message || 'Failed to load explanation');
            }
        } catch (err) {
            setError('An error occurred while loading the explanation');
            console.error('Error loading explanation:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <tr className={`explanation-row ${isVisible ? 'visible' : ''}`}>
            <td colSpan="6" className="explanation-cell">
                <div className="explanation-container">
                    <div className="explanation-header">
                        <div className="explanation-title">
                            <h3>Performance Analysis</h3>
                            <span className="train-id-badge">{trainId}</span>
                        </div>
                        <button className="close-explanation-btn" onClick={onClose}>
                            <span>×</span>
                        </button>
                    </div>

                    <div className="explanation-content">
                        {loading ? (
                            <div className="explanation-loading">
                                <div className="loading-spinner-explanation"></div>
                                <p>Analyzing train performance...</p>
                            </div>
                        ) : error ? (
                            <div className="explanation-error">
                                <strong>Error:</strong> {error}
                            </div>
                        ) : explanation ? (
                            <>
                                {/* Summary Section */}
                                <div className="explanation-summary">
                                    <h4>Overall Assessment</h4>
                                    <p>{explanation.summary}</p>
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="explanation-breakdown">
                                    <h4>Performance Breakdown</h4>
                                    
                                    <div className="breakdown-grid">
                                        {/* Fitness Status */}
                                        {explanation.breakdown?.fitness && (
                                            <div className="breakdown-card">
                                                <div className="card-header">
                                                    <h5>Fitness Status</h5>
                                                </div>
                                                <div className="card-content">
                                                    <div className="status-indicator">
                                                        <span className="status-dot"></span>
                                                        <span className="status-text">{explanation.breakdown.fitness.status}</span>
                                                    </div>
                                                    <p className="card-reason">{explanation.breakdown.fitness.reason}</p>
                                                    {explanation.breakdown.fitness.expires_in && (
                                                        <div className="card-detail">
                                                            <span className="detail-label">Expires in:</span>
                                                            <span className="detail-value">{explanation.breakdown.fitness.expires_in}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Maintenance Status */}
                                        {explanation.breakdown?.maintenance && (
                                            <div className="breakdown-card">
                                                <div className="card-header">
                                                    <h5>Maintenance Status</h5>
                                                </div>
                                                <div className="card-content">
                                                    <div className="status-indicator">
                                                        <span className="status-dot"></span>
                                                        <span className="status-text">{explanation.breakdown.maintenance.job_card_status}</span>
                                                    </div>
                                                    <p className="card-reason">{explanation.breakdown.maintenance.reason}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Branding Priority */}
                                        {explanation.breakdown?.branding && (
                                            <div className="breakdown-card">
                                                <div className="card-header">
                                                    <h5>Business Priority</h5>
                                                </div>
                                                <div className="card-content">
                                                    <div className="status-indicator">
                                                        <span className="status-dot"></span>
                                                        <span className="status-text">{explanation.breakdown.branding.priority} Priority</span>
                                                    </div>
                                                    <p className="card-reason">{explanation.breakdown.branding.reason}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Recommendation */}
                                <div className="explanation-insights">
                                    <h4>Recommendation</h4>
                                    <div className="insights-content">
                                        <p>Based on current data analysis, this train shows excellent operational readiness with optimal fitness certificates and completed maintenance schedules.</p>
                                        <div className="recommendation-tags">
                                            <span className="rec-tag rec-positive">Service Ready</span>
                                            <span className="rec-tag rec-positive">High Reliability</span>
                                            <span className="rec-tag rec-neutral">Monitor Mileage</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="explanation-empty">
                                <p>No explanation data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default TrainExplanation;