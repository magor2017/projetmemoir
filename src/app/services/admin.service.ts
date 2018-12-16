import { Injectable } from '@angular/core';
import { Headers,Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private header=new Headers();
  private link="http://127.0.0.1:8080";
  constructor(private http:Http) {
      this.header.append('Content-Type','application/x-www-form-urlencoded');
   }
   
   newFormulaire(titre:string,questions:any){
     let params="param="+JSON.stringify({titre:titre,question:JSON.stringify(questions)});
     let lien=this.link+"/newFormulaire";
     return new Promise((resolve,reject)=>{
         this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
            resolve(response);
         });
     
     });
   }
   newCampagne(nom:string,objectif:string){
      let params="param="+JSON.stringify({nom:nom,objectif:objectif});
      let lien=this.link+"/newCampagne";
      return new Promise((resolve,reject)=>{
        this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
           resolve(response);
        });
    
    });
   }
   listCampagne(){
    let params="param=";
    let lien=this.link+"/listeCampagne";
    return new Promise((resolve,reject)=>{
      this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
         resolve(response);
      });
    });
   }
   affectation(){
     let params="";
     let lien=this.link+"/affecterForm";
     return new Promise((resolve,reject)=>{
      this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
         resolve(response);
      });
    });
   }
   getFormulaire(){
    let params="";
    let lien=this.link+"/getForm";
    return new Promise((resolve,reject)=>{
     this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
        resolve(response);
     });
   });
  }
  validerAjoutForm(form:any,id:any){
    let params="param="+JSON.stringify({form:JSON.stringify(form),id:id});
    let lien=this.link+"/validerAjoutForm";
    return new Promise((resolve,reject)=>{
     this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
        resolve(response);
     });
   });
  }
  getAllCible(){
    let params="param=";
    let lien=this.link+"/getAllCible";
    return new Promise((resolve,reject)=>{
     this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
        resolve(response);
     });
   });

  }
  validerAjoutCible(campagne:any,form:any,niveau:any,classe:any){
    let params="param="+JSON.stringify({campagne:campagne,form:form,niveau:niveau,classe:classe});
    let lien=this.link+"/validerAjoutCible";
    return new Promise((resolve,reject)=>{
     this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
        resolve(response);
     });
   });
  }
  voirCible(campagne:any,form:any){
    let params="param="+JSON.stringify({campagne:campagne,form:form});
    let lien=this.link+"/validerAjoutCible";
    return new Promise((resolve,reject)=>{
     this.http.post(lien,params,{headers:this.header}).subscribe(response =>{
        resolve(response);
     });
   });

  }
}
