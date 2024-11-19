import { Component } from "../Abstract/Componets";
import { TTypeGood, TTypesGoods } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";

export class ButtonTypeGood extends Component {
    constructor(parent: HTMLElement, private service: LogicService, private typeGood: TTypeGood) {
        super(parent,'button', ["criteria_button"], typeGood.title);

        this.root.onclick = () => {
            service.updateGoodsByType(typeGood.id);
            const selector = document.querySelector(".selected");
            if (selector) {
                selector.innerHTML = typeGood.title
            }
        };
    }
}