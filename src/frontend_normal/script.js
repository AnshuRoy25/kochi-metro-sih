class TrainManagementSystem {
    constructor() {
        // Regular trains properties
        this.currentPage = 1;
        this.itemsPerPage = 25;
        this.allTrains = [...trainsData];
        this.filteredTrains = [...trainsData];
        this.totalPages = Math.ceil(this.filteredTrains.length / this.itemsPerPage);
        
        // Ranked trains properties
        this.rankedCurrentPage = 1;
        this.rankedItemsPerPage = 25;
        this.rankedTrains = [];
        this.rankedTotalPages = 0;
        this.isRanking = false;
        
        this.initializeEventListeners();
        this.renderTrains();
        this.updatePagination();
    }

    initializeEventListeners() {
        // Existing event listeners for regular trains
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.applyAllFilters();
        });

        const filters = ['depotFilter', 'statusFilter', 'priorityFilter'];
        filters.forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', () => {
                this.applyAllFilters();
            });
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Regular pagination
        document.getElementById('prevPage').addEventListener('click', () => {
            this.goToPreviousPage();
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            this.goToNextPage();
        });

        document.getElementById('itemsPerPage').addEventListener('change', (e) => {
            this.changeItemsPerPage(parseInt(e.target.value));
        });

        // NEW: Ranked trains event listeners
        document.getElementById('rankTrainsBtn').addEventListener('click', () => {
            this.rankTrains();
        });

        // Ranked pagination
        document.getElementById('rankedPrevPage').addEventListener('click', () => {
            this.goToRankedPreviousPage();
        });

        document.getElementById('rankedNextPage').addEventListener('click', () => {
            this.goToRankedNextPage();
        });

        document.getElementById('rankedItemsPerPage').addEventListener('change', (e) => {
            this.changeRankedItemsPerPage(parseInt(e.target.value));
        });
    }

    // Existing methods for regular trains (unchanged)
    applyAllFilters() {
        let filtered = [...this.allTrains];

        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const depotFilter = document.getElementById('depotFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        if (searchTerm !== '') {
            filtered = filtered.filter(train => 
                train.train_id.toLowerCase().includes(searchTerm) ||
                train.train_name.toLowerCase().includes(searchTerm) ||
                train.depot.toLowerCase().includes(searchTerm)
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

        this.filteredTrains = filtered;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.filteredTrains.length / this.itemsPerPage);
        
        this.renderTrains();
        this.updatePagination();
        this.updateResultsCount();
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('depotFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('priorityFilter').value = '';

        this.filteredTrains = [...this.allTrains];
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.filteredTrains.length / this.itemsPerPage);

        this.renderTrains();
        this.updatePagination();
        this.updateResultsCount();
    }

    renderTrains() {
        const tbody = document.getElementById('trainsTableBody');
        tbody.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageTrains = this.filteredTrains.slice(startIndex, endIndex);

        if (currentPageTrains.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No trains found matching your criteria
                    </td>
                </tr>
            `;
            return;
        }

        currentPageTrains.forEach(train => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${train.train_id}</strong></td>
                <td>${train.train_name}</td>
                <td>${train.depot}</td>
                <td>${this.getStatusBadge(train.status)}</td>
                <td>${this.getPriorityBadge(train.priority_level)}</td>
                <td>${this.formatDate(train.last_maintenance_time)}</td>
            `;
            tbody.appendChild(row);
        });

        this.updateResultsCount();
    }

    getStatusBadge(status) {
        const statusClass = `status-${status.toLowerCase()}`;
        return `<span class="status-badge ${statusClass}">${status}</span>`;
    }

    getPriorityBadge(priority) {
        const priorityClass = `priority-${priority.toLowerCase()}`;
        return `<span class="priority-badge ${priorityClass}">${priority}</span>`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredTrains.length);
        
        if (this.filteredTrains.length === 0) {
            resultsCount.textContent = 'No trains found';
        } else {
            resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${this.filteredTrains.length} trains`;
        }
    }

    updatePagination() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageInfo = document.getElementById('pageInfo');

        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === this.totalPages || this.totalPages === 0;

        if (this.totalPages === 0) {
            pageInfo.textContent = 'Page 0 of 0';
        } else {
            pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        }
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTrains();
            this.updatePagination();
            this.scrollToTop();
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.renderTrains();
            this.updatePagination();
            this.scrollToTop();
        }
    }

    changeItemsPerPage(newItemsPerPage) {
        this.itemsPerPage = newItemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.filteredTrains.length / this.itemsPerPage);
        
        this.renderTrains();
        this.updatePagination();
    }

    scrollToTop() {
        document.querySelector('.train-list-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    // NEW: Ranked trains methods
    async rankTrains() {
        if (this.isRanking) return;

        this.isRanking = true;
        const topK = document.getElementById('topKSelect').value;
        const btnText = document.querySelector('.btn-text');
        const loadingSpinner = document.querySelector('.loading-spinner');
        const rankBtn = document.getElementById('rankTrainsBtn');

        // Show loading state
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-flex';
        rankBtn.disabled = true;

        try {
            // Call the API simulation function
            const response = await generateRankedData(topK);
            
            if (response.success) {
                this.rankedTrains = response.data;
                this.rankedCurrentPage = 1;
                this.rankedTotalPages = Math.ceil(this.rankedTrains.length / this.rankedItemsPerPage);
                
                this.showRankedResults();
                this.renderRankedTrains();
                this.updateRankedPagination();
                this.showSuccessMessage(`Successfully ranked ${response.total} trains!`);
                
                // Scroll to ranked section
                setTimeout(() => {
                    document.querySelector('.ranked-trains-section').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 500);
            } else {
                this.showErrorMessage('Failed to rank trains. Please try again.');
            }
        } catch (error) {
            console.error('Error ranking trains:', error);
            this.showErrorMessage('An error occurred while ranking trains.');
        } finally {
            // Reset button state
            this.isRanking = false;
            btnText.style.display = 'inline-flex';
            loadingSpinner.style.display = 'none';
            rankBtn.disabled = false;
        }
    }

    showRankedResults() {
        document.getElementById('rankedTrainsContainer').style.display = 'block';
        document.getElementById('rankingPlaceholder').style.display = 'none';
    }

    renderRankedTrains() {
        const tbody = document.getElementById('rankedTrainsTableBody');
        tbody.innerHTML = '';

        const startIndex = (this.rankedCurrentPage - 1) * this.rankedItemsPerPage;
        const endIndex = startIndex + this.rankedItemsPerPage;
        const currentPageRanked = this.rankedTrains.slice(startIndex, endIndex);

        if (currentPageRanked.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No ranked trains available
                    </td>
                </tr>
            `;
            return;
        }

        currentPageRanked.forEach(train => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.getRankBadge(train.rank)}</td>
                <td><strong>${train.train_id}</strong></td>
                <td>${train.train_name}</td>
                <td>${this.getScoreBadge(train.score)}</td>
                <td>${this.getStatusBadge(train.status)}</td>
                <td>${this.getPriorityBadge(train.priority_level)}</td>
            `;
            tbody.appendChild(row);
        });

        this.updateRankedResultsCount();
    }

    getRankBadge(rank) {
        let rankClass = '';
        if (rank <= 3) {
            rankClass = `rank-${rank}`;
        }
        return `<span class="rank-badge ${rankClass}">${rank}</span>`;
    }

    getScoreBadge(score) {
        return `<span class="score-badge">${score}</span>`;
    }

    updateRankedResultsCount() {
        const resultsCount = document.getElementById('rankedResultsCount');
        const startIndex = (this.rankedCurrentPage - 1) * this.rankedItemsPerPage + 1;
        const endIndex = Math.min(this.rankedCurrentPage * this.rankedItemsPerPage, this.rankedTrains.length);
        
        if (this.rankedTrains.length === 0) {
            resultsCount.textContent = 'No ranked trains found';
        } else {
            resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${this.rankedTrains.length} ranked trains`;
        }
    }

    updateRankedPagination() {
        const prevBtn = document.getElementById('rankedPrevPage');
        const nextBtn = document.getElementById('rankedNextPage');
        const pageInfo = document.getElementById('rankedPageInfo');

        prevBtn.disabled = this.rankedCurrentPage === 1;
        nextBtn.disabled = this.rankedCurrentPage === this.rankedTotalPages || this.rankedTotalPages === 0;

        if (this.rankedTotalPages === 0) {
            pageInfo.textContent = 'Page 0 of 0';
        } else {
            pageInfo.textContent = `Page ${this.rankedCurrentPage} of ${this.rankedTotalPages}`;
        }
    }

    goToRankedPreviousPage() {
        if (this.rankedCurrentPage > 1) {
            this.rankedCurrentPage--;
            this.renderRankedTrains();
            this.updateRankedPagination();
            this.scrollToRankedTop();
        }
    }

    goToRankedNextPage() {
        if (this.rankedCurrentPage < this.rankedTotalPages) {
            this.rankedCurrentPage++;
            this.renderRankedTrains();
            this.updateRankedPagination();
            this.scrollToRankedTop();
        }
    }

    changeRankedItemsPerPage(newItemsPerPage) {
        this.rankedItemsPerPage = newItemsPerPage;
        this.rankedCurrentPage = 1;
        this.rankedTotalPages = Math.ceil(this.rankedTrains.length / this.rankedItemsPerPage);
        
        this.renderRankedTrains();
        this.updateRankedPagination();
    }

    scrollToRankedTop() {
        document.querySelector('.ranked-trains-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    showSuccessMessage(message) {
        // Remove any existing messages
        this.removeMessages();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;

        const rankedContainer = document.getElementById('rankedTrainsContainer');
        rankedContainer.insertBefore(messageDiv, rankedContainer.firstChild);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            this.removeMessages();
        }, 5000);
    }

    showErrorMessage(message) {
        // Remove any existing messages
        this.removeMessages();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.textContent = message;

        const rankedSection = document.querySelector('.ranked-trains-section');
        const sectionHeader = rankedSection.querySelector('.section-header');
        rankedSection.insertBefore(messageDiv, sectionHeader.nextSibling);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            this.removeMessages();
        }, 5000);
    }

    removeMessages() {
        const successMessages = document.querySelectorAll('.success-message');
        const errorMessages = document.querySelectorAll('.error-message');
        
        successMessages.forEach(msg => msg.remove());
        errorMessages.forEach(msg => msg.remove());
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const trainSystem = new TrainManagementSystem();
    
    // Add some visual feedback for loading
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `Loaded ${trainsData.length} trains successfully`;
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press '/' to focus search
        if (e.key === '/' && !e.target.matches('input, select, textarea')) {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Press 'Escape' to clear search
        if (e.key === 'Escape' && e.target.matches('#searchInput')) {
            e.target.value = '';
            trainSystem.applyAllFilters();
        }
        
        // Press 'c' to clear all filters
        if (e.key === 'c' && !e.target.matches('input, select, textarea')) {
            trainSystem.clearFilters();
        }

        // Press 'r' to trigger ranking
        if (e.key === 'r' && !e.target.matches('input, select, textarea') && !trainSystem.isRanking) {
            trainSystem.rankTrains();
        }
    });
    
    console.log('Train Management System initialized with', trainsData.length, 'trains');
    console.log('Ranked data API simulation ready');
});