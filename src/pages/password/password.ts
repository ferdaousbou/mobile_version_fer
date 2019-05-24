import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import * as firebase from "firebase";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { AlertController } from "ionic-angular";
import { Tabs1Page } from "../tabs1/tabs1";
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})

export class PasswordPage {
  object: any;
  password: any;
  fileIsUploading = false;
  fileUploaded = false;
  moniteurs: any;
  condidats: any
  //passwordType: string ='password';

  //@ViewChild('password')password:ElementRef;
 // passwordShown: boolean =false;
  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public CondidatProvider: CondidatProvider,
    public MoniteurProvider: MoniteurProvider
  )
   {
    this.object = this.navParams.get("object");
    console.log(this.object);

    if (this.object.item.password == undefined) {
      this.password = "";
    } else {
      this.password = this.object.item.password;
    }  }
/*togglepassword(){
  if(this.passwordShown){
    this.passwordShown = false;
    this.passwordType ='password';
  }else{
    this.passwordShown = true;
    this.passwordType ='password';
  }
}*/
  ionViewDidLoad() {
    console.log("ionViewDidLoad Signup");
   
    }
  
  signup() {
     if (this.password == undefined || this.password == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your password!',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else {
      this.savedata();
    }
    //Api connections
  }

  savedata() {
    if (this.object.genre == "condidat") {
      this.CondidatProvider.getListCondidat().then((condidats: any) => {
        this.condidats = condidats;
        console.log(this.condidats);

        let index = this.condidats.findIndex(
          item => item.cin == this.object.item.cin
        );

        
        this.condidats[index].password = this.password;
        firebase
          .database()
          .ref("/condidats")
          .set(this.condidats);

        console.log("moniteur");
        this.CondidatProvider.setCondidatCourant(index);
        this.navCtrl.push(Tabs1Page);
      });
    } else {
      this.MoniteurProvider.getListMoniteur().then((moniteurs: any) => {
        this.moniteurs = moniteurs;
        console.log(this.moniteurs);

        let index = this.moniteurs.findIndex(
          item => item.cin == this.object.item.cin
        );
        if (index != -1) {
          this.moniteurs[index].password = this.password;
          firebase
            .database()
            .ref("/moniteurs")
            .set(this.moniteurs);

          console.log("condidat");
          this.MoniteurProvider.setMoniteurCourant(index);

          this.navCtrl.push(TabsPage);

          //console.log( this.moniteurs[index]);
        }
      });
    }
  }

 

}

