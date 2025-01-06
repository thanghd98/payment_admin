import { CHAIN_DATA } from "@wallet/constants";
import { PaymentAbstract } from "../../../abstract";
import { IsAdminParams, PaymentEngineConfig, SetAdminParams, SetItemParams, SetOracleTokensParams, SetPartnerParams } from "../../../types";
import { PaymentEvmFactory } from "./factory";
import Web3 from "web3";

const { utils } = Web3

export class PaymentEvmAdmin extends PaymentAbstract{
    factory: PaymentEvmFactory

    constructor(_config: PaymentEngineConfig){
        super(_config)
        this.factory = new PaymentEvmFactory(_config.enviroment)
    }

    async setAdmins(params: SetAdminParams): Promise<Record<string, string>> {
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

    async setOracleTokens(params: SetOracleTokensParams): Promise<Record<string, string>> {
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

    async setPartner(params: SetPartnerParams): Promise<Record<string, string>> {
        const { partnerCode, partnerInfo, chain } = params

        try {  
            const partnerInfoFormat = Object.values(partnerInfo)
            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.setPartner(utils.fromAscii(partnerCode), partnerInfoFormat).encodeABI()

            return {
                data,
                contractAddress: address
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }
    
    async setItems(params: SetItemParams): Promise<Record<string, string>> {
        const { params: paramsSetting, chain } = params

        try {
            const { contract, address } = this.factory.getContract(chain)

            //convert params
            const itemCodes = paramsSetting.map((item) =>  utils.fromAscii(item.itemKey))
            const itemInfos = paramsSetting.map((item) => (Object.values({...item.itemInfo, partnerCode: utils.fromAscii(item.itemInfo.partnerCode)})))

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
        console.log("🚀 ~ PaymentEvmAdmin ~ hasChain ~ chain:", chain)
        return Object.values(CHAIN_DATA)
            .filter(chain => chain.isWeb3)
            .map(item => item.chain)
            .includes(chain)
    }
}