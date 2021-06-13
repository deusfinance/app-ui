import React, { useCallback } from 'react';
import styled from 'styled-components'


const StyledLink = styled.a`
  text-decoration: ${({ active }) => active ? "underline" : "none"};
  cursor: pointer;
  :hover {
    text-decoration: ${({ textDecoration }) => textDecoration || "underline"};
  }
  :focus {
    outline: none;
    text-decoration: ${({ textDecoration }) => textDecoration || "underline"};
  }
  :active {
    text-decoration: none;
  }
`

export function ExternalLink({
  target = '_blank',
  href,
  active = false,
  textDecoration = true,
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
  return <StyledLink textDecoration={textDecoration} active={active} target={target} rel={rel} href={href} onClick={handleClick}  {...rest} />
}
