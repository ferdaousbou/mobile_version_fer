import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { GeneralProvider } from "../../providers/general/general";
import * as firebase from "firebase";
import * as moment from "moment";
import { TabsPage } from "../tabs/tabs";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
@Component({
  selector: "page-remarque",
  templateUrl: "remarque.html"
})
export class RemarquePage {
  item: any;
  remarque: any;
  remarques: any;
  hours: any;
  date: any;
  gender: any;
  moniteurs: Array<any> = [];
  start: any;
  end: any;
  hour:any;
  
  moniteurC;
  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public general: GeneralProvider,
    public condidat: CondidatProvider,
    public MoniteurProvider: MoniteurProvider
  ) {
    this.item = this.navParams.get("event");
    console.log(this.item);
  }

  validate() {
    if (this.remarque==undefined||this.remarque=="")
    { let alert=this.alertCtrl.create({
      title: ' Enter your notes!',
      buttons: [{
          text: 'OK',
          role: 'confirm' },
          
      ]
  });
  alert.present();}
  else {
    let object = {
      start: moment(this.item.start).format("DD-MM-YYYY-HH:mm"),
      end: moment(this.item.end).format("DD-MM-YYYY-HH:mm"),
      moniteur: this.item.moniteur,
      condidat: this.item.condidat,
      remarque: this.remarque
    };
    console.log(object);
    this.general.getListCommantaires().then(data => {
      this.remarques = data as Array<any>;
      console.log(this.remarques);
      if (this.remarques === null) {
        this.remarques = [];
      } else {
        this.remarques = data as Array<any>;
      }
      this.remarques.push(object);
      console.log(this.remarques);

      firebase
        .database()
        .ref("/remarques")
        .set(this.remarques);
    });
    this.navCtrl.pop();
  }}
  Suppheure(){
  let  hour = this.hours;
    this.general.getListHours().then(data => {
      this.hours = data;
      if (this.hours === null) {
        this.hours = [];
      } else {
        this.hours = data;
      }
      this.hours.remove(hour);
      firebase
        .database()
        .ref("/heurs")
        .set(this.hours);
      this.navCtrl.setRoot(TabsPage);
    });
  }
}
