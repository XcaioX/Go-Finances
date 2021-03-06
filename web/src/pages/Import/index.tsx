import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import filesize from 'filesize'

import { Header } from '@/components/Header'
import { Upload } from '@/components/Upload'
import { FileList } from '@/components/FileList'

import { Container, Title, ImportFileContainer, Footer } from './styles'
import { api } from '@/services/api'
import { transactionContext } from '@/hooks/TransactionContext'

interface FileProps {
  file: File
  name: string
  readableSize: string
}

const Import: React.FC = () => {
  const { addTransactions } = useContext(transactionContext)
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([])
  const router = useRouter()

  const handleUpload = async (): Promise<void> => {
    const data = new FormData()

    if (!uploadedFiles.length) return

    const file = uploadedFiles[0]
    data.append('file', file.file, file.name)

    try {
      const response = await api.post('/transactions/import', data)
      const transactions = response.data.data
      addTransactions(transactions[0])

      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const submitFile = (files: File[]): void => {
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size)
    }))

    setUploadedFiles(uploadFiles)
  }

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
