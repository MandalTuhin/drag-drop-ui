<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNodeStore, type Container } from '@/stores/useNodeStore';
import { VueDraggable } from 'vue-draggable-plus';
import NodeItem from './NodeItem.vue';

const props = defineProps<{ container: Container }>();
const store = useNodeStore();

const nodes = computed({
  get: () => props.container.nodes,
  set: (val) => {
    store.updateContainerNodes(props.container.id, val);
  },
});

const itemWidth = computed(() => {
  return `${100 / props.container.numCol}%`;
});

const indicatorIndex = ref<number | null>(null);
const indicatorSide = ref<'left' | 'right'>('left');
const isDraggingOverEmpty = ref(false);

const onMove = (e: any) => {
  const { relatedContext, to } = e;

  isDraggingOverEmpty.value = false;

  if (to.classList.contains('sortable-container')) {
    if (relatedContext.list.length === 0) {
      isDraggingOverEmpty.value = true;
      indicatorIndex.value = null;
    } else {
      indicatorIndex.value = relatedContext.index;

      // Determine if we are on the left or right half of the target element
      const rect = e.related.getBoundingClientRect();
      const mouseX = e.originalEvent.clientX;
      const midX = rect.left + rect.width / 2;

      indicatorSide.value = mouseX > midX ? 'right' : 'left';
    }
  }
  return false; // Prevent default SortableJS sorting
};

const onEnd = () => {
  indicatorIndex.value = null;
  isDraggingOverEmpty.value = false;
};

const onDragLeave = () => {
  indicatorIndex.value = null;
  isDraggingOverEmpty.value = false;
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
    class="bg-white rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col min-h-[160px] border-gray-200"
    :class="{ 'ring-2 ring-blue-100 border-blue-200': isDraggingOverEmpty }"
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

    <div class="p-2 flex-1 relative">
      <!-- Indicator for Empty Container -->
      <div
        v-if="isDraggingOverEmpty"
        class="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full z-50"
      ></div>

      <VueDraggable
        v-model="nodes"
        group="nodeGroup"
        ghost-class="opacity-30"
        chosen-class="opacity-50"
        :animation="250"
        :move="onMove"
        @end="onEnd"
        @drag-leave="onDragLeave"
        class="flex flex-wrap min-h-[120px] content-start sortable-container transition-all duration-300 ease-in-out"
      >
        <div
          v-for="(node, index) in nodes"
          :key="node.id"
          class="item-wrapper p-2 relative"
          :style="{ width: itemWidth }"
        >
          <!-- Insertion Indicator -->
          <div
            v-if="indicatorIndex === index"
            class="absolute top-2 bottom-2 w-1 bg-green-500 z-50 rounded-full transition-all"
            :class="[indicatorSide === 'left' ? 'left-0' : 'right-0']"
          ></div>

          <NodeItem :name="node.label" />
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<style scoped>
/* Removed ghost and chosen classes as they're now inline in the template */
.sortable-container {
  /* Ensure smooth reordering when the item is finally dropped */
  transition: all 0.3s ease;
}

:deep(.sortable-fallback) {
  opacity: 1 !important;
}
</style>



