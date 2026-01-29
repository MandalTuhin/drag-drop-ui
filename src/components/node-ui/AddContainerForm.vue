<script setup lang="ts">
import { ref } from 'vue';
import { useNodeStore } from '@/stores/useNodeStore';

const store = useNodeStore();
const newContainerName = ref('');

const handleAddContainer = () => {
  if (newContainerName.value.trim()) {
    store.addContainer(newContainerName.value);
    newContainerName.value = '';
  }
};
</script>

<template>
  <div class="mb-6 flex gap-4 items-end bg-white p-4 rounded shadow-sm">
    <div>
      <label class="block text-sm font-medium text-gray-700">Container Name</label>
      <input
        v-model="newContainerName"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        placeholder="e.g. Panel A"
      />
    </div>
    <button
      @click="handleAddContainer"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Add Sub-Container
    </button>
  </div>
</template>
