import { AddItemParams, AddItemResponse, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetOracleTokensParams, SetPartnerParams, SetPartnerResponse, Transaction, UodateItemParams, UpdateItemResponse } from "../types";

export abstract class PaymentAbstract {
    _config: PaymentEngineConfig  
    
    constructor (_config: PaymentEngineConfig) {
      this._config = _config
    }

    abstract setAdmins(params: SetAdminParams): Promise<Transaction>
    abstract isAdmins(params: IsAdminParams): Promise<boolean>
    abstract setOracleTokens(params: SetOracleTokensParams): Promise<Transaction>
    abstract setPartner(params: SetPartnerParams): Promise<SetPartnerResponse>
    abstract addItems(params: AddItemParams): Promise<AddItemResponse>
    abstract updateItems(params: UodateItemParams): Promise<UpdateItemResponse>
    abstract hasChain(chain: string): boolean
}