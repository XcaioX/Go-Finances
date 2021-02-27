import { useRouter } from 'next/router'
import { useState } from 'react'

import { Header } from '@/components/Header'
import { Upload } from '@/components/Upload'
import { FileList } from '@/components/FileList'

import { Container, Title, ImportFileContainer, Footer } from './styles'

interface FileProps {
  file: File
  name: string
  readableSize: string
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([])
  const router = useRouter()

  const handleUpload = (): Promise<void> => {
    try {
    } catch (error) {}
  }

  const submitFile = (file: File[]): void => {}

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Import a transaction</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src="/alert.svg" alt="Alert" />
              Only csv files allowed!
            </p>
            <button onClick={handleUpload} type="button">
              Upload
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  )
}

export default Import
