
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CinCheckPage } from '../../pages/cin-check/cin-check';
import { GeotrackPage } from '../geotrack/geotrack';
import { PasswordcinPage } from '../passwordcin/passwordcin';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(public navCtrl: NavController) {
  }
create_password(){
  this.navCtrl.push(PasswordcinPage);
}
  login(){
  this.navCtrl.push(LoginPage);
  }

 /* signup(){
  this.navCtrl.push(CinCheckPage);
  }
  geotrack(){
    this.navCtrl.push(GeotrackPage);
  }*/
}