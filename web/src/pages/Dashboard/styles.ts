import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`

export const TableContainer = styled.section`
  margin-top: 64px;
`
