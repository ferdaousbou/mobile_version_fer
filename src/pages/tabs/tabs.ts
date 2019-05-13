import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { PayementPage } from "../payement/payement";
import { RemarquePage } from "../remarque/remarque";
import { CommSuiviPage } from "../../pages/comm-suivi/comm-suivi";
import { GeotrackPage } from "../geotrack/geotrack";
import { SignupPage } from "../signup/signup";
import { CinCheckPage } from "../cin-check/cin-check";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = "HomePage";
// tab1Root= GeotrackPage;
  tab2Root = CinCheckPage;
  tab3Root = PayementPage;
  tab4Root = GeotrackPage;
   tab5Root=CommSuiviPage;
  constructor() {}
}
