<script setup lang="ts">
const props = defineProps<{ name?: string }>();
console.log(props.name);
</script>

<template>
  <span class="border border-black p-4">
    {{ props.name }}
  </span>
</template>
