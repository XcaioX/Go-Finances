import Link from 'next/link'

import { Container } from './styles'

interface HeaderProps {
  size?: 'small' | 'large'
}

export const Header: React.FC<HeaderProps> = ({ size = 'large' }) => {
  return (
    <Container size={size}>
      <header>
        <img src="/logo.svg" alt="GoFinances" />
        <nav>
          <Link href="/Dashboard">Home</Link>
          <Link href="/Import">Import</Link>
        </nav>
      </header>
    </Container>
  )
}
