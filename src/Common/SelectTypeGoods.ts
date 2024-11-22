import { Component } from "../Abstract/Componets";
import { TTypeGood } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";
import { OptionTypeGoods } from "./OptionTypeGoods";

export class SelectTypeGoods extends Component {
    constructor(parent: HTMLElement, service: LogicService,private typesGoods: TTypeGood[]) {
        super(parent, "select", ['select_type_goods']);

        new Component(this.root, "option", [], "Страна", ["value"], [""]);
        typesGoods.forEach((typeGood,i) => {     
            new OptionTypeGoods(this.root, service, typeGood);
        });

        this.root.onchange = (event) => {
            const id = (event.target as HTMLSelectElement).value;
            service.updateGoodsByType(id)
        }
    }
}