<script setup lang="ts">
import { useNodeStore, type Node } from '@/stores/useNodeStore';
import { VueDraggable } from 'vue-draggable-plus';
import NodeItem from './NodeItem.vue';

const store = useNodeStore();

const cloneNode = (element: Node) => {
  return {
    ...element,
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
        :group="{ name: 'nodeGroup', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneNode"
        :animation="150"
      >
        <div
          v-for="node in store.availableNodes"
          :key="node.id"
          class="item cursor-grab active:cursor-grabbing"
        >
          <NodeItem :name="node.label" class="hover:border-blue-400 transition-colors" />
        </div>
      </VueDraggable>
    </div>
  </aside>
</template>

<style scoped>
.item {
  display: block;
}
</style>