import { Container } from './styles'

export const Modal: React.FC = ({ children }) => {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  )
}
