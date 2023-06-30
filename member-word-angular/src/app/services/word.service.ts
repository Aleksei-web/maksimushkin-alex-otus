import {Injectable} from '@angular/core';
import {WordInterface} from "../models/WordInterface";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  public words$ = new BehaviorSubject<WordInterface[]>(this.storageService.getWords());

  constructor(private storageService: StorageService) {
  }

  public add(word: WordInterface) {
    const updatedWords = [word, ...this.words$.getValue()];
    this.words$.next(updatedWords);
    this.storageService.updateWords(updatedWords)
  }

  public delete(id: number) {
    const updatedWords = this.words$.value.filter(el => el.id !== id)
    this.words$.next(updatedWords);
    this.storageService.updateWords(updatedWords)
  }

}
