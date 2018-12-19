import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from '../services/admin.service';
import { parse } from 'querystring';
//import { runInThisContext } from 'vm';

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
  newForm:any=[];
  newCible:any=[];
  niveau:any=undefined;
  classe:any=undefined;
  tabNiv:any=[];
  tabClass:any=[];
  formTempon:any=undefined;
  listeCible:any=[];
  cibleTempon:any=[];

  constructor(private bsModal:BsModalService,private adminService:AdminService) { }

  ngOnInit() {
   // this.campagne=JSON.parse(sessionStorage.getItem("campagne"));
   let idC=sessionStorage.getItem("id");
   this.adminService.getCampagneById(parseInt(idC)).then(rep =>{
    // console.log(JSON.parse(rep['_body']).formulaire);
     if(rep['status']==200){
        this.campagne=JSON.parse(rep['_body']);
        console.log(this.campagne);
        this.formulaire=JSON.parse(JSON.parse(rep['_body']).formulaire);
       // console.log(this.campagne);
       // console.log(this.formulaire);
     }else{
       this.formulaire=[];
     }
   });
    
  }
  getCampagneById(id:number){

  }
  showModal(template:any){
    this.getFormulaire();
    this.modalreponse=this.bsModal.show(template);
  }
  hideModal(){
    this.modalreponse.hide();
  }
  getFormulaire(){
    this.newForm=[];
    this.adminService.getFormulaire().then(rep =>{
      let forms=JSON.parse(rep['_body']);
      console.log(forms);
      let is=false;
      for(let i=0;i<forms.length;i++){
        for(let j=0;j<this.formulaire.length;j++){
          if(parseInt(forms[i].id)==parseInt(this.formulaire[j].id)){
            is=true;
            break;
          }
        }
        if(is==false){
          this.newForm.push(forms[i]);
        }else{
          is=false;
        }
        
      }
      
      
      console.log(this.newForm);
    });
  }
  ajouterForm(form:any){
    this.formulaire.push(form);
    this.validerAjoutForm(this.formulaire,this.campagne.id);
    console.log(this.formulaire);
  }
  validerAjoutForm(form:any,id:any){
    this.adminService.validerAjoutForm(form,id).then(rep =>{
       console.log(JSON.parse(rep['_body']));
    });

  }
  showModalCible(template:any,form:any){
    this.formTempon=form;
    this.adminService.getAllCible().then(rep =>{
      this.cibleTempon=JSON.parse(rep['_body']);
      console.log(this.cibleTempon);
    });
    this.modalcible=this.bsModal.show(template);
    /*this.adminService.voirCible(this.campagne.id,form.id).then(rep =>{
      this.listeCible=[];
      let cible=JSON.parse(rep['_body']);
      if(cible.length>0){
         let niv=JSON.parse(cible[0].niveau);
         let cl=JSON.parse(cible[0].classe);
        // console.log(niv);
        // console.log(cl);
         for(let i=0;i<niv.length;i++){
             let c={niveau:niv[i],classe:cl[i]};
             this.newCible.push(c);
         }
         console.log(rep);
     }
 });*/
  }
  isClasse(cl:string,niveau){
    let classe=[];
    let tabcl=[];
    let newcl="";
    if(cl==undefined || cl==""){
       return false;
    }
    for(let i=0;i<this.cibleTempon.length;i++){
      console.log(this.cibleTempon[i]);
      if(this.cibleTempon[i].niveau==niveau){
        classe=JSON.parse(this.cibleTempon[i].class);
      }
    }
    tabcl=cl.split(",");
    if(tabcl.length>0){
      for(let k=0;k<tabcl.length;k++){
        if(classe.length>0){
          for(let j=0;j<classe.length;j++){
            if(classe[j]==tabcl[k]){
              if(newcl==""){
                newcl=tabcl[k];
              }else{
                 newcl+=","+tabcl[k];
              }
            }
          }
         // return false;
        }else{
          return false;
        }
      }
      if(newcl!=""){
         this.classe=newcl;
         return true;
      }else{
        return false;
      }
   }
  }
  hideModalCible(){
    this.modalcible.hide();
  }
  inTable(tab:any,el:string){
    for(let i=0;i<tab.length;i++){
      if(tab[i]==el){
        return true;
      }
    }
    return false;
  }
  getIndex(tab:any,el:string){
    for(let i=0;i<tab.length;i++){
      if(tab[i]==el){
        return i;
      }
    }
    return -1;
  }
  ajouterCible(){
    if(this.niveau!="" && this.niveau!=undefined){
      if(this.isClasse(this.classe.toLowerCase(),this.niveau)==true){
      //  console.log(this.tabNiv);
       // console.log(this.niveau);
          if(this.inTable(this.tabNiv,this.niveau.toString())==true){
            let tabclT=this.tabClass[this.getIndex(this.tabNiv,this.niveau)].split(",");
            let clstring="";
            let tabncl=this.classe.split(",");
            if(tabclT.length>0){
              for(let j=0;j<tabncl.length;j++){
                if(this.inTable(tabclT,tabncl[j])==true){

                }else{
                  tabclT.push(tabncl[j]);//094675873
                  let c={niveau:this.niveau,classe:tabclT.join()};
                  for(let z=0;z<this.newCible.length;z++){
                  //  console.log(this.newCible[z].niveau+"--"+this.niveau);
                  //  console.log(tabclT.join());
                    if(this.newCible[z].niveau==this.niveau){
                      this.newCible[z].classe=tabclT.join();
                     // console.log(this.newCible[z].classe);
                    }
                  }
                  console.log(this.newCible);
                  //this.newCible.push(c);
                  this.tabNiv.push(this.niveau);
                  this.tabClass.push(this.classe);
                  this.niveau=undefined;
                  this.classe=undefined;
                }
              }
              //ic
            }else{
            }
          }else{
            let c={niveau:this.niveau,classe:this.classe};
            this.newCible.push(c);
            this.tabNiv.push(this.niveau);
            this.tabClass.push(this.classe);
            this.niveau=undefined;
            this.classe=undefined;
          }
      }else{
        alert("classe incorrecte");
      }
   }
  }
  validerAjoutcible(){
    console.log(this.tabClass);
    console.log(this.tabNiv);
    //this.campagne.id
    this.adminService.validerAjoutCible(this.campagne.id,this.formTempon.id,JSON.stringify(this.tabNiv),JSON.stringify(this.tabClass)).then(rep =>{
        console.log(rep);
    });
  }
  showModalDetail(template:any,f:any){
    this.modaldetail=this.bsModal.show(template);
    this.voirCible(f);
  }
  hideModalDetail(){
    this.modaldetail.hide();
    this.listeCible=[];
  }
  voirCible(f:any){
    console.log(this.campagne.id);
  //  console.log(this.formTempon.id);
    console.log(this.campagne.id);
    this.adminService.voirCible(this.campagne.id,f.id).then(rep =>{
         this.listeCible=[];
         let cible=JSON.parse(rep['_body']);
         if(cible.length>0){
            let niv=JSON.parse(cible[0].niveau);
            let cl=JSON.parse(cible[0].classe);
            console.log(niv);
            console.log(cl);
            for(let i=0;i<niv.length;i++){
                let c={niveau:niv[i],classe:cl[i]};
                this.listeCible.push(c);
            }
            console.log(rep);
        }
    });
  }
  supprimerFormulaire(f:any){
    if(confirm("etes vous sure de vouloir supprimmer ce formulaire ?")){
        console.log(f);
        console.log(this.formulaire);
        let fT=this.formulaire;
        let newf=[]
        for(let i=0;i<this.formulaire.length;i++){
          if(parseInt(this.formulaire[i].id)!=parseInt(f.id)){
              newf.push(this.formulaire[i]);
          }
        }
        this.adminService.supprimerFormulaire(JSON.stringify(newf),parseInt(this.campagne.id)).then(rep =>{
          if(parseInt(rep['status'])==200 && rep['_body']=="ok"){
            console.log(rep['_body']);
            this.formulaire=newf;
          }else{
            console.log(rep);
          }

        });
   }

  }
}
