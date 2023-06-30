import {Component} from '@angular/core';
import {WordService} from "../../services/word.service";
import {WordInterface} from "../../models/WordInterface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent {

  isStarted = false
  currentStep = 0
  currentWord: WordInterface = this.wordService.words$.value[this.currentStep]
  isDone = false

  form = new FormGroup({
    translate: new FormControl<string>(''),
  })

  constructor(private wordService: WordService) {
  }

  nextWord() {
    this.form.reset()
    const words = this.wordService.words$.value
    this.currentStep++
    this.currentWord = words[this.currentStep]
    if (words.length === this.currentStep) {
      this.isDone = true
    }
  }
}
