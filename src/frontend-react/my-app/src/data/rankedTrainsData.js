// src/data/rankedTrainsData.js
export const rankedTrainsData = [
    {
        rank: 1,
        train_id: "TR029",
        train_name: "Express Star",
        score: 98,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 2,
        train_id: "TR001",
        train_name: "Express Lightning",
        score: 96,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 3,
        train_id: "TR007",
        train_name: "Metro Express",
        score: 94,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 4,
        train_id: "TR021",
        train_name: "Metro Lightning",
        score: 93,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 5,
        train_id: "TR017",
        train_name: "Regional Express",
        score: 91,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 6,
        train_id: "TR027",
        train_name: "Metro Runner",
        score: 89,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 7,
        train_id: "TR004",
        train_name: "City Express",
        score: 87,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 8,
        train_id: "TR009",
        train_name: "Speed Demon",
        score: 86,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 9,
        train_id: "TR015",
        train_name: "Metro Star",
        score: 84,
        status: "Ready",
        priority_level: "High"
    },
    {
        rank: 10,
        train_id: "TR030",
        train_name: "Heavy Star",
        score: 82,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 11,
        train_id: "TR026",
        train_name: "Cargo Star",
        score: 80,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 12,
        train_id: "TR006",
        train_name: "Cargo Chief",
        score: 78,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 13,
        train_id: "TR014",
        train_name: "Freight Express",
        score: 76,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 14,
        train_id: "TR018",
        train_name: "Cargo Express",
        score: 74,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 15,
        train_id: "TR011",
        train_name: "Regional Star",
        score: 72,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 16,
        train_id: "TR023",
        train_name: "Regional Lightning",
        score: 70,
        status: "Ready",
        priority_level: "Medium"
    },
    {
        rank: 17,
        train_id: "TR024",
        train_name: "Local Runner",
        score: 68,
        status: "Ready",
        priority_level: "Low"
    },
    {
        rank: 18,
        train_id: "TR012",
        train_name: "City Loop",
        score: 66,
        status: "Ready",
        priority_level: "Low"
    },
    {
        rank: 19,
        train_id: "TR002",
        train_name: "Freight Master",
        score: 64,
        status: "Standby",
        priority_level: "Medium"
    },
    {
        rank: 20,
        train_id: "TR010",
        train_name: "Heavy Hauler",
        score: 62,
        status: "Standby",
        priority_level: "Medium"
    },
    {
        rank: 21,
        train_id: "TR020",
        train_name: "Regional Shuttle",
        score: 60,
        status: "Standby",
        priority_level: "Low"
    },
    {
        rank: 22,
        train_id: "TR028",
        train_name: "Shuttle Express",
        score: 58,
        status: "Standby",
        priority_level: "Low"
    },
    {
        rank: 23,
        train_id: "TR003",
        train_name: "Regional Runner",
        score: 55,
        status: "Maintenance",
        priority_level: "High"
    },
    {
        rank: 24,
        train_id: "TR013",
        train_name: "Super Express",
        score: 52,
        status: "Maintenance",
        priority_level: "High"
    },
    {
        rank: 25,
        train_id: "TR025",
        train_name: "Express Runner",
        score: 50,
        status: "Maintenance",
        priority_level: "High"
    },
    {
        rank: 26,
        train_id: "TR019",
        train_name: "City Runner",
        score: 48,
        status: "Maintenance",
        priority_level: "Medium"
    },
    {
        rank: 27,
        train_id: "TR008",
        train_name: "Local Transit",
        score: 45,
        status: "Maintenance",
        priority_level: "Low"
    },
    {
        rank: 28,
        train_id: "TR022",
        train_name: "Heavy Express",
        score: 42,
        status: "Unavailable",
        priority_level: "Medium"
    },
    {
        rank: 29,
        train_id: "TR016",
        train_name: "Local Express",
        score: 38,
        status: "Unavailable",
        priority_level: "Low"
    },
    {
        rank: 30,
        train_id: "TR005",
        train_name: "Local Shuttle",
        score: 35,
        status: "Unavailable",
        priority_level: "Low"
    }
];

// Function to simulate API call delay and generate ranked data
export const generateRankedData = (topK = 'all') => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            let filteredData = [...rankedTrainsData];
            
            if (topK !== 'all') {
                filteredData = filteredData.slice(0, parseInt(topK));
            }
            
            resolve({
                success: true,
                data: filteredData,
                total: filteredData.length,
                timestamp: new Date().toISOString()
            });
        }, 2000); // 2 second delay to simulate API call
    });
};