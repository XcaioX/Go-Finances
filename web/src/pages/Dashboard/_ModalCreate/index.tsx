import { Modal } from '../../../components/Modal'

interface ModalCreateProps {
  createTransaction: Function
}

export const ModalCreate: React.FC<ModalCreateProps> = ({
  createTransaction
}) => {
  return (
    <Modal>
      <form onSubmit={data => createTransaction(data)}>
        <button type="submit"></button>
      </form>
      <h1>It works</h1>
    </Modal>
  )
}
