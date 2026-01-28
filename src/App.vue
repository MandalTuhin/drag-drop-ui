<script setup lang="ts">
import NodeSidebar from "./components/node-ui/NodeSidebarSource.vue";
import WorkSpace from "./components/node-ui/WorkSpace.vue";
import TrashZone from "./components/node-ui/TrashZone.vue";
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-slate-50 font-sans antialiased text-slate-900">
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

/* Global DevExtreme Sortable Overrides */
.dx-sortable-dragging {
  opacity: 0.95 !important;
  z-index: 10000 !important;
  pointer-events: none !important;
}

.dx-sortable-dragging .item-wrapper {
  padding: 0 !important;
  width: auto !important;
}

.dx-sortable-placeholder {
  visibility: visible !important;
  background-color: transparent !important;
  position: relative;
}

.dx-sortable-placeholder::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 8px;
  bottom: 8px;
  left: 8px;
  border: 2px dashed #3b82f6;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 0.5rem;
}

.dx-sortable-source-hidden {
  opacity: 0.2 !important;
}

/* Fix for DevExtreme horizontal drag calculation */
.dx-sortable {
  touch-action: none;
}
</style>