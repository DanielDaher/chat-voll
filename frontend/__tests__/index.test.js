import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/index'

describe('Home', () => {
  it('testa se a homepage apresenta 2 inputs para o usuário inserir seu username', () => {
    render(<Home />);

    const userNameInputs = screen.getAllByPlaceholderText('Insira seu nome de usuário');

    expect(userNameInputs).toHaveLength(2);
  });

  it('testa se a homepage apresenta 2 inputs para o usuário inserir sua senha', () => {
    render(<Home />);

    const passwordInputs = screen.getAllByPlaceholderText('Insira sua senha');

    expect(passwordInputs).toHaveLength(2);
  });

  it('testa se, ao realizar o cadastro correto, o usuário é redirecionato para a tela webchat', () => {});

  it('testa se, ao realizar o cadastro INCORRETO, aparece uma mensagem de erro na tela', () => {});
  
  it('testa se, ao realizar o login correto, o usuário é redirecionato para a tela webchat', () => {});

  it('testa se, ao realizar o login INCORRETO, aparece uma mensagem de erro na tela', () => {});

})