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

const indicatorIndex = ref<number | null>(null);
const indicatorSide = ref<'top' | 'bottom'>('top');

const onMove = (e: any) => {
  const { relatedContext } = e;
  indicatorIndex.value = relatedContext.index;
  
  const rect = e.related.getBoundingClientRect();
  const mouseY = e.originalEvent.clientY;
  const midY = rect.top + rect.height / 2;
  
  indicatorSide.value = mouseY > midY ? 'bottom' : 'top';
  return false;
};

const onEnd = () => {
  indicatorIndex.value = null;
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
      class="flex flex-col gap-4 relative"
      handle=".container-handle"
      :animation="250"
      ghost-class="ghost"
      :move="onMove"
      @end="onEnd"
      @drag-leave="onEnd"
    >
      <div v-for="(container, index) in store.workspaceContainers" :key="container.id" class="relative">
        <!-- Horizontal Indicator -->
        <div 
          v-if="indicatorIndex === index" 
          class="absolute left-8 right-0 h-1 bg-blue-500 z-50 rounded-full"
          :class="[indicatorSide === 'top' ? '-top-2' : '-bottom-2']"
        ></div>

        <div class="container-handle absolute left-2 top-4 cursor-grab active:cursor-grabbing p-1 text-gray-400 z-10">
          ⠿
        </div>
        <SubContainer :container="container" class="ml-8" />
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.3;
}
</style>
