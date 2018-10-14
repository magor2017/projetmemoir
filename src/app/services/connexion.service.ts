import { Injectable }     from '@angular/core';
import { Router }    from '@angular/router';
import {Http, Headers} from "@angular/http";

@Injectable()
export class Connexion {
private header=new Headers();
constructor(private http:Http){
   this.header.append('Content-Type','application/x-www-form-urlencoded');
}
  authentification(id:string,pass:string){
   console.log("ok");
     let link="http://127.0.0.1:8080/connexion";
     let params="param="+JSON.stringify({identifiant:id,password:pass});
     return new Promise((resolve,reject)=>{
		 this.http.post(link,params,{headers:this.header}).subscribe(res =>{
			 console.log(res);
			 resolve(res);
		 });
     });
  }
}

