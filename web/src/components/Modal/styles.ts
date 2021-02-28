import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(242, 243, 245, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background: #fff;
    width: 100%;
    max-width: 400px;
    padding: 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0 0 68px rgba(0, 0, 0, 0.05);
    position: relative;
  }
`
