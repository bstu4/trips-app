import { Component } from "../Abstract/Componets";
import { TIdentificationResponce, TRegistrationResponse } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";

export class AuthPage extends Component {
    stateUpdate: boolean = false;

    private divFormMobile: Component;
    private divFormCode: Component;
    private divFormExit: Component;

    constructor(parent: HTMLElement, private service: LogicService) {
        super(parent, "div", ["auth_pages"]);
        
        new Component(this.root, 'p', ["authTitle"], "Go TRIPS");
        const div = new Component(this.root, "div", ["titit"]);
        const divAuth = new Component(this.root, "div");
        new Component(div.root, 'p', ["authSubtitle"], "АВТОРИЗАЦИЯ");

        this.divFormMobile = new Component(divAuth.root, "div");
        this.divFormMobile.myRemove();

        const divMobile = new Component(div.root, "div", ['mobile']);
        new Component(divMobile.root, "label", null, "Телефон", ["for"], ["inputAuthMobile"]);
        const inputMobile = new Component(divMobile.root, "input", null, null, ["type", "id"], ["text", "inputAuthMobile"]);

        const divButtonMobile = new Component(div.root, "div");
        const inputButtonMobile = new Component(
            divButtonMobile.root,
            "input", 
            null, 
            null, 
            ["type", "class", "value"], 
            ["button", "buttonAuthMobile", "Подтвердить"]);

        inputButtonMobile.root.onclick = () => {
            (inputButtonMobile.root as HTMLInputElement).disabled = true;
            const mobile = (inputMobile.root as HTMLInputElement).value;
            service.identificationCustomer(mobile);
        };

        this.divFormCode = new Component(divAuth.root, "div", ["authCode"]);
        this.divFormCode.myRemove();

        const pMessage = new Component(this.divFormCode.root, "p", null, "");

        const divCode = new Component(this.divFormCode.root, "div");
        const labelCode = new Component(divCode.root,"label", null, "Код", ['for'], ["inputAuthCode"]);
        const inputCode = new Component(divCode.root, "input", null, null , ["type", "class"], ["text", "inputAuthCode"]);

        const divButtonCode = new Component(this.divFormCode.root, "div");
        const inputButtonCode = new Component(divButtonCode.root, "input", null,null, ["type", "class", "value"],["button", "buttonAuthMobile", "Подтвердить"]);

        this.divFormExit = new Component(divAuth.root, "div", ["exitForm"]);
        this.divFormExit.myRemove();

        const pResultMessage = new Component(this.divFormExit.root, "p", null, "");

        const divButtonExit = new Component(this.divFormExit.root, "div");
        const inputButtonExit = new Component(divButtonExit.root, "input", null, null, ["type", "class", "value"],["button", "buttonAuthMobile", "Выйти"]);

        new Component(div.root, "p", ["registr"], "Не зарегистрированы?");
        const btnReg = new Component(div.root,'button', ["registrButton"], "Регистрация");
        btnReg.root.onclick = () => {
            window.location.hash = "#reg";
        };

        service.addListener("confirm_identification", (responce) => {
            div.myRemove();
            const data = responce as TRegistrationResponse;
            if (Number(data.error.code) == 0) {
                labelCode.myRender();
                inputCode.myRender();
                pMessage.root.innerHTML = data.message;
                (inputButtonCode.root as HTMLInputElement).value = "Подтвердить";
                (inputButtonCode.root as HTMLInputElement).onclick = () => {
                    const code = (inputCode.root as HTMLInputElement).value;
                    service.confirmIdentificationCustomer(data.customerId, code);
                };
            } else {
                labelCode.myRemove();
                inputCode.myRemove();
                pMessage.root.innerHTML = data.error.message;
                (inputButtonCode.root as HTMLInputElement).value = "Повторить";
                (inputButtonCode.root as HTMLInputElement).onclick = () => {
                    this.divFormMobile.myRender();
                    this.divFormCode.myRemove();
                    (inputButtonCode.root as HTMLInputElement).disabled = false;
                };
            }
            this.divFormCode.myRender();
            (inputButtonMobile.root as HTMLInputElement).disabled = false;
        });

        service.addListener("end_identification", (response) => {
            this.divFormCode.myRemove();
            const data = response as TIdentificationResponce;
            if (Number(data.error.code) == 0) {
                pResultMessage.root.innerHTML = data.message;
                (inputButtonExit.root as HTMLInputElement).value = "Личный кабинет";
                (inputButtonExit.root as HTMLInputElement).onclick = () => {
                    console.log("gr");
                    
                    window.location.hash = "#personal";
                };
            } else {
                pResultMessage.root.innerHTML = data.error.message;
                (inputButtonExit.root as HTMLInputElement).value = "Повторить";
                (inputButtonExit.root as HTMLInputElement).onclick = () => {
                    this.divFormCode.myRender();
                    this.divFormExit.myRemove();
                    (inputButtonExit.root as HTMLInputElement).disabled = false;
                };
            }
            this.divFormExit.myRender();
            (inputButtonExit.root as HTMLInputElement).disabled = false;
        })
    }

    renderWithUpdate(): void {
        if (!this.stateUpdate) {
          this.update();
          this.stateUpdate = false;
        }
        this.myRender();
      }
    
      update(): void {
         const userCustomer = this.service.getUserCustomer();
         if (!userCustomer) {
            this.divFormMobile.myRender();
            this.divFormCode.myRemove();
            this.divFormExit.myRemove();
         }
      }
}