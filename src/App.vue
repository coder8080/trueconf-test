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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
