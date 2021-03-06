import { Balance } from '@/hooks/TransactionContext'
import { ImgHTMLAttributes } from 'react'

import { Container } from './styles'

interface CardProps extends ImgHTMLAttributes<HTMLImageElement> {
  balance: Balance
  type: string
}

export const Card: React.FC<CardProps> = ({ balance, type, ...rest }) => {
  return (
    <Container type={type}>
      <header>
        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <img {...rest} />
      </header>
      <h1>{balance[type]}</h1>
    </Container>
  )
}
