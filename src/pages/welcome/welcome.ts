
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
    this.tabBarElement = <HTMLElement>(
      document.querySelector('.tabbar.show-tabbar')
    );
  }
create_password(){
  this.navCtrl.push(PasswordcinPage);
}
  login(){
  this.navCtrl.push(LoginPage);
  }
  tabBarElement: HTMLElement;


  ionViewWillEnter() {
    if (this.tabBarElement !== null) {
      this.tabBarElement.style.opacity = '0';
      this.tabBarElement.style.pointerEvents = 'none';
    }
  }
}