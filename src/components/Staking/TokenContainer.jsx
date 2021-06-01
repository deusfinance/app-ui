import React from 'react'
import Collapsible from 'react-collapsible'
import moment from 'moment'
import CollapseTrigger from './CollapseTrigger'
import { makeContract, sendTransaction } from '../../utils/Stakefun'
import { abi, StakeAndYieldABI, ControllerABI } from '../../utils/StakingABI'
import UserInfo from './UserInfo'
import Frozen from './Frozen'
import Fluid from './Fluid'
import Deposit from './Deposit'
import Mint from './Mint'
import { getTransactionLink } from '../../utils/explorers'
import addresses from '../../services/addresses.json'
import useWeb3 from '../../helper/useWeb3'
import abis from '../../services/abis.json'
import { validChains } from './Data'
import { isZero } from '../../constant/number'
import BigNumber from 'bignumber.js'
const TokenContainer = (props) => {
  const {
    open,
    tokenName,
    title,
    titleExit,
    onlyLocking,
    link,
    tokenAddress,
    stakingContract,
    stakingContractOld,
    vaultContract,
    exitable,
    yieldable,
    owner,
    chainId,
    category,
    balancer,
    handleTriggerClick,
    type
  } = props
  const web3 = useWeb3()
  const [collapseContent, setCollapseContent] = React.useState('default')
  const [unfreezStake, setUnfreezStake] = React.useState('')
  const [showFluid, setShowFluid] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState({
    stakedTokenAddress: '',
    StakedTokenContract: '',
    StakeAndYieldContract: '',
    ContractToken: '',
    VaultContract: '',
    balanceToken: 0,
    allowance: '',
    balanceWallet: 0,
    balance: 0,
    apy: 10,
    own: 0,
    claim: '',
    exit: '',
    stakeType: '0',
    stakeTypeName: '',
    approve: 0,
    withDrawable: 0,
    withDrawableExit: 0,
    lockStakeType: false,
    burn: '',
    fullyUnlock: '',
    withDrawTime: '',
    nextEpochTime: '',
    maxRedeem: 0,
    exitBalance: ''
  })

  React.useMemo(() => {
    setShowFluid(false)
    setUserInfo({
      stakedTokenAddress: '',
      StakedTokenContract: '',
      StakeAndYieldContract: '',
      ContractToken: '',
      VaultContract: '',
      balanceToken: 0,
      allowance: '',
      balanceWallet: 0,
      balance: 0,
      apy: 10,
      own: 0,
      claim: '',
      exit: '',
      stakeType: '0',
      stakeTypeName: '',
      approve: 0,
      withDrawable: 0,
      withDrawableExit: 0,
      lockStakeType: false,
      burn: '',
      fullyUnlock: '',
      withDrawTime: '',
      nextEpochTime: '',
      maxRedeem: 0,
      exitBalance: ''
    })
  }, [owner, chainId]) // eslint-disable-line

  React.useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const ContractToken = makeContract(
          web3,
          abi,
          addresses['token'][tokenName][chainId]
        )
        let balanceToken = await ContractToken.methods.balanceOf(owner).call()
        balanceToken = web3.utils.fromWei(balanceToken, 'ether')
        let allowance = await ContractToken.methods
          .allowance(owner, addresses['vaults'][tokenName][chainId])
          .call()
        allowance = Number(web3.utils.fromWei(allowance, 'ether'))
        const VaultContract = makeContract(
          web3,
          abis['vaults'],
          addresses['vaults'][tokenName][chainId]
        )
        const StakeAndYieldContract = makeContract(
          web3,
          StakeAndYieldABI,
          stakingContract
        )
        //TODO
        //should i change user too ?
        let stillOld = false
        const EXIT_PERIOD = 75 * 24 * 3600
        let result = await StakeAndYieldContract.methods.userInfo(owner).call()
        let users = await StakeAndYieldContract.methods.users(owner).call()
        // newContract.rewardPerToken(2) * user.balance
        let rewardPerToken = Number(web3.utils.fromWei(result.numbers[8], 'ether'))
        if (Number(result.numbers[1]) === 0) {
          stillOld = true
          const StakeAndYieldOldContract = makeContract(
            web3,
            StakeAndYieldABI,
            stakingContractOld
          )
          result = await StakeAndYieldOldContract.methods.userInfo(owner).call()
          users = await StakeAndYieldOldContract.methods.users(owner).call()
        }
        let { numbers, exit, stakedTokenAddress } = result
        // const users = await StakeAndYieldContract.methods.users(owner).call()
        const { exitStartTime } = users

        let fullyUnlock = Number(exitStartTime) + EXIT_PERIOD
        fullyUnlock = moment(new Date(fullyUnlock * 1000)).format('DD.MM.YYYY')

        const StakedTokenContract = makeContract(web3, abi, stakedTokenAddress)
        let balanceWallet = await StakedTokenContract.methods
          .balanceOf(owner)
          .call()

        balanceWallet = web3.utils.fromWei(balanceWallet, 'ether')
        let approve = await StakedTokenContract.methods
          .allowance(owner, stakingContract)
          .call()

        approve = Number(web3.utils.fromWei(approve, 'ether'))

        let apy =
          (Number(web3.utils.fromWei(numbers[7], 'ether')) +
            Number(web3.utils.fromWei(numbers[8], 'ether'))) *
          100

        apy = apy <= 0.5 ? 10 : apy

        let stakeType = numbers[1]
        let claim = web3.utils.fromWei(numbers[9], 'ether')
        let balance = web3.utils.fromWei(numbers[0], 'ether')
        let totalSupply = Number(web3.utils.fromWei(numbers[4], 'ether'))
        let totalSupplyYield = Number(web3.utils.fromWei(numbers[5], 'ether'))
        let withDrawable = Number(web3.utils.fromWei(numbers[3], 'ether'))
        let withDrawableExit = Number(web3.utils.fromWei(numbers[13], 'ether'))
        let earned = Number(web3.utils.fromWei(numbers[9], 'ether'))
        let exitBalance = 0
        const currtimestamp = Math.floor(Date.now() / 1000)

        if (stillOld) {
          const portion = (currtimestamp - exitStartTime) / EXIT_PERIOD
          if (stakeType !== '1') {
            // web3.utils.toBN(balance).mul(web3.utils.toBN(rewardPerToken)).toString(10)
            claim = new BigNumber(balance).times(rewardPerToken).toFixed(5)
            earned = claim
          }
          if (portion >= 1) {
            exitBalance = balance
          } else {
            exitBalance = String(balance * portion)
          }
        }
        else {
          exitBalance = web3.utils.fromWei(numbers[11], 'ether')
        }
        /**
        if(nextEpochTime-withdrawTime < 24hours){
        // nextEpochTime + 7 days;
        }else{
        //nextEpochTime
        }
         */
        let burn = balance / 75
        let withDrawTime = Number(numbers[2])

        // withDrawTime = new Date(withDrawTime * 1000)
        let nextEpochTime = withDrawTime + (8 * 24 * 3600)

        // let showFluid = currtimestamp - withDrawTime

        // TODO check after transaction contract become ok
        if ((withDrawable > 0 || withDrawableExit > 0)) {
          setShowFluid(true)
        }
        // if (showFluid <= 0 && (withDrawable > 0 || withDrawableExit > 0)) {
        //   setShowFluid(true)
        // }
        let controller = await StakeAndYieldContract.methods
          .controller()
          .call()


        let maxRedeem = 0

        if (tokenName === "deus") {
          const deusContract = makeContract(web3, abi, addresses['token']["deus"][chainId])
          const deusBalance = await deusContract.methods.balanceOf(controller).call()
          maxRedeem = web3.utils.fromWei(deusBalance, 'ether')
        }

        if (tokenName === "dea") {
          const deaContract = makeContract(web3, abi, addresses['token']["dea"][chainId])
          const deaBalance = await deaContract.methods.balanceOf(controller).call()
          maxRedeem = web3.utils.fromWei(deaBalance, 'ether')
        }

        console.log(tokenName, maxRedeem);
        console.log(controller);

        let stakeTypeName = ''
        let strategyLink = ''
        if (stakeType === '2' || stakeType === '3') {
          const ControllerContract = makeContract(
            web3,
            ControllerABI,
            controller
          )
          let strategy = await ControllerContract.methods
            .getStrategy(stakingContract)
            .call()
          strategyLink = getTransactionLink(chainId, strategy)
        }
        let own = ''
        switch (stakeType) {
          case '1':
            let value =
              totalSupply > 0
                ? ((Number(balance) / totalSupply) * 100).toFixed(2)
                : 0
            own = `You own <span class="blue-color">${value}%</span> of the 'Stake' pool`
            stakeTypeName = 'Stake'
            break
          case '2':
            let valueYield =
              totalSupplyYield > 0
                ? ((Number(balance) / totalSupplyYield) * 100).toFixed(2)
                : 0
            own = `You own <span class="blue-color">${valueYield}%</span> of the 'Yield' pool`
            stakeTypeName = 'Yield'
            break
          case '3':
            let value1 =
              totalSupply > 0
                ? ((Number(balance) / totalSupply) * 100).toFixed(2)
                : 0
            let value2 =
              totalSupplyYield > 0
                ? ((Number(balance) / totalSupplyYield) * 100).toFixed(2)
                : 0
            own = `You own <span class="blue-color">${value1}%</span> of the 'Stake' pool and <span class="blue-color">${value2}%</span> of the  'Yield' pool`

            stakeTypeName = 'Stake & Yield'
            break
          default:
            break
        }

        if (Number(balance) > 0 || withDrawable > 0 || withDrawableExit > 0) {
          setUserInfo((prev) => {
            return {
              ...prev,
              lockStakeType: true
            }
          })
        } else {
          setUserInfo((prev) => {
            return {
              ...prev,
              lockStakeType: false
            }
          })
        }

        setUserInfo((prev) => {
          return {
            ...prev,
            ContractToken,
            VaultContract,
            stakedTokenAddress,
            StakedTokenContract,
            StakeAndYieldContract,
            approve,
            allowance,
            stakeType,
            stakeTypeName,
            balanceWallet,
            balance,
            balanceToken,
            apy,
            claim,
            exit,
            withDrawable,
            withDrawableExit,
            earned,
            burn,
            fullyUnlock,
            withDrawTime,
            nextEpochTime,
            strategyLink,
            own,
            maxRedeem,
            exitBalance
          }
        })
      } catch (error) {
        console.log('error Happend in Fetch data', error)
      }
    }

    const fetchUNIToken = async () => {
      setCollapseContent('lock')
      if (tokenAddress && tokenName) {
        const ContractToken = makeContract(
          web3,
          abi,
          addresses['token'][tokenName][chainId]
        )
        let balanceToken = await ContractToken.methods.balanceOf(owner).call()
        balanceToken = web3.utils.fromWei(balanceToken, 'ether')
        const VaultContract = makeContract(
          web3,
          abis['vaults'],
          addresses['vaults'][tokenName][chainId]
        )
        const Contract = makeContract(web3, abi, tokenAddress)
        let balanceWallet = await Contract.methods.balanceOf(owner).call()
        balanceWallet = web3.utils.fromWei(balanceWallet, 'ether')
        let allowance = await ContractToken.methods
          .allowance(owner, addresses['vaults'][tokenName][chainId])
          .call()
        allowance = Number(web3.utils.fromWei(allowance, 'ether'))
        setUserInfo((prev) => {
          return {
            ...prev,
            balanceWallet,
            balanceToken,
            ContractToken,
            VaultContract,
            allowance
          }
        })
      }
    }
    if (!owner) {
      setCollapseContent('stake')
    }
    if (chainId !== 1) {
      setCollapseContent('stake')
    }
    // TODO condition chainID (error in fetchUni)
    if (owner && tokenName && validChains.includes(chainId)) {
      onlyLocking ? fetchUNIToken() : fetchDataUser()

      let subscription = web3.eth.subscribe(
        'newBlockHeaders',
        (error, result) => {
          if (!error && owner && validChains.includes(chainId)) {
            onlyLocking ? fetchUNIToken() : fetchDataUser()
            return
          }

          console.error(error)
        }
      )
      return () => {
        // unsubscribes the subscription
        subscription.unsubscribe(function (error, success) {
          if (success) {
            console.log('Successfully unsubscribed!')
          }
        })
      }
    }
  }, [
    web3,
    owner,
    chainId,
    tokenName,
    onlyLocking,
    stakingContract,
    stakingContractOld,
    tokenAddress
  ])

  React.useEffect(() => {
    if (!onlyLocking && owner) {
      if (userInfo.balance === '0') {
        setCollapseContent('default')
      } else {
        setCollapseContent('default')
      }
    }
  }, [owner, chainId, userInfo.balance, onlyLocking])

  React.useEffect(() => {
    if (Number(userInfo.balance) > 0 || Number(userInfo.withDrawable) > 0 || Number(userInfo.withDrawableExit) > 0) {
      handleTriggerClick(title, userInfo.balance, userInfo.withDrawable, userInfo.withDrawableExit)
    } else {
      handleTriggerClick(title, false)
    }
  }, [userInfo.balance, title, type]) // eslint-disable-line

  const handleCollapseContent = (data) => {
    setCollapseContent(data)
  }

  const handleBack = () => {
    setCollapseContent('default')
  }
  const handleUnfreezStake = () => {
    try {
      if (unfreezStake === '0' || unfreezStake === '') return

      let amount = web3.utils.toWei(unfreezStake)
      sendTransaction(
        userInfo.StakeAndYieldContract,
        `unfreeze`,
        [amount],
        owner,
        chainId,
        `Withdraw`
      ).then(() => {
        setUnfreezStake('0')
      })
    } catch (error) {
      console.log('error happend in withDraw Stake', error)
    }
  }
  return (
    <div
      className={`token-container ${onlyLocking ? 'uni-background' : ''} ${(!isZero(userInfo.balance) || !isZero(userInfo.withDrawable) || !isZero(userInfo.withDrawableExit)) && !onlyLocking ? 'staked-pool' : ''
        }`}
    >
      <Collapsible
        handleTriggerClick={() => handleTriggerClick(title)}
        open={open[title]}
        trigger={
          <CollapseTrigger
            title={title}
            titleExit={titleExit}
            onlyLocking={onlyLocking}
            link={link}
            apy={userInfo.apy}
            category={category}
            balancer={balancer}
            balance={userInfo.balance}
            balanceWallet={userInfo.balanceWallet}
            handleCollapseContent={(data) => handleCollapseContent(data)}
            open={open[title]}
          />
        }
      >
        <div className="collapse-border"></div>
        {collapseContent === 'default' && (
          <>
            <UserInfo
              {...userInfo}
              title={title}
              titleExit={titleExit}
              owner={owner}
              chainId={chainId}
              exitable={exitable}
              updateUserInfo={(exitBalance) => {
                setUserInfo((prev) => {
                  return {
                    ...prev,
                    exitBalance
                  }
                })
              }}
            />
            {userInfo.stakeType !== '1' ? (
              <>
                <Frozen
                  {...userInfo}
                  owner={owner}
                  title={title}
                  titleExit={titleExit}
                  chainId={chainId}
                  showFluid={() => setShowFluid(true)}
                />
                {showFluid && (
                  <Fluid
                    {...userInfo}
                    chainId={chainId}
                    owner={owner}
                    title={title}
                    titleExit={titleExit}
                    showFluid={() => setShowFluid(false)}
                  />
                )}
              </>
            ) : (
              <div className="wrap-box mt-20">
                <div className="wrap-box-gray width-202">
                  <input
                    type="number"
                    className="input-transparent"
                    placeholder="0"
                    value={unfreezStake}
                    onChange={(e) => setUnfreezStake(e.target.value)}
                  />
                  <div
                    onClick={() => setUnfreezStake(userInfo.balance)}
                    className="opacity-75 pointer"
                  >
                    Max
                  </div>
                </div>

                <div
                  className="wrap-box-gradient width-402 pointer"
                  onClick={handleUnfreezStake}
                >
                  {userInfo.exit ? 'UNSTAKE + REDEEM' : 'UNSTAKE'}
                </div>
              </div>
            )}
          </>
        )}
        {collapseContent === 'stake' && (
          <Deposit
            {...userInfo}
            stakingContract={stakingContract}
            owner={owner}
            chainId={chainId}
            title={title}
            handleBack={handleBack}
            exitable={exitable}
            yieldable={yieldable}
          />
        )}
        {collapseContent === 'lock' && (
          <Mint
            {...userInfo}
            vaultContract={vaultContract}
            owner={owner}
            chainId={chainId}
            title={title}
            titleExit={titleExit}
            tokenName={tokenName}
            handleBack={handleBack}
            onlyLocking={onlyLocking}
          />
        )}
      </Collapsible>
    </div>
  )
}

export default TokenContainer
