<template>
  <main class="app">
    <app-elevator-manager />
    <app-floors />
  </main>
</template>
<script>
import AppElevatorManager from '@/components/ElevatorManager.vue'
import AppFloors from '@/components/Floors.vue'

export default {
  name: 'App',
  components: {
    AppElevatorManager,
    AppFloors,
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  font-family: 'Roboto', sans-serif;
}

.app {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
