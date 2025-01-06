import { IsAdminParams, PaymentEngineConfig, SetAdminParams, SetItemParams, SetOracleTokensParams, SetPartnerParams } from "../types";

export abstract class PaymentAbstract {
    _config: PaymentEngineConfig  
    
    constructor (_config: PaymentEngineConfig) {
      this._config = _config
    }

    abstract setAdmins(params: SetAdminParams): Promise<Record<string, string>>
    abstract isAdmins(params: IsAdminParams): Promise<boolean>
    abstract setOracleTokens(params: SetOracleTokensParams): Promise<Record<string, string>>
    abstract setPartner(params: SetPartnerParams): Promise<Record<string, string>>
    abstract setItems(params: SetItemParams): Promise<Record<string, string>>
    abstract hasChain(chain: string): boolean
}