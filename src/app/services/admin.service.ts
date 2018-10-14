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
}
