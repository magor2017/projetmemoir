import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule} from '@angular/forms' ;
import { AuthGuard } from './services/auth-guard.service';
import { Connexion } from './services/connexion.service';
import { AdminService } from './services/admin.service';
import { EtudiantService } from './services/etudiant.service';
import { HttpModule} from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';

/********MyComponent*******/

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

/******routing******/
import { Routing }        from './app.routing';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    QuestionnaireComponent,
    EtudiantComponent,
    FormulaireComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [AuthGuard,Connexion,AdminService,EtudiantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
