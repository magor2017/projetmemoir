import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-update-campagne',
  templateUrl: './update-campagne.component.html',
  styleUrls: ['./update-campagne.component.css']
})
export class UpdateCampagneComponent implements OnInit {
  campagne:any;
  formulaire:any=[];
  form:boolean=true;
  modalreponse:BsModalRef;
  modalcible:BsModalRef;
  modaldetail:BsModalRef;
  newForm:any;
  newCible:any=[];
  niveau:any=undefined;
  classe:any=undefined;
  tabNiv:any=[];
  tabClass:any=[];
  formTempon:any=undefined;

  constructor(private bsModal:BsModalService,private adminService:AdminService) { }

  ngOnInit() {
    this.campagne=JSON.parse(sessionStorage.getItem("campagne"));
    this.formulaire=JSON.parse(this.campagne.formulaire);
    console.log(this.campagne);
    console.log(this.formulaire);
  }
  showModal(template:any){
    this.getFormulaire();
    this.modalreponse=this.bsModal.show(template);
  }
  hideModal(){
    this.modalreponse.hide();
  }
  getFormulaire(){
    this.adminService.getFormulaire().then(rep =>{
      this.newForm=JSON.parse(rep['_body']);
      
     // console.log(newForm);
    });
  }
  ajouterForm(form:any){
    this.formulaire.push(form);
    this.validerAjoutForm(this.formulaire,this.campagne.id);
    console.log(form);
  }
  validerAjoutForm(form:any,id:any){
    this.adminService.validerAjoutForm(form,id).then(rep =>{
       console.log(rep);
    });

  }
  showModalCible(template:any,form:any){
    this.formTempon=form;
    this.adminService.getAllCible().then(rep =>{
      console.log(rep);
    });
    this.modalcible=this.bsModal.show(template);
  }
  hideModalCible(){
    this.modalcible.hide();
  }
  ajouterCible(){
    let c={niveau:this.niveau,classe:this.classe};
    this.newCible.push(c);
    this.tabNiv.push(this.niveau);
    this.tabClass.push(this.classe);
    this.niveau=undefined;
    this.classe=undefined;
  }
  validerAjoutcible(){
    console.log(this.tabClass);
    console.log(this.tabNiv);
    //this.campagne.id
    this.adminService.validerAjoutCible(this.campagne.id,this.formTempon.id,JSON.stringify(this.tabNiv),JSON.stringify(this.tabClass)).then(rep =>{
        console.log(rep);
    });
  }
  showModalDetail(template:any){
    this.modaldetail=this.bsModal.show(template);
  }
  voirCible(){
    this.adminService.voirCible(this.campagne.id,this.formTempon.id).then(rep =>{
         console.log(rep);
    });
  }
}
