import React from 'react'
import styled from 'styled-components'

const Copy = () => {
  return (
    <CopyContainer>
      Made with ❤️ by <a href='https://dantecalderon.dev' target="__blank"><b>Dante Calderon</b></a> {' - '}
     <a href="https://www.freepik.com/free-photos-vectors/technology" target="__blank">Background by freepik</a>
    </CopyContainer>
  )
}

const CopyContainer = styled.div`
  left: 0;
  bottom: 10px;
  width: 100%;
  color: #465266;
  text-align: center;
  position: fixed;
`

export default Copy
