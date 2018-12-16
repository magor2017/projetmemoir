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
    sessionStorage.setItem("campagne",JSON.stringify(campagne));
    this.route.navigate(["/admin","updateCampagne"]);
  }
  

}
