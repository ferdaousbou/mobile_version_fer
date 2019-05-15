import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CondidatProvider } from '../../providers/condidat/condidat';
import { MoniteurProvider } from '../../providers/moniteur/moniteur';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-cin-check',
  templateUrl: 'cin-check.html',
})
export class CinCheckPage {
   condidats :any  ;
   moniteurs :any  ;
   cin : any ;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public CondidatProvider : CondidatProvider , public MoniteurProvider:MoniteurProvider ) {
  
  }

 
  checkCin():any {
console.log(this.cin);    
if(this.cin==undefined)
{ let alert=this.alertCtrl.create({
    title: ' Missing infos!',
    buttons: [{
        text: 'OK',
        role: 'confirm' },
        
    ]
});
alert.present();
}
else {
  
  this.CondidatProvider.getListCondidat().then(
    (condidats: any) => {
      this.condidats=condidats ;
      let index = this.condidats.findIndex(item => item.cin ==this.cin) ;
  if(index!=-1){
    let object = {
      genre : 'condidat' ,
      item : this.condidats[index]
    }
      this.navCtrl.push(SignupPage ,{object :object});
          
   //console.log( this.condidats[index]);
  }else {
    this.MoniteurProvider.getListMoniteur().then(
      (moniteurs: any) => {
        this.moniteurs=moniteurs ;
        console.log(this.moniteurs);

        let index = this.moniteurs.findIndex(item => item.cin ==this.cin) ;
    if(index!=-1){
      let object = {
        genre : 'moniteur' ,
        item : this.moniteurs[index]
      }
      this.navCtrl.push(SignupPage ,{object :object});

     //console.log( this.moniteurs[index]);
    }
      }
    );
    
  }
    }
  );

   
}
}
  ionViewDidLoad() {
    console.log(this.condidats);
  }


}
