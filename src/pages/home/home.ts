import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import * as $ from "jquery";
import { AjouterHeurePage } from "../ajouter-heure/ajouter-heure";
import { GeneralProvider } from "../../providers/general/general";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { RemarquePage } from "../remarque/remarque";
import { CinCheckPage } from "../cin-check/cin-check";
import { GeotrackPage } from "../geotrack/geotrack";
import { WelcomePage } from "../welcome/welcome";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  calendarOptions: any;
  events: any;
  moniteurC;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public MoniteurProvider: MoniteurProvider,
    public navParams: NavParams,
    public general: GeneralProvider
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();
  }
 profile(){
  this.navCtrl.push(CinCheckPage);
 }
 geotrack(){
  this.navCtrl.push(GeotrackPage);
 }
 logout(){
  let alert=this.alertCtrl.create({
    title: ' are you sure you want to logout?',
   // subTitle: 'this button turns on or off all the lights in your home ',
    buttons: [{
        text: 'cancel',
        role: 'cancel' },
        { 
            text: 'continue',
           handler: ()=> {
      this.navCtrl.push(WelcomePage);
           }
        }
    ]
});
alert.present();
 }
  ngAfterViewInit() {
    this.calendarOptions = {
      header: {
        left: "title",
       // right: "month,agendaWeek,agendaDay,agendaFourDay,"
      },
      footer: {
       // right: "today prev,next"
      },
      views: {
        agendaFourDay: {
          type: "listYear",
          buttonText: "All"
        }
      },
      // theme:'jquery-ui',
      height: "parent",
      fixedWeekCount: false,
      defaultDate: Date(),
      editable: true,
      allDay: true,
      eventClick: event => {
        this.navCtrl.push(RemarquePage, {
          event: event
        });
      },
      dayClick: (date, jsEvent, view, resourceObj) => {
        this.navCtrl.push(AjouterHeurePage, {
          date: date.format()
        });
      },
      eventLimit: true // allow "more" link when too many events
    };
    this.general.getListHours().then(data => {
      this.events = data;
      if (this.events === null) {
        this.events = [];
        this.calendarOptions.events = [];

        $("#myCalendar").fullCalendar("renderEvents", this.events, true);
      } else {
        const result = this.events.filter(
          word => word.moniteur + "" == this.moniteurC
        );

        this.calendarOptions.events = result;

        console.log(result);
        $("#myCalendar").fullCalendar("renderEvents", result, true);
      }
    });
  }
}
