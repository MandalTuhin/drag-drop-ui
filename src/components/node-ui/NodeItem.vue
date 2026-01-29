<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next';

defineProps<{
  name: string;
  isDragging?: boolean;
}>();
</script>

<template>
  <div
    class="node-item bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-3 text-center font-semibold text-blue-700 transition-all duration-200 min-h-12 flex items-center justify-center select-none cursor-grab relative pl-8"
    :class="[
      isDragging
        ? 'opacity-50 scale-95 border-blue-400 shadow-inner'
        : 'hover:shadow-md hover:border-blue-400 hover:scale-105 active:scale-95 active:cursor-grabbing'
    ]"
  >
    <!-- Drag handle icon using Lucide -->
    <div class="absolute left-2 top-1/2 -translate-y-1/2 text-blue-400">
      <GripVertical :size="16" />
    </div>

    {{ name }}
  </div>
</template>

