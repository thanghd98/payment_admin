import { Engines } from "./constants";
import { PaymentFactory } from "./factory";
import { Enviroment, IsAdminParams, SetAdminParams, SetItemParams, SetOracleTokensParams, SetPartnerParams } from "./types";

interface Config {
    enviroment: Enviroment
}

export class PaymentAdmin {
    factory?: PaymentFactory
    static instance: PaymentAdmin
    
    constructor({ enviroment }: Config) {
        if(PaymentAdmin.instance){
            return PaymentAdmin.instance
        }

        this.factory = new PaymentFactory({engines: Engines, enviroment })
        PaymentAdmin.instance = this;

        return this
    }

    async setAdmins(params: SetAdminParams): Promise<Record<string, string>>{
        if(this.factory){
            return await this.factory.setAdmins(params)
        }

        return {}
    }


    async isAdmins(params: IsAdminParams): Promise<boolean>{
        if(this.factory){
            return await this.factory.isAdmins(params)
        }

        return false
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<Record<string, string>>{
        if(this.factory){
            return await this.factory.setOracleTokens(params)
        }

        return {}
    }

    async setPartner(params: SetPartnerParams): Promise<Record<string, string>>{
        if(this.factory){
            return await this.factory.setPartner(params)
        }

        return {}
    }

    async setItems(params: SetItemParams): Promise<Record<string, string>>{
        if(this.factory){
            return await this.factory.setItems(params)
        }

        return {}
    }

}