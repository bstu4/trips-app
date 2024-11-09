import { Observer } from "../Abstract/Observer";
import { TGood, TTypeField, TTypeGood, TValueField } from "../Abstract/Types";
import { DBService } from "./DBService";

export class LogicService extends Observer {
    constructor(private dbService: DBService) {
        super();
    }

    async getTypesGoods(): Promise<TTypeGood[]> {
        const data = await this.dbService.getTypesGoods();
        return data.types;
    }

    async updateAllGoods(): Promise<void> {
        const data = await this.dbService.getAllGoods();
        this.dispatch("updateGoodsOnPage", data.goods);
    }

    async updateGoodsByType(idGood: number): Promise<void> {
        const data = await this.dbService.getGoodsByType(idGood);
        const goods = data.goods;
        
        goods.forEach((good) => {
            (good as TGood)["fields"] = this.joinTypesWithValues(good.typeFields, good.valueFields);
        });
        this.dispatch("updateGoodsOnPage", goods);
    }

    private joinTypesWithValues(arrTypes: TTypeField[], arrValues: TValueField[]): Record<string, string | number | Date> {
        const lenArr = arrTypes.length;
        const goodJson = {} as Record<string, string | number | Date>;
        for (let index = 0; index < lenArr; index++) {
            goodJson[arrTypes[index][1]] = arrValues[index][1];
        }
        return goodJson   
        }
    }
