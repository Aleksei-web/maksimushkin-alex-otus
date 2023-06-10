import { Component } from '@angular/core';
import {WordInterface} from "../../models/WordInterface";
import {WordService} from "../../services/word.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(public wordService: WordService) {
  }
}
