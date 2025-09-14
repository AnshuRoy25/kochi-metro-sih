// src/api/explanationApi.js

const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend URL

export const fetchTrainExplanation = async (trainId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/explanation/${trainId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data,
            message: 'Train explanation fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching train explanation:', error);
        return {
            success: false,
            data: null,
            message: error.message || 'Failed to fetch train explanation'
        };
    }
};

// Additional explanation-related API functions can be added here

export const fetchBulkExplanations = async (trainIds) => {
    try {
        // If you implement a bulk explanation endpoint in the future
        const promises = trainIds.map(trainId => fetchTrainExplanation(trainId));
        const results = await Promise.all(promises);
        
        return {
            success: true,
            data: results.filter(result => result.success).map(result => result.data),
            message: 'Bulk explanations fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching bulk explanations:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to fetch bulk explanations'
        };
    }
};

export const fetchExplanationSummary = async () => {
    try {
        // Future endpoint for explanation summary/statistics
        const response = await fetch(`${API_BASE_URL}/explanation/summary`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data,
            message: 'Explanation summary fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching explanation summary:', error);
        return {
            success: false,
            data: null,
            message: error.message || 'Failed to fetch explanation summary'
        };
    }
};