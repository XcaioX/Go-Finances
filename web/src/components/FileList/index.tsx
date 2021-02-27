import { Container, FileInfo } from './styles'

interface FileProps {
  name: string
  readableSize: string
}

interface FileListProps {
  files: FileProps[]
}

export const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.name}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
          </FileInfo>
        </li>
      ))}
    </Container>
  )
}

export default FileList
