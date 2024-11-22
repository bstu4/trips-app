import { Component } from "../Abstract/Componets";
import { TTypeGood, TTypesGoods } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";

export class OptionTypeGoods extends Component {
    constructor(parent: HTMLElement, private service: LogicService, private type: TTypeGood) {
        super(parent,'option', [], type.title, ['value'], [type.id.toString()]);
    }
}