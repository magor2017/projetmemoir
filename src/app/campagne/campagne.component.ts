import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
//import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-campagne',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.css']
})
export class CampagneComponent implements OnInit {
  nomCampagne:string;
  objectifCampagne:string;
  listeCampagne:any;
  listeBool:boolean=true;
  newCampagneBool:boolean=false;

  constructor(private adminService:AdminService,private route:Router) { }

  ngOnInit() {
    this.adminService.listCampagne().then(rep =>{
      this.listeCampagne=JSON.parse(rep['_body']);
      console.log(this.listeCampagne);
     // console.log(rep);
    });
  }
  newCampagne(){
    if(this.objectifCampagne!="" && this.nomCampagne!=undefined && this.nomCampagne!="" && this.nomCampagne!=undefined){
      this.adminService.newCampagne(this.nomCampagne,this.objectifCampagne).then(reponse =>{
        console.log(reponse);
      });
    }else{
      alert("something is wrong");
    }
  }
  updateCampagne(campagne:any){
    //console.log(campagne);
   // sessionStorage.setItem("campagne",JSON.stringify(campagne));
    sessionStorage.setItem("id",campagne.id);
    this.route.navigate(["/admin","updateCampagne"]);
  }
  resultatCampagne(campagne:any){
    sessionStorage.setItem("id",campagne.id);
    this.route.navigate(["/admin","resultat"]);

  }
  afficheListeCampagne(){
    this.listeBool=true;
    this.newCampagneBool=false;
  }
  affichenewCampagne(){
    this.listeBool=false;
    this.newCampagneBool=true;
  }
  etatCampagne(etat:any){
    let state="";
    switch(etat){
      case 1:{
        state="diffusee";
        break;
      }
      case 0:{
        state="initialisee";
        break;
      }
    }
    return state;

  }
  

}
