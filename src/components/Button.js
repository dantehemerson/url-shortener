import styled from 'styled-components'

const Button = styled.button`
  background: #01a7cb;
  box-shadow: 0px 2px 4px 0px #14141454;
  &:hover {
    background: #108da8;
  }
  &:disabled {
    opacity: 0.7;
  }
  transition: .4s;
  color: white;
  border: none;
  border-radius: 2rem;
  font-family: Play;
  font-size: 18px;
  padding: 10px 10px;
  width: 220px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 6px;
  outline: none;
  font-weight: 600;
`

export default Button
