import axios from 'axios'
import { navigate } from 'gatsby'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Layout from '../../components/Layout'
import { config } from '../../config'
import ErrorMessage from '../../components/ErrorMessage'
import { generateFullURLCode } from '../../utils'
import Shortened from '../../components/Shortened'

const Clicks = ({ location }) => {
  const [error, setError] = useState('')
  const [shortened, setShortened] = useState()
  const [trackUrl, setTrackUrl] = useState('')
  const { url } = queryString.parse(location.search)


  useEffect(() => {
    const getUrlShortened = async () => {
      axios({
        url: `${config.LAMBDA_ENDPOINT}/get/${url}`,
        method: 'get',
      })
        .then(({ data }) => {
          setShortened(data)

        })
        .catch((err) => {
          setShortened(null)
          setError('Unexpected error')
        })
        .finally(() => {
        })
    }

    if(url) {
      getUrlShortened()
    }
  }, [url])


  const handleTryAnother = () => {
    setError(null)
    setShortened(null)
    navigate('/clicks/of')
  }

  const handleTrack = () => {
    navigate(`clicks/of?url=${trackUrl}`)
  }

  return (
    <Layout>
      <Container>
      {
        error ?
        <React.Fragment>
        <ErrorMessage error={'Invalid URL to track'}/>
        <Button onClick={handleTryAnother}>Try another</Button>
        </React.Fragment> :
        shortened ?
        <React.Fragment>
          <Shortened title='Total URL Clicks for:' url={generateFullURLCode(location, shortened.urlCode)}/>
          <h1 className='total_clicks'>{shortened.clicksCounter}</h1>
          <Button onClick={handleTryAnother}>Track another URL</Button>
        </React.Fragment>:
        <React.Fragment>
          <Input placeholder='Put your URL to track here' value={trackUrl} onChange={e => setTrackUrl(e.target.value)}/>
          <Button onClick={handleTrack}>Track</Button>
        </React.Fragment>
      }
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .total_clicks {
    font-size: 90px;
    line-height: 0;
    color: #465266;
  }
`



export default Clicks
