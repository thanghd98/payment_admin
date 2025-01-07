import { CHAIN_DATA } from "@wallet/constants";
import { PaymentAbstract } from "../../../abstract";
import { AddItemParams, DataResponse, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetOracleTokensParams, SetPartnerParams, UodateItemParams } from "../../../types";
import { PaymentEvmFactory } from "./factory";
import hash from 'crypto-js/sha256'
import {utils} from 'ethers'

export class PaymentEvmAdmin extends PaymentAbstract{
    factory: PaymentEvmFactory

    constructor(_config: PaymentEngineConfig){
        super(_config)
        this.factory = new PaymentEvmFactory(_config.enviroment)
    }

    async setAdmins(params: SetAdminParams): Promise<DataResponse> {
        const { addresses, isActives, chain } = params

        try {  
            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.setAdmins(addresses, isActives).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async isAdmins(params: IsAdminParams): Promise<boolean> {
        const { address, chain } = params

        try {
            const { contract } = this.factory.getContract(chain)
            const isAdmin = await contract.methods.isAdmins(address).call()

            return !!isAdmin
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<DataResponse> {
        const { params: paramsSetting, chain } = params

        try {  
            const tokenAddresses = paramsSetting?.map(param => param.tokenAddress)
            const oracleAddresses = paramsSetting?.map(param => param.oracleAddress)

            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.setOracleTokens(tokenAddresses, oracleAddresses).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async setPartner(params: SetPartnerParams): Promise<DataResponse> {
        const { partnerCode, partnerInfo, chain } = params

        try {  
            const partnerInfoFormat = Object.values(partnerInfo)
            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.createPartner(utils.formatBytes32String(partnerCode), partnerInfoFormat).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }
    
    async addItems(params: AddItemParams): Promise<DataResponse> {
        const { params: paramsSetting, chain } = params

        try {
            const { contract, address } = this.factory.getContract(chain)

            //convert params
            const itemCodes = paramsSetting.map((item) =>  utils.formatBytes32String(this.generateItemCode(item?.itemInfo?.partnerCode)))
            const itemInfos = paramsSetting.map((item) => (Object.values({...item?.itemInfo, partnerCode: utils.formatBytes32String(item?.itemInfo?.partnerCode)})))

            const data = contract.methods.setItems(itemCodes, itemInfos).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async updateItems(params: UodateItemParams): Promise<DataResponse> {
        const { params: paramsSetting, chain } = params

        try {
            const { contract, address } = this.factory.getContract(chain)

            //convert params
            const itemCodes = paramsSetting.map((item) => utils.formatBytes32String(item.itemKey))
            const itemInfos = paramsSetting.map((item) => (Object.values({...item.itemInfo, partnerCode: utils.formatBytes32String(item.itemInfo.partnerCode)})))

            const data = contract.methods.setItems(itemCodes, itemInfos).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    hasChain(chain: string): boolean {
        return Object.values(CHAIN_DATA)
            .filter(chain => chain.isWeb3)
            .map(item => item.chain)
            .includes(chain)
    }

    generateItemCode(partnerCode: string){
        return partnerCode + '-' + hash(JSON.stringify(partnerCode) + new Date().getTime).toString().slice(0,4)
    }
}