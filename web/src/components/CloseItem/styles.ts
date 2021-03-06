import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'

export const CloseItem = styled(AiOutlineClose)`
  color: #e83f5b;
  font-size: 2rem;
  position: absolute;
  margin: 20px 0px;
  transform: translateX(-40px);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff1f5b;
  }
`
