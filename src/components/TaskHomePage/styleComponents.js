/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const BgMainContainer = styled.div`
  height: 99vh;
  width: 99vw;
  display: flex;
  background-color: #000000;
  color: #fff;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`

export const AddButton = styled.button`
  background-color: #f3aa4e;
  color: #fff;
  border: none;
  width: 120px;
  padding: 8px;
  align-self: center;
`
export const Form = styled.form`
  width: 45vw;
  display: flex;
  flex-direction: column;
  padding: 2vw;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw;
`

export const JustContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50vw;
  @media screen and (max-width: 767px) {
    width: 99vw;
  }
`

export const Heading = styled.h1`
  color: #f3aa4e;
  text-align: center;
  padding-top: 4vh;
`

export const Buttons = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: ${props => (props.isSelected ? '#f3aa4e' : '#000000')};
  color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
`
