<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNodeStore, type Container } from '@/stores/useNodeStore';
import { DxSortable } from 'devextreme-vue/sortable';
import NodeItem from './NodeItem.vue';

const props = defineProps<{ container: Container }>();
const store = useNodeStore();

const isDragOver = ref(false);

const itemWidth = computed(() => {
  return `${100 / props.container.numCol}%`;
});

const onAdd = (e: any) => {
  isDragOver.value = false;
  const { fromData, toData, fromIndex, toIndex, itemData, itemElement } = e;
  
  let nodeData = itemData;
  if (!nodeData && itemElement) {
    const dataAttr = itemElement.getAttribute('data');
    if (dataAttr) {
      try {
        nodeData = JSON.parse(dataAttr);
      } catch (err) {
        console.error("Failed to parse node data", err);
      }
    }
  }

  if (fromData === 'sidebar' && nodeData) {
    store.addNodeToContainer(props.container.id, nodeData, toIndex);
  } else if (fromData && fromData !== 'sidebar') {
    store.moveNodeBetweenContainers(fromData, toData, fromIndex, toIndex);
  }
};

const onReorder = (e: any) => {
  const { fromData, toData, fromIndex, toIndex } = e;
  store.moveNodeBetweenContainers(fromData, toData, fromIndex, toIndex);
};

const onDragEnter = (e: any) => {
  if (e.fromData !== props.container.id) {
    isDragOver.value = true;
  }
};

const onDragLeave = () => {
  isDragOver.value = false;
};

const removeContainer = () => {
  store.removeContainer(props.container.id);
};

const updateCols = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value);
  if (!isNaN(val)) {
    store.updateContainerNumCol(props.container.id, val);
  }
};
</script>

<template>
  <div 
    class="bg-white rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col min-h-[160px]"
    :class="[isDragOver ? 'border-blue-500 ring-4 ring-blue-50 bg-blue-50/20' : 'border-gray-200']"
  >
    <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
      <div class="flex items-center gap-4">
        <div class="container-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-12a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </div>
        <h3 class="font-bold text-gray-800 tracking-tight">{{ container.name }}</h3>
        
        <div class="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Columns</label>
          <input 
            type="number" 
            :value="container.numCol" 
            @input="updateCols"
            min="1" 
            max="12"
            class="w-10 text-center font-bold text-blue-600 bg-transparent outline-none"
          />
        </div>
      </div>
      
      <button 
        @click="removeContainer"
        class="text-gray-300 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="p-2 flex-1">
      <DxSortable
        group="nodeGroup"
        :data="container.id"
        filter=".item-wrapper"
        @add="onAdd"
        @reorder="onReorder"
        @drag-enter="onDragEnter"
        @drag-leave="onDragLeave"
        item-orientation="horizontal"
        class="sortable-container flex flex-wrap min-h-[120px] content-start"
      >
        <div 
          v-for="node in container.nodes" 
          :key="node.id" 
          class="item-wrapper p-2" 
          :style="{ width: itemWidth }"
          :data="JSON.stringify(node)"
        >
          <NodeItem :name="node.label" />
        </div>
      </DxSortable>
    </div>
  </div>
</template>

<style scoped>
.sortable-container {
  display: flex !important;
  flex-wrap: wrap !important;
}

:deep(.dx-sortable-placeholder) {
  width: v-bind(itemWidth) !important;
  height: 64px !important; /* matches item height + padding */
  padding: 8px !important;
}
</style>