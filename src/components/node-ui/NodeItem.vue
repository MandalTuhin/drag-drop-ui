<script setup lang="ts">
const props = defineProps<{ name?: string }>();
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2 h-12 flex items-center gap-2 select-none hover:border-blue-300 transition-colors">
    <div class="text-gray-400 cursor-grab active:cursor-grabbing">
      <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2H2V4H4V2ZM8 2H6V4H8V2ZM4 6H2V8H4V6ZM8 6H6V8H8V6ZM4 10H2V12H4V10ZM8 10H6V12H8V10ZM4 14H2V16H4V14ZM8 14H6V16H8V14Z" fill="currentColor"/>
      </svg>
    </div>
    <span class="text-sm font-medium text-gray-700 truncate">{{ props.name }}</span>
  </div>
</template>
