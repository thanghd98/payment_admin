import { PaymentAbstract } from "../abstract"
import { IsAdminParams, PaymentEngineConfig, SetAdminParams, SetItemParams, SetOracleTokensParams, SetPartnerParams } from "../types"

export class PaymentFactory {
    engines: PaymentAbstract[]

    constructor(configs: PaymentEngineConfig){
        //@ts-expect-error
        this.engines = configs.engines.map(Engines => new Engines(configs))   
    }

    getPaymentByChain(chain: string){
        console.log("🚀 ~ PaymentFactory ~ getPaymentByChain ~ chain:", chain)
        console.log("🚀 ~ PaymentFactory ~ getPaymentByChain ~ this.engines:", this.engines)
        const engine = this.engines.find(engine => {
            return engine.hasChain(chain)
        })
        
        if(!engine) throw new Error('Engine not exists')

        return engine
    }

    async setAdmins(params: SetAdminParams): Promise<Record<string, string>>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setAdmins(params)
            } catch (error) {
                return {}
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

    async setOracleTokens(params: SetOracleTokensParams): Promise<Record<string, string>>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setOracleTokens(params)
            } catch (error) {
                return {}
            }
        }

        throw new Error('Method not implement')
    }

    async setPartner(params: SetPartnerParams): Promise<Record<string, string>>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setPartner(params)
            } catch (error) {
                return {}
            }
        }

        throw new Error('Method not implement')
    }


    async setItems(params: SetItemParams): Promise<Record<string, string>>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setItems(params)
            } catch (error) {
                return {}
            }
        }

        throw new Error('Method not implement')
    }

}