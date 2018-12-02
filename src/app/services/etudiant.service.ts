import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
private header=new Headers();
private link="http://127.0.0.1:8080";
private id=sessionStorage.getItem("id");
private token=sessionStorage.getItem("token");

  constructor(private http:Http) { 
	this.header.append('Content-Type','application/x-www-form-urlencoded');
  }
  getForm(){
    
    return new Promise((resolve,reject)=>{
        let params="param";
        let url=this.link+"/getForm";
        this.http.post(url,params,{headers:this.header}).subscribe(res =>{
            resolve(res);
        });
     });
  }
  validerReponse(reponse:any,idForm:number){
    let params="param="+JSON.stringify({token:this.token,id:this.id,reponse:reponse,idForm:idForm});
    let url=this.link+"/validerReponse";
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(res =>{
        resolve(res);
      });
   });
  }
}
