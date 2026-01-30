<script setup lang="ts">
import { useNodeStore, type Node } from '@/stores/useNodeStore';
import { VueDraggable } from 'vue-draggable-plus';
import NodeItem from './NodeItem.vue';
import type { SortableEvent } from 'sortablejs';

const store = useNodeStore();

// Determines if the item should be cloned or moved
const checkPull = (to: any, from: any, dragEl: HTMLElement) => {
  return dragEl.dataset.id === 'spacer' ? 'clone' : true;
};

// Determines if an item can be dropped back into the sidebar
const checkPut = (to: any, from: any, dragEl: HTMLElement) => {
  // Prevent cloned spacer nodes from being put back
  return dragEl.dataset.label !== '[ || ]';
};

// Generates a new ID for cloned items
const handleClone = (node: Node) => {
  return {
    ...node,
    id: crypto.randomUUID(),
  };
};
</script>

<template>
  <aside class="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
    <div class="p-4 border-b border-gray-100">
      <h2 class="text-lg font-bold text-gray-800">Available Elements</h2>
      <p class="text-xs text-gray-500 mt-1">Drag elements to the workspace</p>
    </div>

    <div class="p-4 flex-1 overflow-y-auto">
      <VueDraggable
        v-model="store.availableNodes"
        class="flex flex-col gap-2 h-full"
        :group="{ name: 'nodeGroup', pull: checkPull, put: checkPut }"
        :clone="handleClone"
        :animation="300"
        :force-fallback="true"
        fallback-class="dragging-card"
        ghost-class="ghost-item"
      >
        <div
          v-for="node in store.availableNodes"
          :key="node.id"
          :data-id="node.id"
          class="block item cursor-grab active:cursor-grabbing"
        >

          <NodeItem :name="node.label" class="hover:border-blue-400 transition-colors" />
        </div>
      </VueDraggable>
    </div>
  </aside>
</template>

<style scoped>
:deep(.dragging-card) {
  opacity: 1 !important;
  cursor: grabbing !important;
  pointer-events: none;
  z-index: 9999;
}

/* Apply the visual effects to the CONTENT, not the wrapper moving around */
:deep(.dragging-card > *) {
  transform: rotate(3deg) !important;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2) !important;
}

:deep(.ghost-item) {
  opacity: 1 !important;
  background: #f3f4f6 !important;
  border: 2px dashed #3b82f6 !important;
  border-radius: 0.5rem;
}
</style>
