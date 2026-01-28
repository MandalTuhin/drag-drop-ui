<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
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
    <section class="border border-black p-4 space-y-6">
      Nodes Will Exist here...
      <div class="border border-black p-4">Node 1</div>
      <div class="border border-black p-4">Node 1</div>
      <div class="border border-black p-4">Node 1</div>
      <div class="border border-black p-4">Node 1</div>
      <div class="border border-black p-4">Node 1</div>
      <div class="border border-black p-4">Node 1</div>
      <div></div>
    </section>
    <section class="border border-black p-4 space-y-6">
      you can add sub-containers here and drag nodes and drop here.
      <div class="border border-black p-4">
        <h3>Container for things</h3>
        <section class="flex gap-4">
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
        </section>
      </div>
      <div class="border border-black p-4">
        <h3>Container for things</h3>
        <section class="flex gap-4">
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
          <span class="border border-black p-4">Node 1</span>
        </section>
      </div>
    </section>
  </main>
</template>
