import { useField } from '@unform/core'
import { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props } from 'react-select'

import { Container } from './styles'

type SelectProps = Props<OptionTypeBase> & {
  name: string
}

export const Select: React.FC<SelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) return []
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  )
}
