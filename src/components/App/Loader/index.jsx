import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrap = styled.div`
  display: inline-block;
  vertical-align:middle;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius:${({ size }) => size} ;
  border:2px solid ${({ color }) => color || "#ffffff"};
  border-top:2px solid ${({ color }) => color || "#e95f86"};;
  border-bottom:2px solid ${({ color }) => color || "#3e90dd"};;
  animation: ${rotate} 0.5s linear infinite;
  margin:0 5px;
  text-align:center;
  position: absolute;
  right: 5px;
  top:5px;
`


const Loader = () => {
  return (<LoaderWrap size="15px" />);
}

export default Loader;