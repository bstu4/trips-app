import { Component } from "../Abstract/Componets";
import { TTypeGood } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";
import { OptionFilter } from "./OptionFilter";
import { OptionTypeGoods } from "./OptionTypeGoods";

export class SelectFilter extends Component {
    constructor(parent: HTMLElement, service: LogicService,private key: string, private properties: string[], private typeKey: string) {
        super(parent, "select", ['select_type_filter']);

        new Component(this.root, "option", [], "Туристы", ["value"], ["all"]);
        properties.forEach((property,i) => {     
            new OptionFilter(this.root, service, property);
        });

        this.root.onchange = (event) => {
            const property = (event.target as HTMLSelectElement).value;
            service.updateGoodsByFilter(key, property, typeKey);
        }
    }
}