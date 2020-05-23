import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, darkTheme, lightTheme } from '../global-styles'

const LayoutWrapper = styled.div`
  background: ${props => (props ? props.theme.background : null)};
  color: ${props => (props ? props.theme.color : null)};
`

// const ButtonSelectTheme = styled.button`
//   position: fixed;
//   top: 0;
//   right: 0;
//   background: gray;
//   border: 0;
//   box-shadow: none;
//   border-radius: 4px;
//   padding: 10px 0;
//   font-weight: 600;
//   cursor: pointer;
//   width: 60px;
//   &:focus {
//     outline: none;
//   }
// `

export default class Layout extends React.Component {
  state = {
    isDarkTheme: true,
  }

  componentDidMount() {
    if ('isDarkTheme' in localStorage) {
      this.setState({
        isDarkTheme: localStorage.isDarkTheme === 'false' ? false : true,
      })
    }
  }

  handleChangeTheme = () => {
    const newTheme = !this.state.isDarkTheme
    this.setState({ isDarkTheme: newTheme })
    localStorage.setItem('isDarkTheme', newTheme)
  }

  render() {
    return (
      <React.Fragment>
        <Helmet defaultTitle="URL Shortener by dantehemerson">
          <link
            href="https://fonts.googleapis.com/css?family=Play"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossorigin="anonymous"
          />
        </Helmet>
        {/* <ButtonSelectTheme onClick={this.handleChangeTheme}>
          {this.state.isDarkTheme ? 'LIGHT' : 'DARK'}
          {this.state.isDarkTheme ? (
            <i className={`fas fa-toggle-on`} />
          ) : (
            <i className={`fas fa-toggle-off`} />
          )}
        </ButtonSelectTheme> */}
        <ThemeProvider theme={true || this.state.isDarkTheme ? darkTheme : lightTheme}>
          <React.Fragment>
            <GlobalStyles />
            <LayoutWrapper>
              <Container>
              {this.props.children}
              </Container>
              </LayoutWrapper>
          </React.Fragment>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  height: 100vh;
  background-color: #330000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.25'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 20vh;
`
