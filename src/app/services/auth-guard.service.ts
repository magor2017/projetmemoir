import { Injectable }     from '@angular/core';
import { Router,CanActivate }    from '@angular/router';
import { Headers,Http} from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate {
private header=new Headers();
constructor(private route:Router,private http:Http){
   this.header.append('Content-Type','application/x-www-form-urlencoded');
}
  canActivate() {
    console.log('AuthGuard#canActivate called');
    let id=sessionStorage.getItem('id');
    let token=sessionStorage.getItem('token');
    let params="param="+JSON.stringify({id:id,token:token});
    let link="http://127.0.0.1:8080/auth";
    let level=sessionStorage.getItem('level');
   // this.http.post(link,params,{headers:this.header}).subscribe(repons=>{
   // console.log(repons);
        if(level=="2"){
            console.log("ok here");
            return true;
        }else{
            this.route.navigate(['']);
            return false;
        }
        
  //  });
    
  }
}
