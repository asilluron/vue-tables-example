<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Add Filters</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label for="filter-field" class="form-label">Filter Field</label>
          <select 
            id="filter-field"
            v-model="selectedField" 
            class="form-select"
            @change="onFieldChange"
          >
            <option value="">Select a field...</option>
            <option 
              v-for="option in filterOptions" 
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="form-group" v-if="selectedField">
          <label for="filter-value" class="form-label">Filter Value</label>
          <select 
            v-if="getFieldOptions(selectedField).length > 0"
            id="filter-value"
            v-model="selectedValue" 
            class="form-select"
          >
            <option value="">Select a value...</option>
            <option 
              v-for="option in getFieldOptions(selectedField)" 
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <input 
            v-else
            id="filter-value"
            v-model="selectedValue"
            type="text"
            class="form-input"
            placeholder="Enter filter value..."
          />
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">Cancel</button>
        <button 
          class="btn btn-primary" 
          @click="addFilter"
          :disabled="!selectedField || !selectedValue"
        >
          Add Filter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DAVISStatusEnum, DAVISRoleEnum } from '@/types'

// Define props
const props = defineProps<{
  initialFilterType?: string
}>()

// Define emits
const emit = defineEmits<{
  'close': []
  'add-filter': [filterData: { field: string; value: string }]
}>()

// Reactive data
const selectedField = ref(props.initialFilterType || '')
const selectedValue = ref('')

// Watch for changes in initialFilterType prop
watch(() => props.initialFilterType, (newValue) => {
  if (newValue) {
    selectedField.value = newValue
    selectedValue.value = ''
  }
})

// Filter options based on the screenshot and table columns
const filterOptions = [
  { label: 'Requester', value: 'requester' },
  { label: 'IP Approver', value: 'ipApprover' },
  { label: 'Requested Date', value: 'requestedDate' },
  { label: 'Last Updated', value: 'lastUpdated' },
  { label: 'My Access Type', value: 'myAccessType' },
  { label: 'Business Group', value: 'businessGroup' },
  { label: 'Status', value: 'status' }
]

// Field-specific options
const fieldOptions = {
  myAccessType: [
    { label: 'IP Department Approver', value: DAVISRoleEnum.IP },
    { label: 'Research & Development Manager (RDM)', value: DAVISRoleEnum.RDM },
    { label: 'Commercial Approver', value: DAVISRoleEnum.COMMERCIAL },
    { label: 'Editor', value: DAVISRoleEnum.EDITOR },
    { label: 'Commenter', value: DAVISRoleEnum.COMMENTER }
  ],
  status: [
    { label: 'Draft', value: DAVISStatusEnum.DRAFT },
    { label: 'Submitted', value: DAVISStatusEnum.SUBMITTED },
    { label: 'Approved', value: DAVISStatusEnum.APPROVED },
    { label: 'Needs Further Refinement', value: DAVISStatusEnum.NEEDS_FURTHER_REFINEMENT }
  ],
  businessGroup: [
    { label: 'Gorilla Glass', value: 'Gorilla Glass' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Fiber', value: 'Fiber' },
    { label: 'Display', value: 'Display' },
    { label: 'AO', value: 'AO' }
  ]
}

// Methods
const getFieldOptions = (field: string) => {
  return fieldOptions[field as keyof typeof fieldOptions] || []
}

const onFieldChange = () => {
  selectedValue.value = ''
}

const closeModal = () => {
  emit('close')
}

const addFilter = () => {
  if (selectedField.value && selectedValue.value) {
    emit('add-filter', {
      field: selectedField.value,
      value: selectedValue.value
    })
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e0e0e0;
  color: #333;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-select,
.form-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-select:focus,
.form-input:focus {
  border-color: #007bff;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.btn {
  padding: 8px 16px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover:not(:disabled) {
  background: #6c757d;
  color: white;
}

.btn-primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
  border-color: #0056b3;
}
</style>
