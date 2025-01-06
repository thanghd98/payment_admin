import { PaymentAbstract } from "../abstract";
import { chainKey } from "./chain";

export enum Enviroment {
    production = 'production',
    development = 'development'
}

export interface PaymentEngineConfig{
    engines: PaymentAbstract[],
    enviroment: Enviroment
}

export interface SetAdminParams {
    addresses: string[],
    isActives: boolean[],
    chain: chainKey
}

export interface IsAdminParams {
    address: string,
    chain: chainKey
}

export interface SetOracleTokensParams {
    params: Array<{
        tokenAddress: string,
        oracleAddress: string
    }>
    chain: chainKey
}

export interface SetPartnerParams {
    partnerCode: string
    partnerInfo: {
        isActive: boolean,
        owner: string,
        feeReceiver: string,
        protocolFee: string,
        commissionFee: string
    }
    chain: chainKey
}

export interface ItemParams {
    itemKey: string,
    itemInfo: {
      isActive: boolean,
      partnerCode: string,
      tokenAddress: string,
      priceInToken: string,
      priceInUsd: string,
    },
}

export interface SetItemParams {
    params: Array<ItemParams>
    chain: chainKey
}