import {WordService} from "./word.service";
import {TestBed} from "@angular/core/testing";
import {StorageService} from "./storage.service";

describe('тестируем сервис - WordService', () => {
  let service: StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    })

    service = TestBed.inject(StorageService)
  })

  it('should create ', () => {
    expect(service).toBeTruthy()
  })

  it('should add new word', () => {
    const newWorld = {
      word: 'кот',
      translate: 'kat',
      id: 1
    }

    service.updateWords([newWorld])
   expect(service.getWords()[0]).toEqual(newWorld)
  })
})
