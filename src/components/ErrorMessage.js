import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  p {
    margin: 0;
    color: #c75a5a;
    box-shadow: 0 0 4px #00000000;
    border-radius: 3px;
    padding: 2px 24px;
    font-size: 14px;
    line-height: 10px;
    font-weight: 700;
    box-sizing: border-box;
    display: block;
    position: relative;
  }
  min-width: 100px;
  margin-bottom: 10px;
  justify-content: center;
`

const ErrorMessage = ({ error }) => {
  return (
    <Container>
      { error && <p>* {error}</p>}
    </Container>
  )
}

export default ErrorMessage
