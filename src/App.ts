import { Component } from "./Abstract/Componets";
import { Footer } from "./Common/Footer";
import { Header } from "./Common/Header";
import { Router } from "./Common/Router";
import { AuthPage } from "./Pages/AuthPage";
import { DetailsPage } from "./Pages/DetailsPage";
import { Information } from "./Pages/InformationPage";
import { MainPage } from "./Pages/MainPage";
import { PersonPage } from "./Pages/PersonPage";
import { RegPage } from "./Pages/RegPage";
import { Tours } from "./Pages/ToursPage";
import { DBService } from "./Services/DBService";
import { LogicService } from "./Services/LogicService";
import "./sass/style.scss";

const dbService = new DBService();
const logicService = new LogicService(dbService);

class App {
  constructor(parent: HTMLElement) {
    const wrap = new Component(parent, "div", ["wrapper"]);
    new Header(wrap.root);

    const main = new Component(wrap.root, "main");
    const links = {
      "#": new MainPage(main.root),
      "#tours": new Tours(main.root, logicService),
      "#information": new Information(main.root),
      "#details": new DetailsPage(main.root,  logicService),
      "#reg": new RegPage(main.root,  logicService),
      "#personal": new PersonPage(main.root,  logicService),
      "#auth": new AuthPage(main.root,  logicService)
    };
    new Router(links, logicService);

    new Footer(wrap.root);
  }
}

declare global {
  interface Window {
    app: App;
  }
}

window.app = new App(document.body);
