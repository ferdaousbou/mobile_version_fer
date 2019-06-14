import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import * as firebase from "firebase";
import { WelcomePage } from "../pages/welcome/welcome";
import { PayementPage } from "../pages/payement/payement";
import { LoginPage } from "../pages/login/login";
import { MenuPage } from "../pages/menu/menu";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage:any= WelcomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      const config = {
        apiKey: "AIzaSyDFPHayZZMwecMMv9FKrbiDD5gwSRT4MME",
  authDomain: "auto-ecole-632d4-restore.firebaseapp.com",
  databaseURL: "https://auto-ecole-632d4-restore.firebaseio.com",
  projectId: "auto-ecole-632d4-restore",
  storageBucket: "auto-ecole-632d4-restore.appspot.com",
  messagingSenderId: "344148904685",
  appId: "1:344148904685:web:091d548470f72dfe"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
