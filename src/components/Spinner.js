import React from 'react'
import styled, {keyframes} from 'styled-components'

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const loadingKeyframe = keyframes`
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
`

const LoadingContainer = styled.div`
  width: 70px;
  height: 70px;
  display: inline-block;
  overflow: hidden;
  background: none;
`

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`

const InnerLoading = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  border: ${({theme}) => `4px solid ${theme.primary}`};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${loadingKeyframe} 1s linear infinite;
  top: 50%;
  left: 50%;
  box-sizing: content-box;
`

const SpinnerText = styled.p`
  margin: 1rem 0 0;
  font-size: 1.6rem;
  color: ${({theme}) => theme.primaryLight};
  text-align: center;
`

function Spinner({children}) {
  return (
    <SpinnerContainer>
      <LoadingContainer>
        <LoadingWrapper>
          <InnerLoading />
        </LoadingWrapper>
      </LoadingContainer>
      <SpinnerText>{children}</SpinnerText>
    </SpinnerContainer>
  )
}

export default Spinner
