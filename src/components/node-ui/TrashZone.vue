<script setup lang="ts">
import { useNodeStore } from '@/stores/useNodeStore';
import { DxSortable } from 'devextreme-vue/sortable';

const store = useNodeStore();

const onAdd = (e: any) => {
  const { fromData, fromIndex } = e;
  
  // If it came from a container, remove it from that container
  if (fromData !== 'nodeGroup') {
    store.removeNode(fromData, fromIndex);
  }
  
  // If it came from sidebar (nodeGroup), we just do nothing (it wasn't added yet)
  // or we could explicitly cancel if we don't want to allow dragging from sidebar to trash
  e.cancel = true; 
};
</script>

<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
    <DxSortable
      group="nodeGroup"
      @add="onAdd"
      class="trash-zone bg-red-50 border-2 border-dashed border-red-300 rounded-full px-8 py-4 flex items-center gap-3 transition-all hover:bg-red-100 hover:border-red-500 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span class="text-red-500 font-bold text-sm">Drop here to delete</span>
    </DxSortable>
  </div>
</template>

<style scoped>
.trash-zone {
  min-width: 200px;
  justify-content: center;
}
</style>
