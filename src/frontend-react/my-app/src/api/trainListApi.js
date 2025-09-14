// src/api/trainListApi.js

const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend URL

export const fetchAllTrains = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/trains`, {
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
            message: 'Trains fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching trains:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to fetch trains'
        };
    }
};

export const fetchTrainById = async (trainId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/features/${trainId}`, {
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
            message: 'Train details fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching train details:', error);
        return {
            success: false,
            data: null,
            message: error.message || 'Failed to fetch train details'
        };
    }
};