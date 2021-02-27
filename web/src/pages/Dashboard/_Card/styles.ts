import styled, { css } from 'styled-components'

interface CardProps {
  type: string
}

export const Container = styled.div<CardProps>`
  background: ${({ type }) => (type === 'total' ? '#FF872C' : '#fff')};
  color: ${({ type }) => (type === 'total' ? '#fff' : '#363F5F')};
  padding: 22px 32px;
  border-radius: 5px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`
