import React, { useCallback } from 'react';
import styled from 'styled-components'


const StyledLink = styled.a`
  text-decoration: ${({ active }) => active ? "underline" : "none"};
  cursor: pointer;
  font-weight: 400;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export function ExternalLink({
  target = '_blank',
  href,
  active = false,
  rel = 'noopener noreferrer',
  ...rest
}) {
  const handleClick = useCallback(
    (event) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
        //
      } else {
        event.preventDefault()
      }
    },
    [target]
  )
  return <StyledLink active={active} target={target} rel={rel} href={href} onClick={handleClick}  {...rest} />
}
