import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react"
import useWeb3, { useCrossWeb3 } from "./useWeb3"
import { getCurrentTimeStamp } from '../utils/utils';
import { BASE_URL, BASE_URL2, doMigration, getMigrationOption, getRandomNumber } from '../helper/migrationHelper';
import { ChainId } from "../constant/web3";
import { getMigrationContract } from "../helper/contractHelpers";
import useRefresh from "./useRefresh";
import { useSetRecoilState } from "recoil";
import { coolDownState } from "../store/dei";

export const useMigrate = (migrateList, validChainId = 1, forceUpdate, isPersonal = false) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const setCoolDown = useSetRecoilState(coolDownState)

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const timeStamp = getCurrentTimeStamp()
            const migrateOption = getMigrationOption(migrateList)
            const requestId1 = await getRandomNumber(account, BASE_URL)
            const requestId2 = await getRandomNumber(account, BASE_URL2)

            const status = await doMigration([requestId1, requestId2].join(","), migrateOption, timeStamp, account, chainId, validChainId, web3, isPersonal)
            console.log(timeStamp);
            console.log(parseInt(status.message.match(/(\d+)/)[0]) + timeStamp);
            if (!status.success) {
                setCoolDown(parseInt(status.message.match(/(\d+)/)[0]) + timeStamp)
            }

        } catch (e) {
            console.log(e);
            return false
        }
        // eslint-disable-next-line
    }, [migrateList, account, chainId, validChainId, setCoolDown, web3, forceUpdate])

    return { onMigrate: handleSwap }
}


export const useUserStatus = (account) => {
    const [userStatus, setUserStatus] = useState(null)
    const web3ETH = useCrossWeb3(ChainId.ETH)
    const web3Polygon = useCrossWeb3(ChainId.MATIC)
    const { fastRefresh } = useRefresh()

    const ethContract = getMigrationContract(web3ETH, ChainId.ETH)
    const polygonContract = getMigrationContract(web3Polygon, ChainId.MATIC)

    useEffect(() => {
        const getUserStatus = async (account) => {
            let userETHStatus = await ethContract.methods.usersStatus(account).call()
            let userPolygonStatus = await polygonContract.methods.usersStatus(account).call()
            if (!userETHStatus || !userPolygonStatus) return

            userETHStatus = parseInt(userETHStatus).toString(2).padStart(6, "0")
            userPolygonStatus = parseInt(userPolygonStatus).toString(2).padStart(6, "0")
            // console.log(userETHStatus, userPolygonStatus);

            let status = []
            for (var i = 0; i < 6; i++) {
                if (userETHStatus.charAt(i) !== "0" || userPolygonStatus.charAt(i) !== "0") {
                    status.push(i)
                }
            }
            // console.log(status);
            setUserStatus(status)
        }
        if (account && ethContract && polygonContract) {
            getUserStatus(account)
        }
        // eslint-disable-next-line
    }, [account, fastRefresh])//ethContract,polygonContract TODO
    return userStatus
}