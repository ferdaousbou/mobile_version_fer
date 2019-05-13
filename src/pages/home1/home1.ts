import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import * as $ from "jquery";
import { AjouterHeurePage } from "../ajouter-heure/ajouter-heure";
import { GeneralProvider } from "../../providers/general/general";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { RemarquePage } from "../remarque/remarque";
import { CommPage } from "../comm/comm";
import { WelcomePage } from "../welcome/welcome";

@IonicPage()
@Component({
  selector: "page-home1",
  templateUrl: "home1.html"
})
export class Home1Page {
  calendarOptions: any;
  events: any;
  CondidatC;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public CondidatProvider: CondidatProvider,
    public navParams: NavParams,
    public general: GeneralProvider
  ) {
    this.CondidatC = this.CondidatProvider.getCondidatCourant();
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
        this.navCtrl.push(CommPage, {
          event: event
        });
      },
      dayClick: (date, jsEvent, view, resourceObj) => {},
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
          word => word.condidat + "" == this.CondidatC + ""
        );
        console.log(result);

        this.calendarOptions.events = result;

        console.log(result);
        $("#myCalendar").fullCalendar("renderEvents", result, true);
      }
    });
  }
}