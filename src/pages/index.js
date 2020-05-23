import axios from 'axios'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Shortened from '../components/Shortened'
import { config } from '../config'
import { generateFullURLCode, isValidUrl } from '../utils'

export const IndexPage = ({ location }) => {
  const [ loading, setLoading ] = useState(false)
  const [ originalUrl, setOriginalUrl ] = useState('')
  const [ error, setError ] = useState('')
  const [ generatedUrl, setGeneratedUrl ] = useState('')

  const handleGenerate = () => {
    if(loading) return
    if(!isValidUrl(originalUrl)) {
      setError('Url is not valid')
      return
    }
    setLoading(true)
    axios({
      url: `${config.LAMBDA_ENDPOINT}/create`,
      method: 'post',
      data: {
        originalUrl
      },
    })
      .then(({ data }) => {
        const url = generateFullURLCode(location, data.urlCode)
        setGeneratedUrl(url)
      })
      .catch(err => {
        setError('Unexpected error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChangeUrl = (event) => {
    setError('')
    setGeneratedUrl('')
    setOriginalUrl(event.target.value)
  }

  return (
    <Layout>
      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1 style={{ margin: 0 , fontSize: '50px'}}><span aria-label='Logo' role='img'>🌐</span> URL Shortener</h1>
        <Input placeholder='Your URL here' value={originalUrl} onKeyDown={e => {
          if(e.key === 'Enter') {
            handleGenerate()
          }
        }} onChange={onChangeUrl}/>
        <Button disabled={loading} onClick={handleGenerate}>Generar</Button>
        <ErrorMessage error={error}/>
        <Shortened url={generatedUrl}/>
      </div>
    </Layout>
  )
}

export const indexAbout = graphql`
  query IndexAbout {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
