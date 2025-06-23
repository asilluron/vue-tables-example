<template>
  <div class="davis-page">
    <div class="page-header">
      <h1>DAVIS Code Management</h1>
      <p class="page-description">
        Manage and view your DAVIS code access requests and permissions.
      </p>
    </div>
    
    <div class="page-content">
      <DavisTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import DavisTable from '../components/DavisTable.vue'
</script>

<style scoped>
.davis-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
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
  background: transparent;
}
</style>
