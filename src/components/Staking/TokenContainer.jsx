import React from 'react'
import Collapsible from 'react-collapsible'
import moment from 'moment'
import CollapseTrigger from './CollapseTrigger'
import CollapseTriggerOpen from './CollapseTriggerOpen'
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
    vaultContract,
    exitable,
    yieldable,
    owner,
    chainId,
    category,
    balancer,
    handleTriggerClick
  } = props
  const web3 = useWeb3()
  const [collapseContent, setCollapseContent] = React.useState('default')
  const [unfreezStake, setUnfreezStake] = React.useState('0')
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
    withDrawTime: ''
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
      withDrawTime: ''
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
        let result = await StakeAndYieldContract.methods.userInfo(owner).call()
        const users = await StakeAndYieldContract.methods.users(owner).call()
        const { exitStartTime } = users
        let fullyUnlock = Number(exitStartTime) + 90 * 24 * 3600
        fullyUnlock = moment(new Date(fullyUnlock * 1000)).format('DD.MM.YYYY')
        let { numbers, exit, stakedTokenAddress } = result
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
        apy = apy === 0 ? 10 : apy

        let claim = web3.utils.fromWei(numbers[9], 'ether')
        let balance = web3.utils.fromWei(numbers[0], 'ether')
        let stakeType = numbers[1]
        let totalSupply = Number(web3.utils.fromWei(numbers[4], 'ether'))
        let totalSupplyYield = Number(web3.utils.fromWei(numbers[5], 'ether'))
        let withDrawable = Number(web3.utils.fromWei(numbers[3], 'ether'))
        let withDrawableExit = Number(web3.utils.fromWei(numbers[13], 'ether'))
        let earned = Number(web3.utils.fromWei(numbers[9], 'ether'))

        let burn = balance / 90
        let withDrawTime = Number(numbers[2]) + 24 * 3600
        withDrawTime = new Date(withDrawTime * 1000)
        let showFluid = moment(withDrawTime).diff(moment(new Date()))
        // TODO check after transaction contract become ok
        if (showFluid <= 0 && (withDrawable > 0 || withDrawableExit > 0)) {
          setShowFluid(true)
        }
        let total = 0
        let stakeTypeName = ''
        let strategyLink = ''
        if (stakeType === '2' || stakeType === '3') {
          let controller = await StakeAndYieldContract.methods
            .controller()
            .call()
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
        switch (stakeType) {
          case '1':
            total = totalSupply
            stakeTypeName = 'Stake'
            break
          case '2':
            total = totalSupplyYield
            stakeTypeName = 'Yield'
            break
          case '3':
            total = totalSupplyYield + totalSupply
            stakeTypeName = 'Stake & Yield'
            break
          default:
            break
        }

        if (Number(balance) > 0) {
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
            strategyLink
          }
        })
        if (total > 0) {
          const own = ((Number(balance) / total) * 100).toFixed(2)
          setUserInfo((prev) => {
            return { ...prev, own }
          })
        }
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
    if (owner && tokenName && chainId === 1) {
      onlyLocking ? fetchUNIToken() : fetchDataUser()

      let subscription = web3.eth.subscribe(
        'newBlockHeaders',
        (error, result) => {
          if (!error && owner && chainId === 1) {
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
    tokenAddress
  ])

  React.useEffect(() => {
    if (!onlyLocking && owner) {
      if (userInfo.balance === '0') {
        setCollapseContent('stake')
      } else {
        setCollapseContent('default')
      }
    }
  }, [owner, chainId, userInfo.balance, onlyLocking])

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
    <div className={`token-container ${onlyLocking ? 'uni-background' : ''}`}>
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
          />
        }
        triggerWhenOpen={
          <CollapseTriggerOpen
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
                    type="text"
                    className="input-transparent"
                    value={unfreezStake}
                    onChange={(e) => setUnfreezStake(e.target.value)}
                  />
                  <div
                    onClick={() => setUnfreezStake(userInfo.balance)}
                    className="opacity-75"
                  >
                    Max
                  </div>
                </div>

                <div
                  className="wrap-box-gradient width-402"
                  onClick={handleUnfreezStake}
                >
                  Withdraw + Claim
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
