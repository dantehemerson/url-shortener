import axios from 'axios'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { getItems, parseLikes } from '../utils'

const Button = styled.button`
  background: #f9b51b;
  &:hover {
    background: #dea115;
  }
  transition: .4s;
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 14px;
  padding: 10px 10px;
  width: 220px;
  cursor: pointer;
  margin-bottom: 200px;
  outline: none;
  margin-top: 20px;
  font-weight: 600;
`

export class IndexPage extends React.Component {
  lambdaEndpoint = ''

  state = {
    loading: true,
    items: [],
    likes: {},
    error: false,
  }

  componentDidMount() {
    this.lambdaEndpoint = this.props.data.site.siteMetadata.lambdaEndpoint
    this.setState({ items: getItems() })
    this.fetchLikes()
  }

  fetchLikes = () => {
    this.setState({ loading: true, error: false })
    axios
      .get(`${this.lambdaEndpoint}/get-likes`)
      .then(data => {
        this.setState({
          loading: false,
          likes: parseLikes(data.data),
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true,
        })
      })
  }

  handlerToggleLike = id => {
    axios({
      url: `${this.lambdaEndpoint}/like`,
      method: 'post',
      data: {
        id,
      },
    })
      .then(({ data }) => {
        const liked = data
        this.setState({
          likes: { ...this.state.likes, [liked._id]: liked.likes },
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { items, likes, loading, error } = this.state
    return (
      <Layout>
        <Container>
          <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <h1 style={{ margin: 0 }}>URL Shortener</h1>
            <Input placeholder='Your URL here'/>
            <Button>Generar</Button>
          </div>
        </Container>
      </Layout>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;


  background-color: #330000;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.25'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
  box-sizing: border-box;
  padding: 10px;
`

export const indexAbout = graphql`
  query IndexAbout {
    site {
      siteMetadata {
        title
        lambdaEndpoint
      }
    }
  }
`

export default IndexPage
