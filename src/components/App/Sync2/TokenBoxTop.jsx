import React, { useEffect, useState } from "react";
import { Flex, Box, Image } from "rebass/styled-components";
import styled from "styled-components";
import { getFullDisplayBalance } from "../../../helper/formatBalance";
import useTokenBalance from "../../../hooks/useTokenBalance";
import { formatBalance3 } from "../../../utils/utils";
import CurrencyLogo from "../Currency";
import { Type } from "../Text";

const Wrapper = styled.div`
  position: relative;
  height: ${({ height }) => height || "125px"};
  width: ${({ width }) => width || "100%"};
  margin-top: ${({ mt }) => mt && mt};
  background-color: rgba(47, 57, 62, 1);
  border: 1px solid #000000;
  padding: 0 15px;
  border-radius: ${({ borderRadius }) => borderRadius || "15px"};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const TokenInfo = styled(Flex)`
  padding: 7px;
  border-radius: 15px;
  background-color: rgba(256, 256, 256, 0.18);
  align-items: center;
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  &:hover {
    background-color: rgba(256, 256, 256, 0.26);
    /* filter: ${({ active }) => active && "brightness(0.8)"}; */
  }
`;

const ButtonMax = styled.span`
  cursor: pointer;
  color: rgb(117, 187, 253);
  &:hover {
    color: rgb(88, 144, 196);
  }
`;

const InputAmount = styled.input.attrs({
  type: "number",
  autocomplete: "off",
  autocorrect: "off",
  spellcheck: "false",
})`
  height: 59px;
  margin-top: 5px;
  font-weight: 400;
  flex: 1 1 auto;
  background-color: rgb(39, 46, 50);
  border: ${({ border }) => border || "none"};
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px 10px;
  outline-style: none;
  width: ${({ width }) => width || "0px"};
  font-size: ${({ fontSize }) => fontSize || "25px"};
  color: ${({ theme }) => theme.text1};
`;

const TokenBox = ({
  hasMax,
  title,
  mt,
  currency,
  inputAmount = "",
  setInputAmount,
  type,
  setActive,
  TokensMap,
  wrongNetwork,
  setFocusType = null,
  fastUpdate,
}) => {
  const [onMax, setOnMax] = useState(false);
  const data = useTokenBalance(currency?.address, fastUpdate);
  const [balance, setBalance] = useState(wrongNetwork ? "0" : data);

  useEffect(() => {
    const getBalance = () => {
      setBalance(
        data
          ? getFullDisplayBalance(data, currency.decimals)
          : TokensMap[currency.address]?.balance
          ? TokensMap[currency.address]?.balance
          : "0"
      );
    };

    if (currency) {
      getBalance();
    }
  }, [data, currency, wrongNetwork, TokensMap]);

  useEffect(() => {
    if (inputAmount === balance) {
      setOnMax(true);
    } else {
      setOnMax(false);
    }
  }, [inputAmount, balance]);

  return (
    <Wrapper mt={mt}>
      <Flex p="10px 0" justifyContent={"space-between"}>
        <Box>
          <TokenInfo
            onClick={setActive ? () => setActive(true, type) : undefined}
            active={setActive ? true : false}
          >
            <CurrencyLogo
              style={{ verticalAlign: "middle" }}
              currency={currency}
              size={"25px"}
            />
            <Type.LG color="text1" ml="7px" mr="9px">
              {currency?.symbol}
            </Type.LG>
            {setActive && <Image src="/img/select.svg" size="10px" />}
          </TokenInfo>
        </Box>

        <Box mt={"14px"}>
          <Type.SM>
            Balance: {formatBalance3(balance)} {currency?.symbol}
            {hasMax && !onMax && (
              <ButtonMax onClick={() => setInputAmount(balance)}>
                {" "}
                (MAX)
              </ButtonMax>
            )}
          </Type.SM>
        </Box>
      </Flex>

      <Flex>
        <InputAmount
          placeholder="0.0"
          min="0"
          value={isNaN(inputAmount) ? "" : inputAmount}
          onChange={(e) => {
            if (setFocusType) {
              setFocusType(type);
            }
            setInputAmount(e.currentTarget.value);
          }}
        />
      </Flex>
    </Wrapper>
  );
};

export default TokenBox;
