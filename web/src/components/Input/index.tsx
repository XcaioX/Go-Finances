import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

export const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { registerField, fieldName, error, defaultValue } = useField(name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
      {error && <span>{error}</span>}
    </Container>
  )
}
