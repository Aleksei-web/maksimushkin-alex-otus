import {WordListComponent} from "./word-list.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('wordListComponent', () => {
  let component: WordListComponent
  let fixture: ComponentFixture<WordListComponent>
  const wordList = [{word: 'один', translate: 'one', id: 1}]


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordListComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WordListComponent)
    component = fixture.componentInstance
    component.wordList = wordList
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an input', () => {
    expect(component.wordList).toEqual(wordList)
  })

  it('should have html button with text - удалить', () => {
    const wordListComponent: HTMLElement = fixture.nativeElement
    const button = wordListComponent.querySelector('button')
    expect(button.textContent).toEqual('удалить')
  })

  it('should have a div with class word-container', () => {
    const wordListComponent: HTMLElement = fixture.nativeElement
    const container = wordListComponent.querySelector('.word')
    expect(container).toBeDefined()
  })

  it('should have a div with class word', () => {
    const wordListComponent: HTMLElement = fixture.nativeElement
    const div = wordListComponent.querySelector('.word')
    expect(div).toBeDefined()
  })
})
