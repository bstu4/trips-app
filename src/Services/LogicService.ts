import { Observer } from "../Abstract/Observer";
import { TCustomer, TGood, TGoodResponse, TTypeField, TTypeGood, TValueField } from "../Abstract/Types";
import { DBService } from "./DBService";

export class LogicService extends Observer {
    userCustomer: TCustomer | null = null;

    goodsDB: TGood[] | null = null;

    criteriaSort = {
        sortName: true,
    }

    typeGood = "";

    criteriaFilter: Record<string, Record<string, string>> = {
        peopleCount: {
            key: "Количество человек",
            property: "all"
        }
    }

    constructor(private dbService: DBService) {
        super();
    }

    async getTypesGoods(): Promise<TTypeGood[]> {
        const data = await this.dbService.getTypesGoods();
        return data.types;
    }

    async updateGoodsByType(idGood: string): Promise<void> {
        this.typeGood = idGood;

        const data = await this.dbService.getGoodsByType(idGood);
        const goods = data.goods;
        
        goods.forEach((good) => {
            (good as TGood)["fields"] = this.joinTypesWithValues(good.typeFields, good.valueFields);
        });
        this.goodsDB = goods as TGood[];
        this.filterGoods();
        const sortGoods = this.sortGoodsByName();

        this.dispatch("updateGoodsOnPage", sortGoods);
    }

    private joinTypesWithValues(arrTypes: TTypeField[], arrValues: TValueField[]): Record<string, string | number | Date> {
        const lenArr = arrTypes.length;
        const goodJson = {} as Record<string, string | number | Date>;
        for (let index = 0; index < lenArr; index++) {
            goodJson[arrTypes[index][1]] = arrValues[index][1];
        }
        return goodJson   
    }

    updateGoodsByFilter(key: string, property:string, typeKey:string) {
        this.criteriaFilter[typeKey] = {
            key: key,
            property: property,
        };
        this.updateGoodsByType(this.typeGood);
    }

    filterGoods() {
        const goods = this.goodsDB;

        for (const criteria in this.criteriaFilter) {
            const key = this.criteriaFilter[criteria].key;
            const property = this.criteriaFilter[criteria].property;
            if (property == "all") continue;
            if (goods) {
                this.goodsDB = goods.filter((good) => good.fields[key] == property)
            }
        }
    }

    private sortGoodsByName(): TGoodResponse[] {
        let sortGoods = [] as TGoodResponse[];
        if (this.criteriaSort.sortName) {
            if (this.goodsDB) {
                sortGoods = this.goodsDB?.sort((a,b) => a.title > b.title ? 1: -1);
            }
        } else {
            if (this.goodsDB) {
                sortGoods = this.goodsDB?.sort((a,b) => a.title < b.title ? 1: -1);
            }
        }
        return sortGoods;
    }

    changeSortGoods(): void {
        this.criteriaSort.sortName = !this.criteriaSort.sortName;
        const sortGoods = this.sortGoodsByName();

        this.dispatch("updateGoodsOnPage", sortGoods);
    }

    openPageDetails(good: TGood): void {
        this.dispatch("updatePageDetails", good);
        window.location.hash = "#details";
    }
    
    registrationCustomer(name:string, email:string, mobile:string, operatorType: string, adress: string): void {
        this.dbService.registrationCustomer(name,email, mobile ,operatorType, adress).then((responce) => {
            if (responce) {
                this.dispatch("confirm_registration", responce);
            } else {
                alert("Сбой регистрации");
            }
        });
    }

    identificationCustomer(mobile:string): void {
        this.dbService.identificationCustomer(mobile).then((response) => {
            if (response) {
                this.dispatch("confirm_identification", response);
            } else {
                alert("Сбой авторизации.");
            }
        })
    }
    confirmRegistrationCustomer(customerId:string, code:string):void {
        this.dbService.confirmRegistrationCustomer(customerId, code).then((responce) => {
            if (responce) {
                this.dispatch("end_registration", responce);
            } else {
                alert("Сбой авторизации.");
            }
        });
    }

    confirmIdentificationCustomer(customerId: string, code: string): void {
        
        this.dbService.confirmIdentificationCustomer(customerId, code).then((responce) => {
            if (responce) {
                if (responce.error.code == 0) this.userCustomer = responce.customer;
                this.dispatch("end_identification", responce);
            } else {
                alert("Сбой авторизации.");
            }
        });
    }

    getUserCustomer(): TCustomer | null {
        console.log(this.userCustomer);
        
        return this.userCustomer;
    }
}
