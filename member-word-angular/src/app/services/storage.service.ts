import {Injectable} from '@angular/core';
import {WordInterface} from "../models/WordInterface";
import {CONSTANTS} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  getWords(): WordInterface[] {
    const words = window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY_WORDS)
    if (!words) {
      return []
    } else {
      return JSON.parse(words)
    }
  }

  updateWords(words: WordInterface[]) {
    window.localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY_WORDS, JSON.stringify(words))
  }
}
