import {WordService} from "./word.service";
import {TestBed} from "@angular/core/testing";

describe('тестируем сервис - WordService', () => {
  let service: WordService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordService]
    })

    service = TestBed.inject(WordService)
  })

  it('should create ', () => {
    expect(service).toBeTruthy()
  })

  it('add new word', () => {
    const newWorld = {
      word: 'один',
      translate: 'one',
      id: 1
    }

    service.add(newWorld)
   expect(service.words$.value[0]).toEqual(newWorld)
  })
})
