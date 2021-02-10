import styled from 'styled-components'

interface UploadMessageProps {
  type?: 'success' | 'false'
}

interface DropContainerProps {
  isDragActive: boolean
  isDragReject: boolean
}

export const UploadMessage = styled.div<UploadMessageProps>``

export const DropContainer = styled.div<DropContainerProps>``
