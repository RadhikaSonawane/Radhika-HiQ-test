import styled, { keyframes } from 'styled-components'

import { Colors } from '../styles/variables'

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Loader = styled.div`
  border: 3px solid ${Colors.primary};
  border-radius: 50%;
  border-bottom: 3px solid rgba(243, 243, 243, 0.6);
  width: 60px;
  height: 60px;
  animation: ${Spin} 1s linear infinite;
`

export default Loader
