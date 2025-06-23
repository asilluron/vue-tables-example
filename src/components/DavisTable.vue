<template>
  <div class="davis-table-container">
    <div class="table-header">
      <div class="selected-count">
        {{ selectedRows.length }} DAVIS Codes Selected
      </div>
      <div class="table-actions">
        <button class="btn btn-secondary">View</button>
        <button class="btn btn-secondary">Request Access</button>
      </div>
    </div>
    
    <div class="table-wrapper">
      <table class="davis-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                :checked="isAllSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th 
              v-for="column in columns" 
              :key="column.id"
              @click="handleSort(column.id)"
              :class="{ sortable: column.enableSorting }"
            >
              {{ column.header }}
              <span v-if="column.enableSorting" class="sort-indicator">
                <span v-if="sorting.id === column.id">
                  {{ sorting.desc ? '↓' : '↑' }}
                </span>
                <span v-else>↕</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="row in sortedData" 
            :key="row.davisCode"
            :class="{ selected: selectedRows.includes(row.davisCode) }"
          >
            <td>
              <input 
                type="checkbox" 
                :checked="selectedRows.includes(row.davisCode)"
                @change="toggleRowSelection(row.davisCode)"
              />
            </td>
            <td>{{ row.davisCode }}</td>
            <td>{{ row.requester }}</td>
            <td>{{ row.ipApprover }}</td>
            <td>{{ row.requestedDate }}</td>
            <td>{{ row.lastUpdated }}</td>
            <td>
              <span class="sensitivity-badge" :class="`sensitivity-${row.sensitivity.toLowerCase()}`">
                {{ row.sensitivity }}
              </span>
            </td>
            <td>{{ row.myAccessType }}</td>
            <td>{{ row.businessGroup }}</td>
            <td>
              <span class="status-badge status-approved">
                ✓ {{ row.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-footer">
      <div class="pagination-info">
        {{ startIndex }}-{{ endIndex }} of {{ totalRecords }} 
      </div>
      <div class="pagination-controls">
        <span>Show:</span>
        <select v-model="pageSize" @change="updatePageSize">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          ‹
        </button>
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          ›
        </button>
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(totalPages)"
        >
          ››
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { DAVISStatusEnum, DAVISRoleEnum } from '@/types'

interface DavisRecord {
  davisCode: string
  requester: string
  ipApprover: string
  requestedDate: string
  lastUpdated: string
  sensitivity: string
  myAccessType: DAVISRoleEnum
  businessGroup: string
  status: DAVISStatusEnum
}

interface Column {
  id: string
  header: string
  enableSorting: boolean
}

// Reactive data
const selectedRows = ref<string[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const sorting = ref({ id: '', desc: false })

// Table columns configuration
const columns: Column[] = [
  { id: 'davisCode', header: 'DAVIS Code', enableSorting: true },
  { id: 'requester', header: 'Requester', enableSorting: true },
  { id: 'ipApprover', header: 'IP Approver', enableSorting: true },
  { id: 'requestedDate', header: 'Requested Date', enableSorting: true },
  { id: 'lastUpdated', header: 'Last Updated', enableSorting: true },
  { id: 'sensitivity', header: 'Sensitivity', enableSorting: true },
  { id: 'myAccessType', header: 'My Access Type', enableSorting: true },
  { id: 'businessGroup', header: 'Business Group', enableSorting: true },
  { id: 'status', header: 'Status', enableSorting: true }
]

// Sample data based on the screenshot
const data = ref<DavisRecord[]>([
  {
    davisCode: '1000',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L1',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Gorilla Glass',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1001',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Gorilla Glass',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1002',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Gorilla Glass',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1003',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L2',
    myAccessType: DAVISRoleEnum.RDM,
    businessGroup: 'Blue',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1004',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L2',
    myAccessType: DAVISRoleEnum.EDITOR,
    businessGroup: 'Blue',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1005',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Gorilla Glass',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1006',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Fiber',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1007',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'Display',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1008',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'AO',
    status: DAVISStatusEnum.APPROVED
  },
  {
    davisCode: '1009',
    requester: 'Person Name',
    ipApprover: 'Person Name',
    requestedDate: 'YYYY-MM-DD',
    lastUpdated: 'YYYY-MM-DD',
    sensitivity: 'L3',
    myAccessType: DAVISRoleEnum.COMMENTER,
    businessGroup: 'AO',
    status: DAVISStatusEnum.APPROVED
  }
])

// Computed properties
const sortedData = computed(() => {
  const result = [...data.value]
  
  if (sorting.value.id) {
    result.sort((a, b) => {
      const aVal = a[sorting.value.id as keyof DavisRecord]
      const bVal = b[sorting.value.id as keyof DavisRecord]
      
      if (aVal < bVal) return sorting.value.desc ? 1 : -1
      if (aVal > bVal) return sorting.value.desc ? -1 : 1
      return 0
    })
  }
  
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

const totalRecords = computed(() => data.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize.value, totalRecords.value))

const isAllSelected = computed(() => {
  const currentPageCodes = sortedData.value.map(row => row.davisCode)
  return currentPageCodes.length > 0 && currentPageCodes.every(code => selectedRows.value.includes(code))
})

// Methods
const toggleSelectAll = () => {
  const currentPageCodes = sortedData.value.map(row => row.davisCode)
  
  if (isAllSelected.value) {
    selectedRows.value = selectedRows.value.filter(code => !currentPageCodes.includes(code))
  } else {
    const newSelections = currentPageCodes.filter(code => !selectedRows.value.includes(code))
    selectedRows.value.push(...newSelections)
  }
}

const toggleRowSelection = (davisCode: string) => {
  const index = selectedRows.value.indexOf(davisCode)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(davisCode)
  }
}

const handleSort = (columnId: string) => {
  if (sorting.value.id === columnId) {
    sorting.value.desc = !sorting.value.desc
  } else {
    sorting.value.id = columnId
    sorting.value.desc = false
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const updatePageSize = () => {
  currentPage.value = 1
}

onMounted(() => {
  // Initialize any data loading here
})
</script>

<style scoped>
.davis-table-container {
  background: white;
  border-radius: 0;
  box-shadow: none;
  border: 1px solid #ddd;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.selected-count {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.btn:hover {
  background: #f0f0f0;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background: #5a6268;
  border-color: #545b62;
}

.table-wrapper {
  overflow-x: auto;
  background: white;
}

.davis-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.davis-table th,
.davis-table td {
  padding: 8px 12px;
  text-align: left;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.davis-table th:last-child,
.davis-table td:last-child {
  border-right: none;
}

.davis-table th {
  background: #e8e8e8;
  font-weight: 600;
  color: #333;
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  white-space: nowrap;
}

.davis-table td {
  color: #333;
  background: white;
}

.davis-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.davis-table th.sortable:hover {
  background: #ddd;
}

.sort-indicator {
  margin-left: 4px;
  color: #666;
  font-size: 10px;
}

.davis-table tbody tr:hover {
  background: #f9f9f9;
}

.davis-table tbody tr.selected {
  background: #e6f3ff;
}

.sensitivity-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 20px;
  justify-content: center;
}

.sensitivity-l1 {
  background: #fff2cc;
  color: #b8860b;
  border: 1px solid #f4d03f;
}

.sensitivity-l2 {
  background: #ffe6cc;
  color: #d68910;
  border: 1px solid #f39c12;
}

.sensitivity-l3 {
  background: #ffcccc;
  color: #c0392b;
  border: 1px solid #e74c3c;
}

.status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #28a745;
  color: white;
  border: none;
}

.status-approved {
  background: #28a745;
  color: white;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  font-size: 12px;
}

.pagination-info {
  color: #333;
  font-size: 12px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #333;
}

.pagination-controls select {
  padding: 2px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: white;
  font-size: 12px;
}

.pagination-btn {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 12px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="checkbox"] {
  cursor: pointer;
  margin: 0;
}
</style>
