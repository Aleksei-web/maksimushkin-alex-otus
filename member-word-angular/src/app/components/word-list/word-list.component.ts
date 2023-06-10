import {Component, Input} from '@angular/core';
import {WordInterface} from "../../models/WordInterface";
import {WordService} from "../../services/word.service";

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent {

  constructor(private wordService: WordService) {
  }

  @Input() public wordList: WordInterface[]

  deleteWord(id:number){
    this.wordService.delete(id)
  }
}
