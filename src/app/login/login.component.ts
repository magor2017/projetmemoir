import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connexion } from '../services/connexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ Connexion ]
})
export class LoginComponent implements OnInit {
 identifiant:string;
 password:string;

  constructor(private route:Router,private connexion:Connexion) { }

  ngOnInit() {
  }
  login(){
    this.connexion.authentification(this.identifiant,this.password).then(response =>{
       // console.log(response._body);
        let data=JSON.parse(response["_body"]);
        if(data.status==1){
           sessionStorage.setItem('id',data.id);
           sessionStorage.setItem('token',data.token);
           sessionStorage.setItem('level',data.level);
           if(data.level=="1"){
             this.route.navigate(['/admin']);
           }
           if(data.level=="2"){
               this.route.navigate(['/etudiant']);
           }
        }else{
          alert("parametre incorrect");
        }
        console.log(data);
    });
	//this.route.navigate(['/admin']);
  }
}
