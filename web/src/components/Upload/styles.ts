import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface UploadMessageProps {
  type?: 'success' | 'false' | 'default'
}

interface DropContainerProps {
  isDragActive: boolean
  isDragReject: boolean
  refKey?: string
  [key: string]: any
  type?: 'error'
}

const dragActive = css`
  border-color: '#12a454';
`

const dragReject = css`
  border-color: '#e86f5b';
`

export const DropContainer = styled.div.attrs({
  className: 'dropzone'
})`
  border: 1.5px dashed #969cb3;
  border-radius: 5px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: DropContainerProps): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive}

  ${(props: DropContainerProps): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject}
`

const messageColors = {
  default: '#5636D3',
  error: '#e83f5b',
  success: '#12a545'
}

export const UploadMessage = styled.div<UploadMessageProps>`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 48px 0;

  color: ${({ type }) => messageColors[type || 'default']};

  justify-content: center;
  align-items: center;
`
