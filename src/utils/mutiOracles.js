import React from 'react';
import { sendMessage } from "./telegramLogger"
import { toast } from 'react-toastify';

const expectedNumberOracles = 2

export const xdaiMutileOracleHandler = (type, address, prices) => {
    // console.log(prices);
    let liveCounts = 0
    console.log(prices);
    // console.log(prices.length);

    prices.map((price, index) => {
        if (price && price[address]) {
            liveCounts++
            price[address].index = index
        } else {
            sendMessage(`target address: ${address}\n\n oracle ${index + 1} hasnt sign`)
        }
        console.log(price[address], address);
    })
    console.log("liveCounts " + liveCounts);

    if (liveCounts < expectedNumberOracles) {

        toast.warn(<div>NOT ENOUGH SIGNATURES <br /><br />
        There are not enough Oracle signatures, for security  reasons we cannot execute this trade right now. <br /><br />
        If this problem persists please contact our Admins  in <u> <a href="https://t.me/deusfinance" style={{ color: "#fff" }}>Telegram ↗</a></u> we will immediatly look into the issue.
        </div >, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false
        });

        sendMessage(`target address: ${address}\n\nlive oracles count is ${liveCounts}`)
        return false
    }

    if (type === "buy") return xdaiBuy(address, prices)
    return xdaiSell(address, prices)
}


const xdaiBuy = (address, prices) => {
    console.log("xdaiBuy");

    const tokenResults = prices.filter((price) => price && price[address])
        .map((price) => {
            return price[address]
        })
    // console.log(tokenResults);
    const result = tokenResults.sort(comparePrice)
    const maxPrice = result[0].price

    return {
        price: maxPrice,
        result: result.slice(0, expectedNumberOracles).sort(compareOrder)
    }
}

const xdaiSell = (address, prices) => {

    const tokenResults = prices.filter((price) => price && price[address])
        .map((price) => {
            return price[address]
        })

    const result = tokenResults.sort(comparePrice).reverse()
    return {
        result: result.slice(0, expectedNumberOracles).sort(compareOrder)
    }
}


function comparePrice(a, b) {
    const A = parseInt(a.price);
    const B = parseInt(b.price);

    let comparison = 0;
    if (A > B) {
        comparison = -1;
    } else if (A < B) {
        comparison = 1;
    }

    return comparison;
}

function compareOrder(a, b) {
    const A = a.index;
    const B = b.index;

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}