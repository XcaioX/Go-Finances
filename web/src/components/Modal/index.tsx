import { Container } from './styles'

export interface ModalProps {
  showModal?: boolean
}

export const Modal: React.FC<ModalProps> = ({ showModal, children }) => {
  return <>{showModal && <Container>{children}</Container>}</>
}
