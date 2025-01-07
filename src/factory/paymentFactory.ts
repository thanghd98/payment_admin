import { PaymentAbstract } from "../abstract"
import { AddItemParams, DataResponse, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetOracleTokensParams, SetPartnerParams, UodateItemParams } from "../types"

export class PaymentFactory {
    engines: PaymentAbstract[]

    constructor(configs: PaymentEngineConfig){
        //@ts-expect-error
        this.engines = configs.engines.map(Engines => new Engines(configs))   
    }

    getPaymentByChain(chain: string){
        const engine = this.engines.find(engine => {
            return engine.hasChain(chain)
        })
        
        if(!engine) throw new Error('Engine not exists')

        return engine
    }

    async setAdmins(params: SetAdminParams): Promise<DataResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setAdmins(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }


    async isAdmins(params: IsAdminParams): Promise<boolean>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.isAdmins(params)
            } catch (error) {
                return false
            }
        }

        throw new Error('Method not implement')
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<DataResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setOracleTokens(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

    async setPartner(params: SetPartnerParams): Promise<DataResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setPartner(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }


    async addItems(params: AddItemParams): Promise<DataResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.addItems(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

    async updateItems(params: UodateItemParams): Promise<DataResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.updateItems(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

}