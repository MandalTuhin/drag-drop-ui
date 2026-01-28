<script setup lang="ts">
import NodeItem from "./NodeItem.vue";

const nodes = [
  { id: 1, name: "Node 1" },
  { id: 2, name: "Node 2" },
  { id: 3, name: "Node 3" },
  { id: 4, name: "Node 4" },
  { id: 5, name: "Node 5" },
];
</script>

<template>
  <section class="border border-black p-4 space-y-6">
    Nodes Will Exist here...
    <NodeItem
      class="block shadow-md bg-yellow-300"
      v-for="node in nodes"
      :key="node.id"
      :name="node.name"
    />
  </section>
</template>
