// NodeItem.vue - Enhanced with better drag feedback

<script setup lang="ts">
defineProps<{
  name: string;
  isDragging?: boolean;
}>();
</script>

<template>
  <div
    class="node-item bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-3 text-center font-semibold text-blue-700 transition-all duration-200"
    :class="[
      isDragging 
        ? 'opacity-50 scale-95 border-blue-400 shadow-inner' 
        : 'hover:shadow-md hover:border-blue-400 hover:scale-105 active:scale-95'
    ]"
  >
    {{ name }}
  </div>
</template>

<style scoped>
.node-item {
  user-select: none;
  cursor: grab;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-item:active {
  cursor: grabbing;
}
</style>
