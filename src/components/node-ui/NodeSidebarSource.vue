<script setup lang="ts">
import { useNodeStore } from '@/stores/useNodeStore';
import { DxDraggable } from 'devextreme-vue/draggable';
import NodeItem from './NodeItem.vue';

const store = useNodeStore();
</script>

<template>
  <aside class="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
    <div class="p-4 border-b border-gray-100">
      <h2 class="text-lg font-bold text-gray-800">Available Elements</h2>
      <p class="text-xs text-gray-500 mt-1">Drag elements to the workspace</p>
    </div>
    
    <div class="p-4 flex-1 overflow-y-auto">
      <div class="flex flex-col gap-2">
        <DxDraggable
          v-for="node in store.availableNodes"
          :key="node.id"
          class="item-source"
          group="nodeGroup"
          :data="node"
          :clone="true"
        >
          <NodeItem :name="node.label" class="cursor-grab active:cursor-grabbing hover:border-blue-400 transition-colors" />
        </DxDraggable>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.item-source {
  display: block;
}
</style>