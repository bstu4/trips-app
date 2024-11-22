import { Component } from "../Abstract/Componets";
import { LogicService } from "../Services/LogicService";

export class OptionFilter extends Component {
    constructor(parent: HTMLElement, private service: LogicService,private property: string) {
        super(parent, "option", [], property, ['value'], [property]);
    }
}