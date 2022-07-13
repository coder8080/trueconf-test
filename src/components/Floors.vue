<template>
  <div class="floors">
    <div class="floors__floor" v-for="floor in floorCount" :key="floor">
      <span class="floors__title">{{ floor }}</span>
      <button
        class="floors__button"
        :class="{ floors__button_active: waitingFloors.has(floor) }"
        @click="addToQueue(floor)"
      ></button>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { mutationTypes } from '@/store/modules/elevators'
import { mapState } from 'vuex'

export default {
  name: 'AppFloors',
  methods: {
    addToQueue(floor) {
      this.$store.commit(mutationTypes.addToQueue, floor)
    },
  },
  data() {
    return {
      floorCount: config.floorsCount,
    }
  },
  computed: {
    ...mapState({ waitingFloors: (state) => state.elevators.waitingFloors }),
  },
}
</script>
<style scoped>
.floors {
  display: flex;
  flex-direction: column-reverse;
}

.floors__floor {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #4c4c4c;
  padding-left: 20px;
  padding-top: 20px;
  gap: 10px;
  align-items: center;
}

.floors__button {
  --color: #068995;
  border: 1px solid var(--color);
  color: var(--color);
  background-color: white;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.floors__button::after {
  width: 20px;
  height: 20px;
  background-color: var(--color);
  mask: url('@/assets/circle.svg') no-repeat 50% 50%;

  content: '';
  display: block;
}

.floors__button_active {
  --color: #ee7013;
}
</style>
