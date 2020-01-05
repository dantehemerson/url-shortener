import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  height: 200px;
`

const Url = styled.a`
  background: white;
  color: #b72b2b;
  padding: 8px 10px;
  border-radius: 4px;
`

const Copy = styled.button`
`

const Shortened = ({ url })  => {
  return (
    <Container>
      {url && <Url href={url}>{url}</Url>}
    </Container>
  )
}

export default Shortened
