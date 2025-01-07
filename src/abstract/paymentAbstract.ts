import { AddItemParams, DataResponse, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetOracleTokensParams, SetPartnerParams, UodateItemParams } from "../types";

export abstract class PaymentAbstract {
    _config: PaymentEngineConfig  
    
    constructor (_config: PaymentEngineConfig) {
      this._config = _config
    }

    abstract setAdmins(params: SetAdminParams): Promise<DataResponse>
    abstract isAdmins(params: IsAdminParams): Promise<boolean>
    abstract setOracleTokens(params: SetOracleTokensParams): Promise<DataResponse>
    abstract setPartner(params: SetPartnerParams): Promise<DataResponse>
    abstract addItems(params: AddItemParams): Promise<DataResponse>
    abstract updateItems(params: UodateItemParams): Promise<DataResponse>
    abstract hasChain(chain: string): boolean
}