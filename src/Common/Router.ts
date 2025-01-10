import { Page } from "../Abstract/Inteface";
import { DetailsPage } from "../Pages/DetailsPage";
import { LogicService } from "../Services/LogicService";

export class Router {
  constructor(public links: Record<string, Page>, private service: LogicService) {
    window.onhashchange = () => {
      this.openPage();
    };

    this.openPage();
  }

  openPage(): void {
    Object.values(this.links).forEach((el) => el.myRemove());

    const url = window.location.hash.slice(1);

    const isUserCustomer = this.service.getUserCustomer();
    switch (url) {
      case "tours": 
        this.links["#tours"].renderWithUpdate();
        break;
      case "auth": 
        if(!isUserCustomer) {
          this.links["#auth"].renderWithUpdate();
        } else {
          window.location.hash = "#personal";
        }
        break;
      case "personal":
        if(isUserCustomer) {
          this.links["#personal"].renderWithUpdate();
        } else {
          window.location.hash = "#auth";
        }
        break;
      case "reg":
        if(!isUserCustomer) {
          this.links["#reg"].renderWithUpdate();
        } else {
          window.location.hash = "#personal";
        }
        break;
      case "details":
        if((this.links["#details"] as DetailsPage).isGoodInDetailsPage()) {
          this.links["#details"].renderWithUpdate();
        } else {
          window.location.hash = "#magazine";
        }
        break;
      case "information":
        this.links["#information"].renderWithUpdate();
        break;
      default:
        this.links["#"].renderWithUpdate();
        break;
    }
  }
}

    
