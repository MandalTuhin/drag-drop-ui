<script setup lang="ts">
import NodeSidebar from "./components/node-ui/NodeSidebarSource.vue";
import WorkSpace from "./components/node-ui/WorkSpace.vue";
import TrashZone from "./components/node-ui/TrashZone.vue";
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-slate-50 font-sans antialiased text-slate-900">
    <NodeSidebar />
    <WorkSpace />
    <TrashZone />
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>