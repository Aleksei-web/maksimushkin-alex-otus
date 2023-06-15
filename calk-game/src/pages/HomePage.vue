<template>
  <v-container>
    <v-card max-width="800" class="pa-8">
      <v-card-title>
        Настройки
      </v-card-title>
      <v-form>
        <v-slider
            v-model="time"
            class="align-center"
            :max="maxTime"
            :min="minTime"
            hide-details
        />
        <v-card-text>Длительность {{ time.toFixed() }} минут</v-card-text>

        <v-slider
            v-model="difficulty"
            class="align-center"
            :max="maxDifficulty"
            :min="minDifficulty"
            hide-details
        />
        <v-card-text>Сложность {{ difficulty.toFixed() }}</v-card-text>

        <v-combobox
            v-model="actions"
            :items="itemsActions"
            variant="solo-inverted"
            label="набор дейстивий"
            multiple
            chips
        />

        <v-btn @click="play">Play!</v-btn>
      </v-form>
    </v-card>
  </v-container>

</template>
<script>
import {ref} from "vue";

export default {
  name: "HomePage",
  setup() {
    const time = ref(10)
    const difficulty = ref(5)
    const actions = ref(['умножение'])

    const itemsActions = [
      'умножение',
      'деление',
      "разность",
      "сложение"
    ]

    const minTime = 1
    const maxTime = 20
    const minDifficulty = 1
    const maxDifficulty = 10


    return {
      itemsActions,
      actions,
      time,
      difficulty,
      minTime,
      maxTime,
      minDifficulty,
      maxDifficulty
    }
  },

  methods: {
    play(){
      console.log('clic')
      this.$router.push(`/game?time=${this.time}&difficulty=${this.difficulty}&actions=${this.actions.join(',')}`)
    }
  }

}
</script>