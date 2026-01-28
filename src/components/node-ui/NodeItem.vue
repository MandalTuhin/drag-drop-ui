<script setup lang="ts">
const props = defineProps<{ name?: string }>();
</script>

<template>
  <div class="bg-white border border-gray-300 rounded shadow-sm p-3 select-none flex items-center gap-2">
    <span class="text-gray-400">☰</span>
    <span class="text-sm font-medium text-gray-700">{{ props.name }}</span>
  </div>
</template>