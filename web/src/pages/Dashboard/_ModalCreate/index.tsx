import { useCallback, useContext, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import {
  transactionContext,
  TransactionData
} from '@/hooks/TransactionProvider'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { api } from '@/services/api'

export const ModalCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addTransactions, setShowModal } = useContext(transactionContext)

  const handleSubmit = useCallback(async (transaction: TransactionData) => {
    const newTransaction = {
      value: +transaction.value,
      title: transaction.title,
      category: transaction.category,
      type: transaction.type.toUpperCase()
    }
    const response = await api.post('/transactions', newTransaction)
    addTransactions(response.data.data)
    setShowModal(false)
  }, [])

  return (
    <Modal>
      <button type="button" onClick={() => setShowModal(false)}>
        X
      </button>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="title" placeholder="Transaction title" />
        <Input name="value" placeholder="Value" />
        <Input name="category" placeholder="Category" />
        <Select
          name="type"
          options={[
            { value: 'income', label: 'Income' },
            { value: 'outcome', label: 'Outcome' }
          ]}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Modal>
  )
}
