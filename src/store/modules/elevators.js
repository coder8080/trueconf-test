import config from '@/config'
const elevators = []
for (let i = 0; i < config.elevatorsCount; i++)
  elevators.push({ state: 0, nextFloor: 0 })

const state = {
  elevators,
  queue: [],
  queueSet: new Set(),
}
export const mutationTypes = {
  addToQueue: '[ELEVATORS] ADD TO QUEUE',
  elevatorReady: '[ELEVATORS] ELEVATOR READY',
}
const mutations = {
  [mutationTypes.addToQueue](state, floor) {
    floor -= 1
    if (state.queueSet.has(floor)) return
    let freeElevator = null
    let distance = Infinity
    for (let elevator of state.elevators) {
      if (elevator.state === floor && elevator.nextFloor === floor) return
      if (elevator.state === elevator.nextFloor) {
        if (
          freeElevator === null ||
          Math.abs(elevator.state - floor) < distance
        ) {
          freeElevator = elevator
          distance = Math.abs(elevator.state - floor)
          break
        }
      }
    }
    if (!freeElevator) {
      state.queue.push(floor)
      state.queueSet.add(floor)
      return
    }
    freeElevator.nextFloor = floor
  },
  [mutationTypes.elevatorReady](state, i) {
    state.elevators[i].state = state.elevators[i].nextFloor
    state.queueSet.delete(state.elevators[i].nextFloor)
    if (state.queue.length > 0) {
      state.elevators[i].nextFloor = state.queue.shift()
    }
  },
}

export default { state, mutations }
