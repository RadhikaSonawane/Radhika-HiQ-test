import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

import Loader from './Loader'

class FileDropzone extends Component {
  state = {
    file: null,
    message: ''
  }

  onDrop = files => {
    if (files.length === 0) {
      return this.setState({ message: 'Text file should be! (.txt, .rtf, .md)' })
    }
    if (files.length > 1) {
      return this.setState({ message: 'One file at a time' })
    }

    this.props.uploadFile(files[0])
  }

  onDragEnter = () => {
    this.setState({ message: '' })
  }

  render() {
    return (
      <StyledDropzone
        accept="text/plain, .md, .rtf"
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        activeClassName="is-active"
        rejectClassName="is-rejecting"
        disabled={this.props.isLoading}
      >
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <Title>Drop text-file</Title>
        )}

        {!!this.state.message && <p>{this.state.message}</p>}
      </StyledDropzone>
    )
  }
}

export default FileDropzone

const StyledDropzone = styled(Dropzone)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e2aeb8;
  border-radius: 8px;
  height: 120px;
  width: 100%;

  &.is-active {
    background-color: #ed89b3;
  }
  &.is-rejecting {
    background-color: #ef3e3e;
  }

  p {
    font-size: 3rem;
  }
`
const Title = styled.h2`
  font-size: 3rem;
`
