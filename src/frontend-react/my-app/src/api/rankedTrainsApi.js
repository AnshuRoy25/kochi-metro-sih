// src/api/rankedTrainsApi.js

const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend URL

export const fetchRankedTrains = async (topK = 'all') => {
    try {
        // Prepare query parameters
        const params = new URLSearchParams();
        if (topK !== 'all') {
            params.append('limit', topK);
        }
        
        const url = `${API_BASE_URL}/rank${params.toString() ? `?${params.toString()}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Transform the backend response to match frontend expectations
        const transformedData = data.map((train, index) => ({
            rank: index + 1,
            train_id: train.train_id,
            train_name: train.train_name || `Train ${train.train_id}`, // Fallback if name not provided
            score: train.score,
            status: train.status || 'Ready', // Default status
            priority_level: train.priority_level || 'Medium' // Default priority
        }));

        return {
            success: true,
            data: transformedData,
            total: transformedData.length,
            timestamp: new Date().toISOString(),
            message: 'Ranked trains fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching ranked trains:', error);
        return {
            success: false,
            data: [],
            total: 0,
            timestamp: new Date().toISOString(),
            message: error.message || 'Failed to fetch ranked trains'
        };
    }
};

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