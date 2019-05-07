import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Colors } from '../styles/variables'
import FileDropzone from '../components/FileDropzone'
import Text from '../components/Text'

class App extends Component {
  state = { proccessedText: '', isLoading: false }

  uploadFile = async file => {
    this.setState({ isLoading: true })

    const formData = new FormData()
    formData.append('textfile', file)
    const { data } = await axios.post('/api/process_text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    this.setState({ proccessedText: data, isLoading: false })
  }

  render() {
    return (
      <AppContainer>
        <Logo className="text-center">HiQ Code Test</Logo>
        <InnerAppContainer>
          <FileDropzone
            uploadFile={this.uploadFile}
            isLoading={this.state.isLoading}
          />
          {!!this.state.proccessedText && (
            <Text text={this.state.proccessedText} />
          )}
        </InnerAppContainer>
      </AppContainer>
    )
  }
}

export default App

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(
    to right bottom,
    ${Colors.primaryDark},
    ${Colors.primaryLight}
  );
  min-height: 100vh;
`

const InnerAppContainer = styled.div`
  width: 60%;
  background-color: #e2aeb8;
  border-radius: 8px;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.8);
`
const Logo = styled.h1`
  position: absolute;
  top: 40px;
  left: 70px;

  color: ${Colors.textLight};
  font-family: 'Playball', cursive;
  font-size: 4rem;
  font-weight: 400;
`
