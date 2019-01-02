import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  private idCampagne:number;
  private campagne:any={nom:""};
  private formulaires:any;
  nbcible:number;
  cibleRestant:number;
  cibleRep:number;
  modaldetail:BsModalRef;
  reponses:any;
  detailQ:any;
  detailquestion:any;
  detailRep=[];
  constructor(private adminService:AdminService,private bsModal:BsModalService) { }

  ngOnInit() {
    this.idCampagne=parseInt(sessionStorage.getItem("id"));
   // console.log(this.idCampagne);
    this.adminService.getCampagneById(this.idCampagne).then(reponse =>{
      this.campagne=JSON.parse(reponse['_body']);
      this.formulaires=JSON.parse(this.campagne.formulaire);
      this.nbcible=parseInt(this.campagne.nbcible);
      this.cibleRestant=parseInt(this.campagne.cibleRestant);
      this.cibleRep=this.nbcible-this.cibleRestant;
      this.reponses=this.getReponse(this.campagne.reponse);
      //console.log(this.campagne);
      console.log(this.campagne.reponse);
     // console.log(this.formulaires);
      this.getMoyenneQuestion(1546094562387,9);
    });
  }
  getnbCibleFormRep(id:number){
    let c=0;
   // console.log();
    for(let i=0;i<this.reponses.length;i++){
     // console.log(id+"--"+this.reponses[i].id);
      if(id==this.reponses[i].id){
        c=this.reponses[i].reponses.length;
      }
    }
    return c;
  }
  getnbCibleFormTotal(id:number){
    let nb=0;
    for(let i=0;i<this.campagne.reponse.length;i++){
      if(id==this.campagne.reponse[i].form){
        nb+=this.campagne.reponse[i].cible;
      }
    }
    return nb;
  }
  getReponse(rep:any){
    let Reponses=[];
    for(let i=0;i<this.formulaires.length;i++){
      let Rep=[];
      for(let j=0;j<rep.length;j++){
        if(parseInt(this.formulaires[i].id)==parseInt(rep[j].form)){
          Rep.push(rep[j].reponse);
        }
      }
      Reponses.push({id:this.formulaires[i].id,reponses:Rep});
    }
    return Reponses;
  }
  getMoyenneQuestion(idQ:number,form:number){
    let rep=[];
    for(let i=0;i<this.reponses.length;i++){
      if(this.reponses[i].id==form){
        rep=this.reponses[i].reponses;
      }
    }
    let notes=0;
    let coef=0;
    for(let j=0;j<rep.length;j++){
      let reponse=JSON.parse(rep[j]);
      for(let k=0;k<reponse.length;k++){
        if(idQ==reponse[k].id){
          notes+=reponse[k].reponse*reponse[k].poid;
          coef+=reponse[k].poid;
        }
     }
    }
    if(coef==0){
      return 0;
    }else{
      //console.log(notes/coef);
      return notes/coef;
    }
  }
  getMoyenneQuestionnaire(id:number){
    let questions=[];
    for(let i=0;i<this.formulaires.length;i++){
      if(parseInt(this.formulaires[i].id)==id){
        questions=JSON.parse(this.formulaires[i].questions);
       // console.log(questions);
      }
    }
    let note=0;
    let coef=0;
    for(let j=0;j<questions.length;j++){
      note+=this.getMoyenneQuestion(questions[j].id,id)*questions[j].poid;
      coef+=questions[j].poid;
     // console.log(note+"---"+coef);
    }
    if(coef==0){
      return 0;
    }else{
      return note/coef;
    }
  }
  getMoyenneCampagne(){
    let note=0;
    let poid=0
    for(let i=0;i<this.formulaires.length;i++){
      note+=this.getMoyenneQuestionnaire(this.formulaires[i].id)*this.formulaires[i].poid;
      poid+=this.formulaires[i].poid;
    }
    if(poid==0){
      return 0;
    }else{
      return Math.ceil(note/poid);
    }

  }
  showModalDetail(template:any,f:any){
    this.modaldetail=this.bsModal.show(template);
    this.detailQ=f;
    this.detailquestion=JSON.parse(f.questions);
    for(let i=0;i<this.detailquestion.length;i++){
     // this.detailRep.push(this.detailquestion.reponses[i].split("#")[0]);
    }
    console.log(this.detailquestion);
  }
  getNbRep(idQ:number,form:any,note:number){
    let nbrep=0;
    let rep=[];
    for(let i=0;i<this.reponses.length;i++){
      if(this.reponses[i].id==form){
        rep=this.reponses[i].reponses;
      }
    }
    
    for(let j=0;j<rep.length;j++){
      let reponse=JSON.parse(rep[j]);
      for(let k=0;k<reponse.length;k++){
        if(idQ==reponse[k].id && reponse[k].reponse==note){
          nbrep++;
        }
     }
    }
    return nbrep;
  }
  getNbRepTotal(idQ:number,form:any,note:number){
    let nbrep=0;
    let rep=[];
    for(let i=0;i<this.reponses.length;i++){
      if(this.reponses[i].id==form){
        rep=this.reponses[i].reponses;
      }
    }
    
    for(let j=0;j<rep.length;j++){
      let reponse=JSON.parse(rep[j]);
      for(let k=0;k<reponse.length;k++){
        if(idQ==reponse[k].id){
          nbrep++;
        }
     }
    }
    return nbrep;
  }
  hideModalDetail(){
    this.modaldetail.hide();
  }

}
