<template>
  <v-container>
    <v-card class="pa-8" max-width="900">
      <v-row class="d-flex justify-space-between">
        <v-btn @click="$router.push('/')">отмена</v-btn>
        <div>{{ Math.floor(time / 60) }}:{{ time % 60 }}</div>
      </v-row>
      <div v-if="time">
        <div class="d-flex align-center justify-space-between ma-8">
          <div>{{ question[0] }}</div>
          <div>{{ question[1] }}</div>
          <div>
            <v-text-field v-model="form.firstField"/>
          </div>
          <div>{{ question[3] }}</div>
          <div>
            <v-text-field v-model="form.secondField"/>
          </div>
          <div>{{ question[5] }}</div>
          <div>{{ question[6] }}</div>
        </div>
        <v-btn @click="nextQuestion" class="ma-2">пропустить</v-btn>
        <v-btn @click="checkAnswer" class="ma-2">проверить</v-btn>
        <v-card-subtitle v-if="showResult">{{ textResult }}</v-card-subtitle>
      </div>
      <div v-else>
        <div>Результат</div>
        <v-card-text>правильных ответов: {{result.right}}</v-card-text>
        <v-card-text>не правильных ответов: {{result.error}}</v-card-text>
      </div>

    </v-card>
  </v-container>
</template>
<script>
import {useRoute} from "vue-router";
import {ref} from "vue";

export default {
  name: "GamePage",

  setup() {
    const route = useRoute()
    const formField = {firstField: null, secondField: null}

    const form = ref(formField)
    const time = ref(parseInt(route.query.time) * 60)
    const difficulty = parseInt(route.query.difficulty)
    const actions = route.query.actions.split(',');
    const question = ref([])
    const result = ref({right: 0, error: 0})
    const textResult = ref('')
    const showResult = ref(false)

    return {
      showResult,
      textResult,
      form,
      result,
      question,
      time,
      difficulty,
      actions
    }
  },
  methods: {
    checkAnswer() {
      const answer = `${this.question[0]} ${this.question[1]} ${this.form.firstField} ${this.question[3]} ${this.form.secondField}`

      const isRightAnswer = eval(answer) === this.question[this.question.length - 1]

      this.showResult = true
      if (isRightAnswer) {
        this.textResult = 'верно'
        this.result.right++
      } else {
        this.textResult = 'не верно'
        this.result.error++
      }

      setTimeout(() => {
        this.form.secondField = null
        this.form.firstField = null
        this.showResult = false
        this.nextQuestion()
      }, 1000)
    },
    nextQuestion() {
      this.runGame()
    },
    runGame() {
      this.question = [...this.makeQuestion()]
    },
    runTimer() {
      const timer = setInterval(() => {
        if (this.time) {
          this.time--
        } else {
          clearInterval(timer)
        }
      }, 1000)
    },
    makeQuestion() {
      let question = []
      const steps = 3
      for (let i = 0; i < steps; i++) {
        if (i === steps - 1) {
          question.push(this.randomNumber(10 * this.difficulty))
          const result = eval(question.join(' '))
          question.push('=')
          question.push(result)
        } else {
          question.push(this.randomNumber(10 * this.difficulty))
          question.push(this.randomOperaton())
        }
      }

      return question
    },
    randomOperaton() {
      const idx = this.randomNumber(this.difficulty)

      return this.getOperationByText(this.actions[idx])
    },
    randomNumber(max) {
      return Math.floor(Math.random() * max + 1)
    },
    getOperationByText(text) {
      switch (text) {
        case 'деление':
          return '/'
        case 'умножение':
          return '*'
        case 'сложение':
          return '+'
        default:
          return '-'
      }
    }
  },

  mounted() {
    this.nextQuestion()
    this.runTimer()
  }
}
</script>