import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
private header=new Headers();
private link="http://127.0.0.1:8080/getForm";

  constructor(private http:Http) { 
	this.header.append('Content-Type','application/x-www-form-urlencoded');
  }
  getForm(){
    
    return new Promise((resolve,reject)=>{
        let params="param";
        this.http.post(this.link,params,{headers:this.header}).subscribe(res =>{
            resolve(res);
        });
     });
  }
}
