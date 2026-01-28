<script setup lang="ts">
import { ref } from 'vue';
import { useNodeStore } from '@/stores/useNodeStore';
import { DxSortable } from 'devextreme-vue/sortable';
import SubContainer from './SubContainer.vue';

const store = useNodeStore();
const newContainerName = ref('');
const newContainerCols = ref(3);

const handleAddContainer = () => {
  if (newContainerName.value.trim()) {
    store.addContainer(newContainerName.value, newContainerCols.value);
    newContainerName.value = '';
    newContainerCols.value = 3;
  }
};

const onContainerReorder = (e: any) => {
  store.reorderContainers(e.fromIndex, e.toIndex);
};
</script>

<template>
  <div class="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-hidden">
    <header class="bg-white border-b border-gray-200 p-6 shadow-sm">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end gap-4">
        <div class="flex-1">
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">New Container Name</label>
          <input
            v-model="newContainerName"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5 transition-all"
            placeholder="e.g. Sales Department"
            @keyup.enter="handleAddContainer"
          />
        </div>
        <div class="w-32">
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Columns</label>
          <input
            v-model.number="newContainerCols"
            type="number"
            min="1"
            max="12"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5 transition-all"
          />
        </div>
        <button
          @click="handleAddContainer"
          class="bg-blue-600 text-white px-6 py-2.5 rounded-md font-bold hover:bg-blue-700 transition-all shadow-md active:transform active:scale-95"
        >
          Create Container
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto">
        <div v-if="store.workspaceContainers.length === 0" class="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl">
          <p class="text-gray-400 font-medium">No containers yet. Create one above to start building your layout.</p>
        </div>

        <DxSortable
          class="flex flex-col gap-6"
          item-orientation="vertical"
          handle=".container-handle"
          @reorder="onContainerReorder"
        >
          <SubContainer 
            v-for="container in store.workspaceContainers" 
            :key="container.id" 
            :container="container" 
          />
        </DxSortable>
      </div>
    </main>
  </div>
</template>
