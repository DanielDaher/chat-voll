import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const userNameInputs = screen.getAllByPlaceholderText('Insira seu nome de usuário');

    expect(userNameInputs).toHaveLength(2);
  })
})