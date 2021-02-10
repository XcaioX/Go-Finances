import { ReactNode } from 'react'
import Dropzone from 'react-dropzone'

import { UploadMessage, DropContainer } from './styles'

interface UploadProps {
  onUpload: Function
}

export const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const renderDragMessage = (
    isDragActive: boolean,
    isDragReject: boolean
  ): ReactNode => {
    if (!isDragActive) {
      return <UploadMessage>Select or drag to add.</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage>File not supported!</UploadMessage>
    }

    return <UploadMessage type="success">Drop the file here.</UploadMessage>
  }

  return (
    <>
      <Dropzone
        accept=".csv, application/vnd.ms-excel, text/csv"
        onDropAccepted={files => onUpload(files)}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input data-testid="upload" {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  )
}
