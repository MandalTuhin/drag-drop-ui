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
/* Global styles for DevExtreme if needed, but Tailwind should handle most */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Ensure DevExtreme drag shadow doesn't look weird */
.dx-sortable-dragging {
  opacity: 0.7;
}

.dx-sortable-placeholder {
  background-color: rgba(59, 130, 246, 0.1);
  border: 2px dashed #3b82f6;
  border-radius: 0.5rem;
}
</style>