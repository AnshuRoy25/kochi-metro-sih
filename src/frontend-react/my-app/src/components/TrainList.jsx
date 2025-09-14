// src/components/TrainList.jsx
import React, { useState, useEffect, useRef } from 'react';
import './TrainList.css';
import { fetchAllTrains } from '../api/trainListApi';

const TrainList = () => {
    // Add ref for scrolling
    const trainListRef = useRef(null);
    
    // State for filtering and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [depotFilter, setDepotFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    
    // State for API data
    const [allTrains, setAllTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch trains data when component mounts
    useEffect(() => {
        const loadTrains = async () => {
            setLoading(true);
            setError('');
            
            const response = await fetchAllTrains();
            
            if (response.success) {
                setAllTrains(response.data);
            } else {
                setError(response.message);
                setAllTrains([]);
            }
            
            setLoading(false);
        };

        loadTrains();
    }, []);

    // Scroll to top of train list section
    const scrollToTrainList = () => {
        if (trainListRef.current) {
            trainListRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Filter trains based on current filters
    const getFilteredTrains = () => {
        let filtered = [...allTrains];

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(train => 
                train.train_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                train.train_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                train.depot.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (depotFilter !== '') {
            filtered = filtered.filter(train => train.depot === depotFilter);
        }

        if (statusFilter !== '') {
            filtered = filtered.filter(train => train.status === statusFilter);
        }

        if (priorityFilter !== '') {
            filtered = filtered.filter(train => train.priority_level === priorityFilter);
        }

        return filtered;
    };

    const filteredTrains = getFilteredTrains();

    // Pagination logic
    const totalPages = Math.ceil(filteredTrains.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageTrains = filteredTrains.slice(startIndex, endIndex);

    // Filter handlers
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleDepotChange = (e) => {
        setDepotFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePriorityChange = (e) => {
        setPriorityFilter(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDepotFilter('');
        setStatusFilter('');
        setPriorityFilter('');
        setCurrentPage(1);
    };

    // Updated pagination handlers with scroll functionality
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Scroll to top of train list after state update
            setTimeout(() => scrollToTrainList(), 100);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            // Scroll to top of train list after state update
            setTimeout(() => scrollToTrainList(), 100);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
        // Scroll to top of train list after state update
        setTimeout(() => scrollToTrainList(), 100);
    };

    // Badge helper functions
    const getStatusBadge = (status) => {
        return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
    };

    const getPriorityBadge = (priority) => {
        return <span className={`priority-badge priority-${priority.toLowerCase()}`}>{priority}</span>;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Loading state
    if (loading) {
        return (
            <section className="train-list-section" ref={trainListRef}>
                <div className="section-header">
                    <h2><strong>Train List</strong></h2>
                    <div className="results-info">
                        <span>Loading trains...</span>
                    </div>
                </div>
                <div className="table-container">
                    <div style={{padding: '60px', textAlign: 'center', color: '#666'}}>
                        <div style={{fontSize: '1.2rem', marginBottom: '10px'}}>Loading trains data...</div>
                        <div style={{fontSize: '0.9rem', fontStyle: 'italic'}}>Please wait while we fetch the latest information</div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="train-list-section" ref={trainListRef}>
                <div className="section-header">
                    <h2><strong>Train List</strong></h2>
                    <div className="results-info">
                        <span>Error loading trains</span>
                    </div>
                </div>
                <div className="error-message">
                    Failed to load trains: {error}
                </div>
            </section>
        );
    }

    return (
        <section className="train-list-section" ref={trainListRef}>
            {/* Filters Section */}
            <div className="filters-section">
                <div className="filter-bar">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search trains by ID, name, or depot..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter-controls">
                        <select 
                            className="filter-select" 
                            value={depotFilter} 
                            onChange={handleDepotChange}
                        >
                            <option value="">All Depots</option>
                            <option value="Central Depot">Central Depot</option>
                            <option value="North Depot">North Depot</option>
                            <option value="South Depot">South Depot</option>
                            <option value="East Depot">East Depot</option>
                            <option value="West Depot">West Depot</option>
                        </select>
                        
                        <select 
                            className="filter-select" 
                            value={statusFilter} 
                            onChange={handleStatusChange}
                        >
                            <option value="">All Status</option>
                            <option value="Ready">Ready</option>
                            <option value="Standby">Standby</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        
                        <select 
                            className="filter-select" 
                            value={priorityFilter} 
                            onChange={handlePriorityChange}
                        >
                            <option value="">All Priorities</option>
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>
                        
                        <button className="clear-btn" onClick={clearFilters}>
                            <strong>Clear All Filters</strong>
                        </button>
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <div className="section-header">
                <h2><strong>Train List</strong></h2>
                <div className="results-info">
                    <span>
                        {filteredTrains.length === 0 
                            ? 'No trains found' 
                            : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredTrains.length)} of ${filteredTrains.length} trains`
                        }
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="trains-table">
                    <thead>
                        <tr>
                            <th><strong>Train ID</strong></th>
                            <th><em>Train Name</em></th>
                            <th>Department/Depot</th>
                            <th><strong>Status</strong></th>
                            <th><em>Priority Level</em></th>
                            <th>Last Maintenance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageTrains.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                                    No trains found matching your criteria
                                </td>
                            </tr>
                        ) : (
                            currentPageTrains.map(train => (
                                <tr key={train.train_id}>
                                    <td><strong>{train.train_id}</strong></td>
                                    <td>{train.train_name}</td>
                                    <td>{train.depot}</td>
                                    <td>{getStatusBadge(train.status)}</td>
                                    <td>{getPriorityBadge(train.priority_level)}</td>
                                    <td>{formatDate(train.last_maintenance_time)}</td>
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
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    <strong>← Previous</strong>
                </button>
                
                <span className="page-info">
                    {totalPages === 0 ? 'Page 0 of 0' : `Page ${currentPage} of ${totalPages}`}
                </span>
                
                <button 
                    className="pagination-btn" 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    <strong>Next →</strong>
                </button>
                
                <select 
                    className="items-per-page" 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                </select>
            </div>
        </section>
    );
};

export default TrainList;