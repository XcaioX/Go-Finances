import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container>
      <button {...rest}>{children}</button>
    </Container>
  )
}
