import {TGoodsResponse, TIdentificationResponce, TRegistrationResponse, TTypesGoods } from "../Abstract/Types"

export class DBService {
    private domain = "https://polyteh.cis.by/cgi-bin/";
    private keyShop = "792513588";
    private pinCode = "";
    
    async getTypesGoods(): Promise<TTypesGoods> {
        const responce = await fetch(
            this.domain + "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=100&sgr_r=0&stst_=0&shead_=0&sadd_=5,117,85"
        );

        const data = (await responce.json()) as TTypesGoods;
        
        return data;
    }

    async getAllGoods(): Promise<TGoodsResponse> {
        const responce = await fetch(
            this.domain + "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=110&sgr_r=0&stst_=0&shead_=0&sadd_=5,117,85"
        );
        const data = (await responce.json()) as TGoodsResponse;
        console.log(data);
        
        return data;
    }

    async getGoodsByType(idGood: string): Promise<TGoodsResponse> {
        const responce = await fetch(
            this.domain + "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=110&sgr_r=0&stst_=0&shead_=0&sadd_=5,117,85," + idGood
        );
        const data = (await responce.json()) as TGoodsResponse;
        console.log(data);
        return data;
    }

    async identificationCustomer(mobile: string): Promise<TRegistrationResponse> {
        const link = this.domain + "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=170&sgr_r=0&stst_=0&shead_=0&sadd_=5,85," + `${mobile},${this.keyShop}`;
        const responce = await fetch(link);
        const data = (await responce.json()) as TRegistrationResponse;
        return data;
    }

    async registrationCustomer(name:string, email:string, mobile:string, operatorType: string, adress: string):Promise<TRegistrationResponse> {
        console.log("registrationCustomer");
        
        const link = 
            this.domain +
            "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=180&sgr_r=0&stst_=0&shead_=0&sadd_=5,85," +
            `${mobile},${name},${operatorType},${email},${adress},1,${this.keyShop}`;
        console.log(link);
        const responce = await fetch(link);
        const data = (await responce.json()) as TRegistrationResponse;
        return data;
    }

    async confirmRegistrationCustomer(customerId:string, code:string){
        console.log("confirmRegistrationCustomer");
        
        const link = this.domain + "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=181&sgr_r=0&stst_=0&shead_=0&sadd_=5,85," + 
        `${customerId},${code}`;
        const responce = await fetch(link);
        const data = (await responce.json()) as TIdentificationResponce;
        return data;
    }
    
    async confirmIdentificationCustomer(customerId:string, code: string): Promise<TIdentificationResponce> {
        console.log(code);
        
        this.pinCode = code;
        const link =
            this.domain + 
            "is10_09?sSd_=0&sfil_n=2&svid_=3&sgr_l=160&sit_l=176&sgr_r=0&stst_=0&shead_=0&sadd_=5,85," +
            `${customerId},${code}}`;
        console.log(link);

        const responce = await fetch(link);
        const data = (await responce.json()) as TIdentificationResponce;
        return data;
    }
}