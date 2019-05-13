import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { GeotrackPage } from "../geotrack/geotrack";
import { CinCheckPage } from "../cin-check/cin-check";

@Component({
  selector: "page-tabs1",
  templateUrl: "tabs1.html"
})
export class Tabs1Page {
  tab1Root = "Home1Page";
    tab2Root = CinCheckPage;
    tab3Root = ContactPage;
    tab4Root = GeotrackPage;
     tab5Root=AboutPage;

  constructor() {}
}
