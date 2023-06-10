import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GoComponent } from './pages/go/go.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { FormAddComponent } from './components/form-add/form-add.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoComponent,
    SettingsComponent,
    NavigationComponent,
    WordListComponent,
    FormAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
