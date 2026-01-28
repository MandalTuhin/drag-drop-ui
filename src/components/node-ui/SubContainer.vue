<script setup lang="ts">
import { useNodeStore, type Container } from '@/stores/useNodeStore';
import { DxSortable } from 'devextreme-vue/sortable';
import NodeItem from './NodeItem.vue';

const props = defineProps<{ container: Container }>();
const store = useNodeStore();

const onAdd = (e: any) => {
  const { fromData, toData, fromIndex, toIndex, itemData, itemElement } = e;
  
  let nodeData = itemData;
  if (!nodeData && itemElement && itemElement.getAttribute('data')) {
    try {
      nodeData = JSON.parse(itemElement.getAttribute('data'));
    } catch (err) {
      console.error("Failed to parse node data", err);
    }
  }

  const isFromSidebar = fromData === 'sidebar';

  if (isFromSidebar && nodeData) {
    store.addNodeToContainer(props.container.id, nodeData, toIndex);
  } else if (fromData && fromData !== 'sidebar') {
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

const updateCols = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value);
  store.updateContainerNumCol(props.container.id, val);
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
        
        <div class="flex items-center gap-2 ml-4">
          <label class="text-xs font-bold text-gray-400 uppercase">Cols:</label>
          <input 
            type="number" 
            :value="container.numCol" 
            @input="updateCols"
            min="1" 
            max="12"
            class="w-12 border rounded px-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
      
      <button 
        @click="removeContainer"
        class="text-gray-400 hover:text-red-500 transition-colors p-1"
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
        filter=".item"
        @add="onAdd"
        @reorder="onReorder"
        item-orientation="horizontal"
        class="min-h-[100px]"
      >
        <div 
          class="grid gap-3" 
          :style="{ gridTemplateColumns: `repeat(${container.numCol}, minmax(0, 1fr))` }"
        >
          <div 
            v-for="node in container.nodes" 
            :key="node.id" 
            class="item" 
            :data="JSON.stringify(node)"
          >
            <NodeItem 
              :name="node.label" 
              class="cursor-grab active:cursor-grabbing w-full"
            />
          </div>
        </div>
      </DxSortable>
    </div>
  </div>
</template>