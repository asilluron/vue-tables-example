<template>
  <div class="davis-page">
    <div class="page-header">
      <h1>DAVIS Code Management</h1>
      <p class="page-description">
        Manage and view your DAVIS code access requests and permissions.
      </p>
    </div>

    <div class="page-content">
      <!-- Tabs -->
      <div class="tabs-container">
        <div class="tab-item" :class="{ active: activeTab === 'existing' }" @click="activeTab = 'existing'">
          Search Existing Codes
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'available' }" @click="activeTab = 'available'">
          Search Available Codes
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'drafts' }" @click="activeTab = 'drafts'">
          My Drafts
        </div>
      </div>

      <!-- Search Section -->
      <div class="search-section">
        <h3 class="search-title">Search Code</h3>

        <div class="search-row">
          <input
            v-model="searchCode"
            type="text"
            placeholder="REMIS Code"
            class="search-input"
          />
          <button class="search-btn" @click="performSearch">Search</button>
        </div>

        <FilterDropdown @add-filter="openAddFilterModal" />
      </div>

      <DavisTable />
    </div>

    <!-- Add Filter Modal -->
    <AddFilterModal
      v-if="showAddFilterModal"
      :initial-filter-type="selectedFilterType"
      @close="closeAddFilterModal"
      @add-filter="addFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DavisTable from '@/components/DavisTable.vue'
import FilterDropdown from '@/components/FilterDropdown.vue'
import AddFilterModal from '@/components/AddFilterModal.vue'

// Reactive data
const activeTab = ref('existing')
const searchCode = ref('')
const showAddFilterModal = ref(false)
const selectedFilterType = ref('')

// Methods
const performSearch = () => {
  console.log('Searching for:', searchCode.value, 'in tab:', activeTab.value)
  // TODO: Implement search functionality
}

const openAddFilterModal = (filterType: string) => {
  console.log('Opening add filter modal for:', filterType)
  selectedFilterType.value = filterType
  showAddFilterModal.value = true
}

const closeAddFilterModal = () => {
  showAddFilterModal.value = false
  selectedFilterType.value = ''
}

const addFilter = (filterData: { field: string; value: string }) => {
  console.log('Adding filter:', filterData)
  // TODO: Implement filter logic
  closeAddFilterModal()
}
</script>

<style scoped>
.davis-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.page-content {
  background: #f5f5f5;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Tabs styling to match screenshot */
.tabs-container {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
}

.tab-item {
  padding: 12px 0;
  margin-right: 40px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-item.active {
  color: #333;
  border-bottom-color: #333;
  font-weight: 500;
}

/* Search section styling */
.search-section {
  background: transparent;
}

.search-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
}

.search-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
}

.search-input {
  width: 350px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  outline: none;
}

.search-input:focus {
  border-color: #999;
}

.search-btn {
  height: 40px;
  padding: 0 20px;
  background: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
}

.search-btn:hover {
  background: #d5d5d5;
}
</style>
