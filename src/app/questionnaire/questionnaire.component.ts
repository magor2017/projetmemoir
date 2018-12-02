import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent implements OnInit {
 /*class Question{
   type:number;
   question:string;
   typeInput:number=0;
   reponses:[];
   setType(type:number){
      this.type=type;
   }
   getType(){
     return this.type;
   }
 };*/
 form:string;
 type_question_fermer:string;
 ouverte:boolean=false;
 fermer:boolean=false;
 nbReponse:number=2;
 label:string;
 question:string;
 poid:number=1;
 titre:string="";
 errorTitre:boolean=false;
 //questions:{type:0,question:'',reponses:[],typeInput:0};
 formulaire={titre:this.titre,questions:[]};
// @ViewChild('mag') private ele:ElementRef;
  constructor(private adminservice:AdminService){}

  ngOnInit() {
    //console.log(this.ele);
  }
  chargerForm(){
	//alert(this.form);
	switch(this.form){
		case "2":{
			 this.ouverte=true;
			 this.fermer=false;
			 break;
		}
		case "1":{
			 this.ouverte=false;
			 this.fermer=true;
			 break;
		}
	}
  }
  ajouter(){
   let reps=[];
   let name=0;
    switch(this.form){
    case "2":{
    //question ouverte
      let div=document.createElement('div');
      div.setAttribute('class','form-group');
      let label=document.createElement('label');
      label.textContent=this.label;
      div.appendChild(label);
      let el=document.createElement('input');
      el.setAttribute('type','text');
      el.setAttribute('class','form-control');
      div.appendChild(el);
      document.getElementById('rasta').appendChild(div); 
     // this.tabF.push({label:label,input:el});
     break;
     }
    case "1":{
    //question fermée
		switch(this.type_question_fermer){
		  case "1":{
			let div=document.createElement('div');
			div.setAttribute('class','form-group');
			let label=document.createElement('label');
            label.textContent=this.question;
            div.appendChild(label);
            name=Date.now();
            let select=document.createElement('select');
            select.setAttribute('id',name.toString());
            select.setAttribute('class','form-control');
            let tabRep=[];
            for(let i=1;i<=this.nbReponse;i++){
				let option=document.createElement('option');
				try{
				   option.textContent=(<HTMLInputElement>document.getElementById('reponse'+i)).value;
				}catch(e){
				   console.log(e);
				}
				//tabReq.push(document.getElementById('reponse'+i).value);
				try{
				    reps.push((<HTMLInputElement>document.getElementById('reponse'+i)).value);
				}catch(e){
					console.log(e);
				}
		        select.appendChild(option);	
            }
            div.appendChild(select);
           // let question={type:"1",type_element:"1",nb_rep:this.nbReponse,tabValue:tabReq};
			document.getElementById('rasta').appendChild(div); 
		  
			break;
		  
		  }
		  case "2" :{
		    let div1=document.createElement('div');
			div1.setAttribute('class','form-group');
			let label=document.createElement('label');
            label.textContent=this.question;
            name=Date.now();
            div1.appendChild(label);
           // let select=document.createElement('select');
            //select.setAttribute('class','form-control');
            for(let i=1;i<=this.nbReponse;i++){
                let div2=document.createElement('div');
                div2.setAttribute('class','form-group');
				let radio=document.createElement('input');
				radio.setAttribute('type','radio');
				
				radio.setAttribute('name',name.toString());
				try{
				   radio.textContent=(<HTMLInputElement>document.getElementById('reponse'+i)).value;
				}catch(e){
				  console.log(e);
				}
				div2.appendChild(radio);
				let lab=document.createElement('label');
				//lab.textContent=document.getElementById('reponse'+i).value;
				 try{
				     //lab.textContent=document.getElementById('reponse'+i).value;
				     reps.push((<HTMLInputElement>document.getElementById('reponse'+i)).value);
				  }catch(e){
				     console.log(e);
				  }
				div2.appendChild(lab);
				div1.appendChild(div2);	
            }
           // div.appendChild(select);
			document.getElementById('rasta').appendChild(div1); 
			
			break;
		  
		  }
			
		}
       break;
    }
    }
    let question={type:this.form,question:this.question,reponses:reps,typeInput:this.type_question_fermer,poid:this.poid,name:name,id:name};
    this.formulaire.questions.push(question);
    console.log(question);
    console.log(this.formulaire);

  }
  choisirTypeQuestion(){
     
  
  }
  ajouterReponse(){
	  let div=document.createElement('div');
      div.setAttribute('class','form-group');
      let label=document.createElement('label');
      this.nbReponse++;
      label.textContent="Reponse "+this.nbReponse;
      div.appendChild(label);
      let el=document.createElement('input');
      el.setAttribute('type','text');
      el.setAttribute('class','form-control');
      el.setAttribute('id','reponse'+this.nbReponse);
      div.appendChild(el);
      document.getElementById('newRep').appendChild(div); 
  
  }
  enregistrer_form(){
	if(this.titre!=undefined && this.titre!="" && this.formulaire.questions.length>0){
	     console.log("nice");
	     this.formulaire.titre=this.titre;
	     this.adminservice.newFormulaire(this.titre,this.formulaire.questions).then(reponse =>{
	           alert(reponse);
	     });
	     console.log(this.formulaire);
	}else{
	   if(this.titre==undefined || this.titre==""){
	      this.errorTitre=true;
	   }
		console.log("not nice");
	}
  }
  reinitilise_errorTitre(){
    this.errorTitre=false;
  }

}
