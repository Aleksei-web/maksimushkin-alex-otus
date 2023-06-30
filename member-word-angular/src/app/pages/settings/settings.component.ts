import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  countWordsForTrain = 10
  timeToTrain = 10

  increaseTime(){
    this.timeToTrain++
  };
  decreaseTime(){
    this.timeToTrain--
  };


  increaseCount(){
    this.countWordsForTrain++
  };
  decreaseCount(){
    this.countWordsForTrain--
  };
}
