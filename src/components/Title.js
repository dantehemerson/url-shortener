import React from 'react'
import styled from 'styled-components'

const Title = () => {
  return (
    <Container>
      <h1>PEQUE Shortener</h1>
    </Container>
  )
}

const Container = styled.div`
  > h1 {
    color: #465266;
    border: 1px solid white;
    border-width: 4px;
    padding: 4px 10px;
    color: #ffffff;
    font-size: 40px;
    text-align: center;
    background: #0000004d;
    font-weight: 700;
  }
`
export default Title
