import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WordService} from "../../services/word.service";

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent {

  form = new FormGroup({
    word: new FormControl<string>(''),
    translate: new FormControl<string>(''),
  })

  constructor(private wordService: WordService) {
  }

  submit() {
    console.log('this.form.value')
    if (this.form.value.word && this.form.value.translate) {
      this.wordService.add({
        word: this.form.value.word,
        translate: this.form.value.translate,
        id: Date.now()
      })
      this.form.reset()
    }
  }
}
