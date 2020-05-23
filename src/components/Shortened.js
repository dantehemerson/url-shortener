import React, { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'

const Container = styled.div`
  min-width: 100px;
  width: 100%;
  padding: 0 10px;
  margin-top: 30px;
  .title_result {
    text-align: center;
    font-weight: 700;
    font-size: 19px;
    color: #465266;
  }
  .track_url {
    text-align: center;
    font-size: 16px;
    color: #465266;
    a {
      color: #01a7cb;
    }
  }
`

const Url = styled.a`
  color: #01a7cb;
  width: 100%;
  padding: 5px 10px 5px 20px;
`

const Copy = styled.button`
  border: none;
  background: #02a7cb;
  color: white;
  display: flex;
  &:hover {
    background: #0498b8;
  }
  cursor: pointer;
  outline: none;
  padding: 4px 20px;
  border-radius: 0  30px 30px 0;
  position: relative;
  > p {
    font-family: Play;
    font-weight: 700;
  }
`

const Result = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0px 2px 4px 0px #14141454;
`

const CopiedTooltip = styled.p`
    position: absolute;
    background: #465266;
    color: white;
    top: 44px;
    margin: 0;
    left: 0px;
    padding: 5px 14px;
    border-radius: 30px;
    box-shadow: 0 0 4px #00000047;
`

const Shortened = ({ title='Your shortened URL is:', url, urlCode })  => {
  const [copied, setCopied] = useState(false)
  const myTimeout = useRef(null)

  const onCopy = () => {
    setCopied(true)
    if(myTimeout.current) {
      clearTimeout(myTimeout.current)
    }
    myTimeout.current = setTimeout(() => {
      setCopied(false)
    }, 2400)
  }

  return (
    <Container>
      {url &&
      <React.Fragment>
          <p className='title_result'>{title}</p>
          <Result>
            <Url target="_blank" href={url}>{url}</Url>
            <CopyToClipboard text={url} onCopy={onCopy}>
              <Copy title='Copy to clipboard'>
                <p>Copy</p>
                { copied && <CopiedTooltip>Copied</CopiedTooltip> }
              </Copy>
            </CopyToClipboard>
          </Result>
          {
            urlCode && <p className='track_url'>You can track total clicks in your URL <a href={`/clicks/of?url=${urlCode}`}  target="_blank">here</a></p>
          }
        </React.Fragment>
      }
    </Container>
  )
}

export default Shortened
