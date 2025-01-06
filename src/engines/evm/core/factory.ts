import Web3 from "web3"
import { CHAIN_DATA } from '@wallet/constants'
import { AbiItem } from "ethereum-abi-types-generator"
import { PaymentContext } from "../../../types/contract"
import { paymentAbi, paymentContract } from "../../../constants"
import { chainKey, Enviroment } from "../../../types"

export class PaymentEvmFactory {
    environment: Enviroment

    constructor(environment: Enviroment) {
        this.environment = environment
    }

    getProvider(chain: chainKey): Web3 {
        const mProvider = new Web3.providers.HttpProvider(CHAIN_DATA[chain.toString()]?.rpcURL)
        return new Web3(mProvider)
    }

    getContract(chain: chainKey){
        const contractAddress = paymentContract(chain, this.environment === Enviroment.development) 
        const client = this.getProvider(chain)

        const contract = (new client.eth.Contract(
            paymentAbi as AbiItem[],
            contractAddress
        ) as unknown) as PaymentContext

        return { address: contractAddress, contract }
    }
}