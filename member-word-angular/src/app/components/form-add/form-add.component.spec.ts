import {FormAddComponent} from "./form-add.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('form-add component', () => {
  let component:FormAddComponent
  let fixture: ComponentFixture<FormAddComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeDefined()
  })

  it('should have two html input', () => {
    const formComponent: HTMLElement = fixture.nativeElement
    const inputList = formComponent.querySelectorAll('input')
    expect(inputList.length).toBe(2)
  })

  it('should have a button', () => {
    const formComponent: HTMLElement = fixture.nativeElement
    const button = formComponent.querySelector('button')
    expect(button).toBeDefined()
  })

  it('should validate form input word', () => {
    const inputWord = component.form.controls['word']
    expect(inputWord.valid).toBeFalse()
    expect(inputWord.errors['required']).toBeTruthy()
  })


  it('should validate form input translate', () => {
    const inputWord = component.form.controls['translate']
    expect(inputWord.valid).toBeFalse()
    expect(inputWord.errors['required']).toBeTruthy()
  })

  it('should reset form after submit', () => {
    component.form.controls['word'].setValue('собака')
    component.form.controls['translate'].setValue('dog')

    component.submit()
    fixture.detectChanges()

    expect(component.form.controls['word'].value).toBe(null)
    expect(component.form.controls['translate'].value).toBe(null)
  })
})
