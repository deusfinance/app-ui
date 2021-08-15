import React, { Suspense, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AllTokens } from '../config'
import { LoopCircleLoading } from 'react-loadingg'
const DeaStatic = React.lazy(() => import('../pages/DeaStatic//index'))
const MainSwap = React.lazy(() => import('../pages/Swap/MainSwap'))

const Deus = () => {
  const { account, chainId } = useWeb3React()
  const [allTokens, setAllTokens] = useState(AllTokens)

  document.title = 'DEUS app'
  useEffect(() => {
    setAllTokens(AllTokens)
  }, [chainId, account])

  const props = {
    allTokens: allTokens,
    setAllTokens: setAllTokens,
    account: account,
    chainId: chainId
  }

  return (
    <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
      <Switch>
        <Route exact path="/swap" render={() => <MainSwap {...props} />} />
        <Route exact path="/otc-buy" render={() => <DeaStatic {...props} />} />
        <Redirect from="/" to="/swap" />
      </Switch>
    </Suspense>
  )
}

export default Deus
