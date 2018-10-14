import  { RouterModule, Routes} from '@angular/router' ;
import { AuthGuard } from './services/auth-guard.service';

import { AdminComponent } from './admin/admin.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

const appRoutes: Routes =[
           { path :'',component:LoginComponent},
           { path:'admin',component:AdminComponent,
               children:[
							
							{path : 'questionnaire',component:QuestionnaireComponent}
               ]
               },
           { path :'login',component:LoginComponent},
           { path :'etudiant',component:EtudiantComponent,canActivate:[AuthGuard],
                   children:[
                              {path:'',component:FormulaireComponent}
                            ]
                  },
           { path :'**',redirectTo:''},
           
];

export const Routing = RouterModule.forRoot(appRoutes);
