import { Component } from "../Abstract/Componets";
import { LogicService } from "../Services/LogicService";

export class PersonPage extends Component {
    stateUpdate: boolean = false;

    private spanName: Component;
    private spanEmail: Component;
    private spanMobileNumber: Component;
    private spanMobileOperator: Component;
    private spanAdress: Component;

    constructor(parent: HTMLElement, private service: LogicService) {
        super(parent, "div", ["persona_pages"]);

        new Component(this.root, "p", null, "Личный кабинет");


        const divPersonal = new Component(this.root, "div", ["infoPages"]);

        const divName = new Component(divPersonal.root, "div");
        new Component(divName.root, "span", null, "Имя: ");
        this.spanName = new Component(divName.root, 'span', null, "");
        
        const divEmail = new Component(divPersonal.root, "div");
        new Component(divEmail.root, "span", null, "email: ");
        this.spanEmail = new Component(divEmail.root, "span", null, "");

        const divMobile = new Component(divPersonal.root, "div");
        new Component(divMobile.root, "span", null, "Телефон: ");
        this.spanMobileNumber = new Component(divMobile.root, "span", null, "");
        this.spanMobileOperator = new Component(divMobile.root, 'span', null , "");

        const divAdress = new Component(divPersonal.root, "div");
        new Component(divAdress.root, "span", null, "Адресс: ");
        this.spanAdress = new Component(divAdress.root, "span", null, "");
    }

    renderWithUpdate(): void {
        if (!this.stateUpdate) {
          this.update();
          this.stateUpdate = true;
        }
        this.myRender();
      }

      update(): void {
        const userCustomer = this.service.getUserCustomer();
        console.log(userCustomer);
        
        if (userCustomer) {
            this.spanName.root.innerHTML = userCustomer.name;
            this.spanEmail.root.innerHTML = userCustomer.email;
            this.spanMobileNumber.root.innerHTML = userCustomer.mobile;
            this.spanMobileOperator.root.innerHTML = `(${userCustomer.operatorType})`;
            this.spanAdress.root.innerHTML = userCustomer.adress;
        }
      }
}