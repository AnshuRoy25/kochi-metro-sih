// src/api/rankedTrainsApi.js

const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend URL

export const fetchRankedTrains = async (topK = 'all') => {
    try {
        // Prepare query parameters
        let url = `${API_BASE_URL}/rank`;
        
        // Only add limit parameter if topK is not 'all'
        if (topK !== 'all') {
            const limitValue = parseInt(topK);
            if (!isNaN(limitValue) && limitValue > 0) {
                url += `?limit=${limitValue}`;
            }
        }
        
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
            train_name: train.train_name, // This should now come from backend
            score: train.score,
            status: train.status, // This should now come from backend
            priority_level: train.priority_level, // This should now come from backend
            depot: train.depot,
            mileage: train.mileage,
            last_maintenance_time: train.last_maintenance_time
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