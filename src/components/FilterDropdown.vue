<template>
  <div class="filter-dropdown-container">
    <button 
      class="filter-btn" 
      @click="toggleDropdown"
      :class="{ active: isOpen }"
    >
      Add Filter
      <span class="dropdown-arrow" :class="{ rotated: isOpen }">▼</span>
    </button>
    
    <div v-if="isOpen" class="dropdown-menu">
      <div 
        v-for="option in filterOptions" 
        :key="option.value"
        class="dropdown-item"
        @click="selectFilter(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Define emits
const emit = defineEmits<{
  'add-filter': [filterType: string]
}>()

// Reactive data
const isOpen = ref(false)

// Filter options based on the screenshot
const filterOptions = [
  { label: 'Requester', value: 'requester' },
  { label: 'IP Approver', value: 'ipApprover' },
  { label: 'Requested Date', value: 'requestedDate' },
  { label: 'Last Updated', value: 'lastUpdated' },
  { label: 'My Access Type', value: 'myAccessType' },
  { label: 'Business Group', value: 'businessGroup' },
  { label: 'Status', value: 'status' }
]

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectFilter = (filterType: string) => {
  emit('add-filter', filterType)
  isOpen.value = false
}

const closeDropdown = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.filter-dropdown-container')) {
    isOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.filter-dropdown-container {
  position: relative;
  display: inline-block;
}

.filter-btn {
  height: 36px;
  padding: 0 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f8f8f8;
}

.filter-btn.active {
  background: #f0f0f0;
  border-color: #999;
}

.dropdown-arrow {
  font-size: 10px;
  color: #666;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 2px;
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f8f8f8;
}

.dropdown-item:active {
  background: #e8e8e8;
}
</style>
