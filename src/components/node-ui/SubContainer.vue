<script setup lang="ts">
import { useNodeStore, type Container } from '@/stores/useNodeStore';
import { DxSortable } from 'devextreme-vue/sortable';
import NodeItem from './NodeItem.vue';

const props = defineProps<{ container: Container }>();
const store = useNodeStore();

const onAdd = (e: any) => {
  const { fromData, toData, fromIndex, toIndex, itemData } = e;

  if (props.container.nodes.length >= props.container.maxCapacity) {
    e.cancel = true;
    alert(`Container "${props.container.name}" is full!`);
    return;
  }

  if (fromData === 'nodeGroup') {
    // This came from the sidebar
    store.addNodeToContainer(props.container.id, itemData, toIndex);
  } else {
    // This came from another container
    store.moveNodeBetweenContainers(fromData, toData, fromIndex, toIndex);
  }
};

const onReorder = (e: any) => {
  const { fromData, toData, fromIndex, toIndex } = e;
  store.moveNodeBetweenContainers(fromData, toData, fromIndex, toIndex);
};

const removeContainer = () => {
  store.removeContainer(props.container.id);
};
</script>

<template>
  <div class="bg-white rounded-lg border-2 border-gray-200 shadow-sm flex flex-col min-h-[150px]">
    <div class="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
      <div class="flex items-center gap-3">
        <div class="container-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
          ⠿
        </div>
        <h3 class="font-bold text-gray-700">{{ container.name }}</h3>
        <span 
          :class="[
            'text-xs px-2 py-0.5 rounded-full font-medium',
            container.nodes.length >= container.maxCapacity ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          ]"
        >
          {{ container.nodes.length }} / {{ container.maxCapacity }}
        </span>
      </div>
      <button 
        @click="removeContainer"
        class="text-gray-400 hover:text-red-500 transition-colors p-1"
        title="Remove Container"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="p-4 flex-1">
      <DxSortable
        group="nodeGroup"
        :data="container.id"
        @add="onAdd"
        @reorder="onReorder"
        class="flex flex-col gap-2 min-h-[100px]"
        empty-panel-text="Drop elements here"
      >
        <NodeItem 
          v-for="(node, index) in container.nodes" 
          :key="node.id" 
          :name="node.label" 
          class="cursor-grab active:cursor-grabbing"
        />
      </DxSortable>
    </div>
  </div>
</template>