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
  validNetworks,
  tokens,
  NetworkWeb3,
  BridgeContractAddress,
  Contract
} from './data'
import { ERC20ABI, BridgeABI } from '../../utils/StakingABI'
import { sendTransaction, sendTransactionDeposit } from '../../utils/Stakefun'
import useWeb3 from '../../hooks/useWeb3'
import useTokenBalances from './getBalances'
import { ethCallContract } from './utils'

const Bridge = () => {
  const { account, chainId } = useWeb3React()
  const web3React = useWeb3React()
  const { activate } = web3React
  const [fetch, setFetch] = React.useState('')

  const tokensBalance = useTokenBalances(chains, tokens, fetch)

  const [open, setOpen] = React.useState(false)
  const [claims, setClaims] = React.useState([])
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [approve, setApprove] = React.useState('')
  const [tokenId, setTokenId] = React.useState('')
  const [lock, setLock] = React.useState('')

  const [target, setTarget] = React.useState()
  // TODO change chainId
  const [bridge, setBridge] = React.useState({
    from: {
      ...tokensBalance[0],
      chain: 'ETH',
      chainId: 4,
      address: tokensBalance[0].address[4]
    },
    to: {}
  })
  React.useEffect(() => {
    if (bridge.to.chain) {
      let result = tokensBalance.find(
        (token) => token.tokenId === bridge.from.tokenId
      )
      let validChain = chains.filter(
        (chain) => chain.network !== bridge.from.chainId
      )
      setBridge((prev) => ({
        ...prev,
        to: {
          ...result,
          chain: validChain[0].name,
          chainId: validChain[0].network,
          address: result.address[validChain[0].network]
        }
      }))
    }
  }, [bridge.from, tokensBalance]) // eslint-disable-line
  const [amount, setAmount] = React.useState('')
  const [selectedChain, setSelectedChain] = React.useState('')
  const web3 = useWeb3()

  const activeContract = {
    4: makeContract(web3, BridgeABI, BridgeContractAddress[4]),
    97: makeContract(web3, BridgeABI, BridgeContractAddress[97]),
    4002: makeContract(web3, BridgeABI, BridgeContractAddress[4002])
  }

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

        let dest = chains.filter((item) => item.network !== chain.network)
        for (let index = 0; index < dest.length; index++) {
          const item = dest[index]

          try {
            let userTxs = await Contract[chain.network].methods
              .getUserTxs(account, item.network)
              .call()
            let pendingTxs = await Contract[item.network].methods
              .pendingTxs(chain.network, userTxs)
              .call()
            const pendingIndex = pendingTxs.reduce(
              (out, bool, index) => (bool ? out : out.concat(index)),
              []
            )
            for (let index = 0; index < pendingIndex.length; index++) {
              let claim = await Contract[chain.network].methods
                .txs(userTxs[pendingIndex[index]])
                .call()
              claims.push(claim)
            }
          } catch (error) {
            console.log('error happend in find Claim')
          }
        }
      }

      setClaims(claims)
    }

    if (account && validNetworks.includes(chainId)) {
      findClaim()
    }

    const interval = setInterval(() => {
      if (account && validNetworks.includes(chainId)) {
        findClaim()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [bridge, account, chainId, fetch]) // eslint-disable-line

  React.useEffect(() => {
    const checkApprove = async () => {
      const fromContract = makeContract(
        NetworkWeb3[bridge.from.chainId],
        ERC20ABI,
        bridge.from.address
      )
      let approve = await fromContract.methods
        .allowance(account, BridgeContractAddress[bridge.from.chainId])
        .call()

      if (approve !== '0') {
        setApprove(true)
      } else {
        setApprove(false)
      }
    }
    if (account) checkApprove()
  }, [bridge.from, account]) // eslint-disable-line

  const handleOpenModal = (data, tokenId) => {
    setTarget(data)
    if (tokenId) {
      setTokenId(tokenId)
      setSelectedChain(bridge.from.chainId)
    }
    setOpen(true)
  }
  const changeToken = (token, chainId) => {
    let chain = chains.find((item) => item.network === chainId).name
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
      if (!account || approve) return
      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }

      let Contract = makeContract(web3, ERC20ABI, bridge.from.address)
      let amount = web3.utils.toWei('1000000000000000000')
      sendTransaction(
        Contract,
        `approve`,
        [BridgeContractAddress[bridge.from.chainId], amount],
        account,
        chainId,
        `Approved ${bridge.from.name}`
      ).then(() => {
        setApprove(true)
      })
    } catch (error) {
      console.log('error happened in Approve', error)
    }
  }
  const handleDeposit = () => {
    try {
      if (!approve || !account || amount === '0' || amount === '') return

      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }

      let amountWie = web3.utils.toWei(amount)
      sendTransactionDeposit(
        activeContract[bridge.from.chainId],
        `deposit`,
        [amountWie, bridge.to.chainId, bridge.from.tokenId],
        account,
        chainId,
        `Deposit ${amount} ${bridge.from.name}`,
        NetworkWeb3[bridge.from.chainId]
      ).then(() => {
        setAmount('')
        setFetch(new Date().getTime())
      })
    } catch (error) {
      console.log('error happend in Deposit', error)
    }
  }

  const handleConnectWallet = async () => {
    await activate(injected)
  }
  const handleSwap = () => {
    if (bridge.to.chain) {
      let swap = bridge
      setBridge({
        from: { ...bridge.to },
        to: { ...swap.from }
      })
    }
  }
  const handleClaim = async (claim, network) => {
    try {
      if (
        chainId !== network ||
        (lock &&
          lock.fromChain === claim.fromChain &&
          lock.toChain === claim.toChain &&
          lock.txId === claim.txId)
      ) {
        return
      }

      let amount = web3.utils.fromWei(claim.amount, 'ether')
      let chain = chains.find((item) => item.network === Number(claim.toChain))
      let nodesSigResults = await ethCallContract(
        BridgeContractAddress[Number(claim.fromChain)],
        'getTx',
        [claim.txId],
        BridgeABI,
        Number(claim.fromChain)
      )
      let _reqId = `0x${nodesSigResults.result.cid.substr(1)}`
      let sigs = nodesSigResults.result.signatures.map(
        ({ signature }) => signature
      )
      setLock(claim)
      sendTransaction(
        activeContract[chainId],
        `claim`,
        [
          account,
          claim.amount,
          Number(claim.fromChain),
          Number(claim.toChain),
          claim.tokenId,
          claim.txId,
          _reqId,
          sigs
        ],
        account,
        chainId,
        `Claim ${amount} ${chain.name}`
      ).then(() => {
        setFetch(claim)
        setLock('')
      })
    } catch (error) {
      console.log('error happend in Claim', error)
    }
  }

  return (
    <div className="wrap-bridge">
      <div className="width-340">
        <Instruction />
      </div>

      <div className="container-bridge">
        <div className="bridge-title">
          <h1>DEUS Bridge</h1>
        </div>
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
        <img src="/img/bridge/image 1.svg" alt="logo" className="ftm-logo" />
        <div className="wrapp-bridge-box">
          <div className="relative">
            <BridgeBox
              title="from"
              {...bridge.from}
              balance={bridge.from.balances[bridge.from.chainId]}
              amount={amount}
              setAmount={(data) => setAmount(data)}
              max={true}
              handleOpenModal={() => handleOpenModal('from')}
            />

            <div className="arrow pointer" onClick={handleSwap}>
              <img src="/img/swap/swap-arrow.svg" alt="arrow" />
            </div>
            <BridgeBox
              title="to"
              {...bridge.to}
              balance={
                bridge.to.balances ? bridge.to.balances[bridge.to.chainId] : ''
              }
              amount={amount}
              readonly={true}
              handleOpenModal={() => handleOpenModal('to', bridge.from.tokenId)}
            />
          </div>
          {account ? (
            <>
              {!wrongNetwork && (
                <>
                  <div className="container-btn">
                    <div
                      className={
                        approve ? 'bridge-deposit' : 'bridge-approve pointer'
                      }
                      onClick={handleApprove}
                    >
                      {approve ? 'Approved' : 'Approve'}
                    </div>

                    <div
                      className={
                        approve ? 'bridge-approve pointer' : 'bridge-deposit'
                      }
                      onClick={handleDeposit}
                    >
                      Deposit
                    </div>
                  </div>
                  <div className="container-status-button">
                    <div className="status-button">
                      <div className="active">1</div>
                      <div className={approve ? 'active' : ''}>2</div>
                    </div>
                  </div>
                </>
              )}
              {wrongNetwork && (
                <div className="wrong-network-bridge">Wrong Network</div>
              )}
            </>
          ) : (
            <div className="pink-btn pointer" onClick={handleConnectWallet}>
              Connect Wallet
            </div>
          )}
        </div>

        <TokenModal
          tokens={tokensBalance}
          open={open}
          tokenId={tokenId}
          selectedChain={selectedChain}
          hide={() => {
            setOpen(!open)
            setTokenId('')
            setSelectedChain('')
          }}
          changeToken={(token, chainId) => changeToken(token, chainId)}
        />
      </div>
      <div className="width-340">
        <ClaimToken
          claims={claims}
          chainId={chainId}
          account={account}
          setFetch={(data) => setFetch(data)}
          handleClaim={(claim, network) => handleClaim(claim, network)}
        />
      </div>
    </div>
  )
}

export default Bridge
