import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { GameComponent } from './components/game/game.component';
import { VersusBarComponent } from './components/versus-bar/versus-bar.component';
import { MatchMakingComponent } from './components/match-making/match-making.component';
import { QueueSelectorComponent } from './components/queue-selector/queue-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    VersusBarComponent,
    MainComponent,
    VersusBarComponent,
    MatchMakingComponent,
    QueueSelectorComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
