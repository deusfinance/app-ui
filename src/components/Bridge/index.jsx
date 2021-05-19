import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import './bridge.css'
import BridgeBox from './BridgeBox'
import ClaimToken from './ClaimToken'
import Instruction from './Instruction'
import TokenModal from './TokenModal'
import { makeContract } from '../../utils/Stakefun'
import {
  chains,
  BSCContract,
  ETHContract,
  FTMContract,
  validNetworks,
  ethContract,
  bscContract,
  ftmContract,
  ethWeb3,
  bscWeb3,
  ftmWeb3
} from './data'
import { abi, BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'
import useWeb3 from '../../helper/useWeb3'
import { ethCallContract } from './utils'

const Bridge = () => {
  const { account, chainId } = useWeb3React()
  const web3React = useWeb3React()
  const { activate } = web3React
  const [open, setOpen] = React.useState(false)
  const [claims, setClaims] = React.useState([])
  const [currentTx, setCurrentTx] = React.useState('')
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [collapse, setCollapse] = React.useState({
    approve: { pending: true, success: false },
    deposit: { pending: false, success: false },
    network: { pending: false, success: false },
    bridge: { pending: false, success: false },
    claim: { pending: false, success: false }
  })

  const [target, setTarget] = React.useState()
  // TODO change chainId
  const [bridge, setBridge] = React.useState({
    from: {
      chain: 'ETH',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 4,
      tokenId: '1',
      address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1'
    },
    to: {
      chain: 'BSC',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 97,
      tokenId: '1',
      address: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    }
  })
  const [fromBalance, setFromBalance] = React.useState(0)
  const [toBalance, setToBalance] = React.useState(0)
  const [amount, setAmount] = React.useState('0')
  const [fetch, setFetch] = React.useState('')
  const web3 = useWeb3()

  const activeEthContract = makeContract(web3, BridgeABI, ETHContract)
  const activeBscContract = makeContract(web3, BridgeABI, BSCContract)
  const activeFtmContract = makeContract(web3, BridgeABI, FTMContract)

  React.useEffect(() => {
    if (!validNetworks.includes(chainId)) {
      setWrongNetwork(true)
    }
    return () => {
      setWrongNetwork(false)
    }
  }, [chainId, bridge, account])

  React.useEffect(() => {
    const findClaim = async () => {
      let claims = []

      for (let index = 0; index < chains.length; index++) {
        const chain = chains[index]

        let originContract = ''
        switch (chain.network) {
          case 1:
            originContract = ethContract
            break
          case 2:
            originContract = bscContract
            break
          case 3:
            originContract = ftmContract
            break
          default:
            break
        }
        let dest = chains.filter((item) => item.network !== chain.network)

        for (let index = 0; index < dest.length; index++) {
          const item = dest[index]
          let destContract = ''
          switch (item.network) {
            case 1:
              destContract = ethContract
              break
            case 2:
              destContract = bscContract
              break
            case 3:
              destContract = ftmContract
              break
            default:
              break
          }
          let userTxs = await originContract.methods
            .getUserTxs(account, item.network)
            .call()

          let pendingTxs = await destContract.methods
            .pendingTxs(chain.network, userTxs)
            .call()
          const pendingIndex = pendingTxs.reduce(
            (out, bool, index) => (bool ? out : out.concat(index)),
            []
          )
          for (let index = 0; index < pendingIndex.length; index++) {
            let claim = await originContract.methods
              .txs(userTxs[pendingIndex[index]])
              .call()

            claims.push(claim)
          }
        }
      }

      setClaims(claims)
    }
    const getBalance = async () => {
      let bridgeWeb3 = ''
      let bridgeToWeb3 = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeWeb3 = ethWeb3
          break
        case 97:
          bridgeWeb3 = bscWeb3
          break
        case 4002:
          bridgeWeb3 = ftmWeb3
          break
        default:
          break
      }
      switch (bridge.to.chainId) {
        case 4:
          bridgeToWeb3 = ethWeb3
          break
        case 97:
          bridgeToWeb3 = bscWeb3
          break
        case 4002:
          bridgeToWeb3 = ftmWeb3
          break
        default:
          break
      }

      const fromContract = makeContract(bridgeWeb3, abi, bridge.from.address)
      let fromBalance = await fromContract.methods.balanceOf(account).call()
      fromBalance = web3.utils.fromWei(fromBalance, 'ether')
      setFromBalance(fromBalance)
      const toContract = makeContract(bridgeToWeb3, abi, bridge.to.address)
      let toBalance = await toContract.methods.balanceOf(account).call()
      toBalance = web3.utils.fromWei(toBalance, 'ether')
      setToBalance(toBalance)
    }
    if (account && validNetworks.includes(chainId)) {
      getBalance()
      findClaim()
    }

    const interval = setInterval(() => {
      if (account && validNetworks.includes(chainId)) {
        getBalance()
        findClaim()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [bridge, account, chainId, fetch])

  React.useEffect(() => {
    const fetchData = async () => {
      let bridgeWeb3 = ''
      let bridgeContract = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          bridgeWeb3 = ethWeb3
          break
        case 97:
          bridgeContract = BSCContract
          bridgeWeb3 = bscWeb3
          break
        case 4002:
          bridgeContract = FTMContract
          bridgeWeb3 = ftmWeb3
          break
        default:
          break
      }
      const fromContract = makeContract(bridgeWeb3, abi, bridge.from.address)
      let approve = await fromContract.methods
        .allowance(account, bridgeContract)
        .call()
      if (approve !== '0') {
        setCollapse({
          approve: { pending: false, success: true },
          deposit: { pending: true, success: false },
          network: { pending: false, success: false },
          bridge: { pending: false, success: false },
          claim: { pending: false, success: false }
        })
      } else {
        setCollapse({
          approve: { pending: true, success: false },
          deposit: { pending: false, success: false },
          network: { pending: false, success: false },
          bridge: { pending: false, success: false },
          claim: { pending: false, success: false }
        })
      }
    }
    if (account) fetchData()
  }, [bridge.from])

  const handleOpenModal = (data) => {
    setTarget(data)
    setOpen(true)
  }
  const changeToken = (token, chainId) => {
    let chain = chains.find((item) => item.id === chainId).name
    setBridge((prev) => ({
      ...prev,
      [target]: {
        ...token,
        address: token.address[chainId],
        chainId: chainId,
        chain
      }
    }))
  }

  const handleApprove = async () => {
    try {
      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }
      if (!account) return
      if (collapse.approve.success) return
      let Contract = makeContract(web3, abi, bridge.from.address)
      let amount = web3.utils.toWei('1000000000000000000')
      let bridgeContract = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          break
        case 97:
          bridgeContract = BSCContract
          break
        default:
          break
      }

      sendTransaction(
        Contract,
        `approve`,
        [bridgeContract, amount],
        account,
        chainId,
        `Approved ${bridge.from.name}`
      ).then(() => {
        setCollapse((prev) => {
          return {
            ...prev,
            approve: {
              pending: false,
              success: true
            },
            deposit: { pending: true, success: false }
          }
        })
      })
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  const handleDeposit = () => {
    try {
      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }
      if (!collapse.approve.success) return
      if (!account) {
        return
      }
      if (amount === '0' || amount === '') return
      let network = chains.find((item) => item.id === bridge.to.chainId).network

      let Contract = ''

      switch (bridge.from.chainId) {
        case 4:
          Contract = activeEthContract
          // bridgeContract = ETHContract
          break
        case 97:
          Contract = activeBscContract
          // bridgeContract = BSCContract
          break
        case 97:
          Contract = activeFtmContract
          break
        default:
          break
      }
      // const Contract = makeContract(web3, BridgeABI, bridgeContract)
      let amountWie = web3.utils.toWei(amount)
      sendTransaction(
        Contract,
        `deposit`,
        [amountWie, network, bridge.from.tokenId],
        account,
        chainId,
        `Deposite ${amount} ${bridge.from.name}`
      ).then(() => {
        setCollapse((prev) => {
          return {
            ...prev,
            deposit: {
              pending: false,
              success: true
            },
            network: { pending: true, success: false }
          }
        })
      })
    } catch (error) {
      console.log('error happend in Deposit', error)
    }
  }
  const handleChangeNetwork = () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }
    setCollapse((prev) => {
      return {
        ...prev,
        network: {
          pending: false,
          success: true
        },
        bridge: { pending: true, success: false }
      }
    })
  }
  const handleBridge = async () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }

    let toChain = chains.find((item) => item.id === bridge.to.chainId).network
    let fromChain = chains.find(
      (item) => item.id === bridge.from.chainId
    ).network

    let destContract = ''
    let originContract = ''
    switch (bridge.from.chainId) {
      case 4:
        originContract = ethContract
        break
      case 97:
        originContract = bscContract
        break
      case 4002:
        originContract = ftmContract
        break
      default:
        break
    }

    switch (toChain) {
      case 1:
        destContract = ethContract
        break
      case 2:
        destContract = bscContract
        break
      case 3:
        destContract = ftmContract
        break
      default:
        break
    }
    let originContractAddress = ''
    switch (fromChain) {
      case 1:
        originContractAddress = ETHContract
        break
      case 2:
        originContractAddress = BSCContract
        break
      case 3:
        originContractAddress = FTMContract
        break
      default:
        break
    }
    let userTxs = await originContract.methods
      .getUserTxs(account, toChain)
      .call()

    let pendingTxs = await destContract.methods
      .pendingTxs(fromChain, userTxs)
      .call()
    let currentPending = pendingTxs[pendingTxs.length - 1]
    if (!currentPending) {
      let txId = userTxs[userTxs.length - 1]
      let nodesSigResults = await ethCallContract(
        originContractAddress,
        'getTx',
        [txId],
        BridgeABI,
        fromChain
      )
      console.log({ nodesSigResults, currentPending })
      let sigs = nodesSigResults.result.signatures.map(
        ({ signature }) => signature
      )
      setCurrentTx({ txId, sigs })
    }

    setCollapse((prev) => {
      return {
        ...prev,
        bridge: {
          pending: false,
          success: true
        },
        claim: { pending: true, success: false }
      }
    })
  }
  const handleClaim = async () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }
    let Contract = ''

    switch (chainId) {
      case 4:
        Contract = activeEthContract
        break
      case 97:
        Contract = activeBscContract
        break
      case 4002:
        Contract = activeFtmContract
        break
      default:
        break
    }
    let amountWie = web3.utils.toWei(amount)
    let toChain = chains.find((item) => item.id === bridge.to.chainId).network
    let fromChain = chains.find(
      (item) => item.id === bridge.from.chainId
    ).network
    // const Contract = makeContract(web3, BridgeABI, bridgeContract)

    sendTransaction(
      Contract,
      `claim`,
      [
        account,
        amountWie,
        fromChain,
        toChain,
        bridge.from.tokenId,
        currentTx.txId,
        currentTx.sigs
      ],
      account,
      chainId,
      `Claim ${amount} ${bridge.to.chain}`
    ).then(() => {
      setFetch(`${currentTx}-claim`)
      setCollapse({
        approve: { pending: false, success: true },
        deposit: { pending: true, success: false },
        network: { pending: false, success: false },
        bridge: { pending: false, success: false },
        claim: { pending: false, success: false }
      })
      setAmount('0')
    })
  }
  const handleConnectWallet = async () => {
    await activate(injected)
  }
  return (
    <>
      <Instruction collapse={collapse} />
      <ClaimToken
        claims={claims}
        chainId={chainId}
        account={account}
        setFetch={(data) => setFetch(data)}
      />
      <div className="container-bridge">
        <div className="bridge-title">
          <h1>DEUS Bridge</h1>
        </div>
        <div className="bridge">
          <img src="/img/bridge/bridge.svg" alt="bridge" />
          <img
            src="/img/bridge/bsc-logo 1.svg"
            alt="bsc-logo"
            className="bsc-logo"
          />
          <img
            src="/img/bridge/Ethereum-icon.svg"
            alt="eth-logo"
            className="eth-logo"
          />
          <img src="/img/bridge/image 1.svg" alt="logo" className="logo" />

          <div className="bridge-box-1">
            <BridgeBox
              title="from"
              {...bridge.from}
              balance={fromBalance}
              amount={amount}
              setAmount={(data) => setAmount(data)}
              max={true}
              handleOpenModal={() => handleOpenModal('from')}
            />
          </div>
          <div className="arrow">
            <img src="/img/swap/swap-arrow.svg" alt="arrow" />
          </div>

          <div className="bridge-box-2">
            <BridgeBox
              title="to"
              {...bridge.to}
              balance={toBalance}
              amount={amount}
              readonly={true}
              handleOpenModal={() => handleOpenModal('to')}
            />
          </div>
        </div>
        {account ? (
          <>
            {(collapse.approve.pending || collapse.deposit.pending) &&
              !wrongNetwork && (
                <>
                  <div className="container-btn">
                    <div
                      className={
                        collapse.approve.success
                          ? 'bridge-deposit'
                          : 'bridge-approve pointer'
                      }
                      onClick={handleApprove}
                    >
                      Approve
                    </div>

                    <div
                      className={
                        collapse.approve.success
                          ? 'bridge-approve pointer'
                          : 'bridge-deposit'
                      }
                      onClick={handleDeposit}
                    >
                      Deposit
                    </div>
                  </div>
                  <div className="container-status-button">
                    <div className="status-button">
                      <div className="active">1</div>
                      <div className={collapse.approve.success ? 'active' : ''}>
                        2
                      </div>
                    </div>
                  </div>
                </>
              )}
            {collapse.network.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleChangeNetwork}>
                CHANGE NETWORK
              </div>
            )}
            {collapse.bridge.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleBridge}>
                INITIATE BRIDGING
              </div>
            )}
            {collapse.claim.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleClaim}>
                CLAIM TOKEN
              </div>
            )}
            {wrongNetwork && <div className="wrong-network">Wrong Network</div>}
          </>
        ) : (
          <div className="pink-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </div>
        )}

        <TokenModal
          open={open}
          hide={() => setOpen(!open)}
          changeToken={(token, chainId) => changeToken(token, chainId)}
        />
      </div>
    </>
  )
}

export default Bridge
