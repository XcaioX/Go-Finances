import { Container } from './styles'

interface HeaderProps {
  size?: 'small' | 'large'
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }) => {
  return (
    <Container>
      <header>
        <img src="/logo.svg" alt="GoFinances" />
        <nav></nav>
      </header>
    </Container>
  )
}

export default Header
