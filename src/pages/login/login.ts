import { TabsPage } from '../tabs/tabs';
import { Tabs1Page } from '../tabs1/tabs1';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Item } from 'ionic-angular';
import { CondidatProvider } from '../../providers/condidat/condidat';
import { MoniteurProvider } from '../../providers/moniteur/moniteur';
import { WelcomePage } from '../welcome/welcome';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  condidats :any  ;
  moniteurs :any  ;
  checkcin : any;
  cin : any ;
  password : any;
  constructor( private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public CondidatProvider : CondidatProvider , public MoniteurProvider:MoniteurProvider ) {
  
    }
  checkcin_pass( cin : any ,password : any) {
  
        console.log(this.cin);
        console.log(this.password);
  
        if(( this.password==undefined || this.password=="")||(this.cin==undefined||this.cin=="")) {
          let alert=this.alertCtrl.create({
            title: ' Missing infos!',
            buttons: [{
                text: 'OK',
                role: 'confirm' },
                
            ]
        });
        alert.present();
        }
    else 
    {
  
      this.CondidatProvider.getListCondidat().then(
        (condidats: any) => {
          this.condidats=condidats ;
  
          let index = this.condidats.findIndex(item => item.cin ==this.cin) ;
          let index1 =this.condidats.findIndex(Item=>Item.password==this.password);
      if(index!=-1 &&index1!=-1){
          this.CondidatProvider.setCondidatCourant(index) ;
          this.navCtrl.push(Tabs1Page);
  
      }
     else
      {
        this.MoniteurProvider.getListMoniteur().then(
          (moniteurs: any) => {
            this.moniteurs=moniteurs ;
    
            let index = this.moniteurs.findIndex(item => item.cin ==this.cin) ;
            let index1 =this.moniteurs.findIndex(Item=>Item.password==this.password);
        if(index!=-1 &&index1!=-1){
            this.MoniteurProvider.setMoniteurCourant(index) ;
            this.navCtrl.push(TabsPage);
  
      }
      else {
        let alert=this.alertCtrl.create({
          title: ' wrong infos!',
          buttons: [{
              text: 'OK',
              role: 'confirm' },
              
          ]
      });
      alert.present();
      
      }
    });}});}}}
  