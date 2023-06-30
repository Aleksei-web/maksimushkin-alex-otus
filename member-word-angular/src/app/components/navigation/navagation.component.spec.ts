import {NavigationComponent} from "./navigation.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppRoutingModule} from "../../app-routing.module";

describe('navigation component', () => {
  let component: NavigationComponent
  let fixture: ComponentFixture<NavigationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [AppRoutingModule]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })


  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have home link', () => {
    const linkList = fixture.nativeElement.querySelectorAll('a')
    let hasHome = false
    linkList.forEach((el: { innerText: string; }) => {
      if(el.innerText.includes('HOME')){
        hasHome = true
      }
    })
    expect(hasHome).toBeTruthy()
  })

  it('should have go link', () => {
    const linkList = fixture.nativeElement.querySelectorAll('a')
    let hasGo = false
    linkList.forEach((el: { innerText: string; }) => {
      if(el.innerText.includes('GO')){
        hasGo = true
      }
    })
    expect(hasGo).toBeTruthy()
  })

  it('should have Settings link', () => {
    const linkSettings = fixture.nativeElement.querySelectorAll('a')
    let hasSettings = false
    linkSettings.forEach((el: { innerText: string; }) => {
      if(el.innerText.includes('SETTINGS')){
        hasSettings = true
      }
    })
    expect(hasSettings).toBeTruthy()
  })
})
