<script setup lang="ts">
import NodeSidebar from "./components/node-ui/NodeSidebarSource.vue";
import WorkSpace from "./components/node-ui/WorkSpace.vue";
import TrashZone from "./components/node-ui/TrashZone.vue";
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-gray-100 font-sans antialiased text-gray-900">
    <NodeSidebar />
    <WorkSpace />
    <TrashZone />
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* DevExtreme Sortable Styles */
.dx-sortable-dragging {
  opacity: 0.9;
  z-index: 10000;
  transform: scale(1.02);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.dx-sortable-placeholder {
  background-color: rgba(59, 130, 246, 0.05) !important;
  border: 2px dashed #3b82f6 !important;
  border-radius: 0.5rem !important;
  visibility: visible !important;
  min-height: 48px;
}

/* Ensure placeholder fits in the grid */
.grid .dx-sortable-placeholder {
  grid-column: span 1;
}

/* Improve transition when dragging */
.item {
  transition: transform 0.2s ease;
}

.dx-sortable-source-hidden {
  opacity: 0.3;
}
</style>
