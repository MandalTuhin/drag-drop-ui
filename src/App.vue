<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import NodeSidebar from "./components/node-ui/NodeSidebarSource.vue";
import WorkSpace from "./components/node-ui/WorkSpace.vue";
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->

  <main class="bg-green-300 min-h-screen container mx-auto p-6 flex justify-center gap-8">
    <NodeSidebar />
    <WorkSpace />
  </main>
</template>
