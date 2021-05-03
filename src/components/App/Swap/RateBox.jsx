import React from 'react';
import { Flex } from 'rebass/styled-components';
import { FlexCenter } from '../Container';
import { Type } from '../Text';
import { SwapArrow } from '.';
import BigNumber from 'bignumber.js';

const handleName = (state, invert) => {
    const { from, to } = state
    if (invert) return `${to.symbol} per ${from.symbol}`
    return ` ${from.symbol} per ${to.symbol}`
}

const handleRatio = (amountIn, amountOut, invert) => {
    if (!amountIn || !amountOut || isNaN(amountIn) || isNaN(amountOut)) return ""
    if (parseFloat(amountIn) <= 0 || parseFloat(amountOut) <= 0) return ''
    const amountInBig = new BigNumber(amountIn)
    const amountOutBig = new BigNumber(amountOut)
    if (invert) {
        const invertRatio = amountOutBig.div(amountInBig, 10).toFixed(6, 0)
        return `${invertRatio}`
    }
    const ratio = amountInBig.div(amountOutBig, 10).toFixed(6, 0)
    return `${ratio}`
}

const RateBox = ({ amountIn, amountOut, state, invert, setInvert }) => {
    return (
        <Flex justifyContent="space-between" mt="15px" px="10px">
            <Type.XS>Price</Type.XS>
            <FlexCenter>
                <Type.XS>{handleRatio(amountIn, amountOut, invert)} {handleName(state, invert)}  </Type.XS>
                <SwapArrow style={{ marginLeft: "5px" }} onClick={() => setInvert(!invert)} >
                    <svg width={15} height={15} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx={5} cy={5} r={5} fill="white" fillOpacity="0.75" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.14258 4.60404V4.05876C2.14258 3.29536 2.77119 2.69555 3.57124 2.69555H6.88575L6.22856 2.06847C6.11427 1.95941 6.11427 1.79583 6.22856 1.68677C6.34286 1.57772 6.5143 1.57772 6.62859 1.68677L7.77152 2.77734C7.80009 2.8046 7.82867 2.83187 7.82867 2.85913C7.85724 2.91366 7.85724 2.99545 7.82867 3.07725C7.80009 3.10451 7.80009 3.13177 7.77152 3.15904L6.62859 4.24961C6.57144 4.30413 6.5143 4.3314 6.42858 4.3314C6.34286 4.3314 6.28571 4.30413 6.22856 4.24961C6.11427 4.14055 6.11427 3.97696 6.22856 3.86791L6.88575 3.24083H3.57124C3.0855 3.24083 2.71404 3.59527 2.71404 4.05876V4.60404C2.71404 4.76763 2.59975 4.87668 2.42831 4.87668C2.25687 4.87668 2.14258 4.76763 2.14258 4.60404Z" fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.57215 4.87695C7.40071 4.87695 7.28642 4.98601 7.28642 5.14959V5.69488C7.28642 6.15837 6.91497 6.5128 6.42922 6.5128H3.11473L3.77192 5.88573C3.88621 5.77667 3.88621 5.61309 3.77192 5.50403C3.65762 5.39497 3.48619 5.39497 3.37189 5.50403L2.22897 6.5946C2.20039 6.62186 2.17182 6.64912 2.17182 6.67639C2.14325 6.73092 2.14325 6.81271 2.17182 6.8945C2.20039 6.92177 2.20039 6.94903 2.22897 6.97629L3.37189 8.06686C3.42904 8.12139 3.48619 8.14865 3.57191 8.14865C3.65762 8.14865 3.71477 8.12139 3.77192 8.06686C3.88621 7.95781 3.88621 7.79422 3.77192 7.68516L3.11473 7.05809H6.42922C7.22927 7.05809 7.85788 6.45828 7.85788 5.69488V5.14959C7.85788 4.98601 7.74359 4.87695 7.57215 4.87695Z" fill="black" />
                    </svg>
                </SwapArrow>
            </FlexCenter>
        </Flex>
    );
}

export default RateBox;