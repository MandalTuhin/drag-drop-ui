<script setup lang="ts">
import { ref } from 'vue';
import { useNodeStore } from '@/stores/useNodeStore';
import { VueDraggable } from 'vue-draggable-plus';
import SubContainer from './SubContainer.vue';

const store = useNodeStore();
const newContainerName = ref('');
const newContainerCapacity = ref(5);

const handleAddContainer = () => {
  if (newContainerName.value.trim()) {
    store.addContainer(newContainerName.value, newContainerCapacity.value);
    newContainerName.value = '';
  }
};
</script>

<template>
  <div class="flex-1 p-6 bg-gray-50 min-h-screen">
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
      <div>
        <label class="block text-sm font-medium text-gray-700">Capacity</label>
        <input
          v-model.number="newContainerCapacity"
          type="number"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
      </div>
      <button
        @click="handleAddContainer"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Sub-Container
      </button>
    </div>

    <VueDraggable
      v-model="store.workspaceContainers"
      class="flex flex-col gap-4"
      handle=".container-handle"
      :animation="250"
      ghost-class="ghost"
    >
      <TransitionGroup type="transition" name="fade">
        <div v-for="container in store.workspaceContainers" :key="container.id" class="relative">
          <div class="container-handle absolute left-2 top-4 cursor-grab active:cursor-grabbing p-1 text-gray-400 z-10">
            ⠿
          </div>
          <SubContainer :container="container" class="ml-8" />
        </div>
      </TransitionGroup>
    </VueDraggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.3;
  background: #f7fafc;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
