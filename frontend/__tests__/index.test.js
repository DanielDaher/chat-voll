import '@testing-library/jest-dom/extend-expect' //https://github.com/testing-library/jest-dom/issues/167
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as api from '../helpers/api';
import Form from '../pages/Form';
import Home from '../pages/index';
/* import * as router from '../helpers/redirect';
import * as help from '../helpers/chatBottom';
import { mockedMessages } from '../helpers/testMock'; */


beforeEach(() => {
  jest.mock('../helpers/api.js', () => jest.fn());
});

afterEach(() => jest.clearAllMocks());

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

  it('testa se, ao realizar o cadastro INCORRETO, aparece uma mensagem de erro na tela', async () => {
    const error_response = { registerInfo: { error: 'Usuário inválido ou senha insegura' } };
    api.createUser = jest.fn(() => error_response);
    render(<Form submitType='register' />);

    const userNameInputs = screen.getByPlaceholderText('Insira seu nome de usuário');
    const passwordInputs = screen.getByPlaceholderText('Insira sua senha');
    const submitButton = screen.getByTestId('submit-button');
    
    userEvent.type(userNameInputs, 'john');
    userEvent.type(passwordInputs, 'ab');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(error_response.registerInfo.error);
    const errorMessageParagraph = await screen.findByTestId('show-error-message');

    expect(api.createUser).toHaveBeenCalledTimes(1);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessageParagraph).toHaveTextContent(error_response.registerInfo.error);
  });

  it('testa se, ao realizar o login INCORRETO, aparece uma mensagem de erro na tela', async () => {
    const error_response = { loginResponse: { error: 'Usuário ou senha incorretos' } };
    api.makeLogin = jest.fn(() => error_response);
    render(<Form submitType='login' />);

    const userNameInputs = screen.getByPlaceholderText('Insira seu nome de usuário');
    const passwordInputs = screen.getByPlaceholderText('Insira sua senha');
    const submitButton = screen.getByTestId('submit-button');
    
    userEvent.type(userNameInputs, 'john');
    userEvent.type(passwordInputs, 'ab');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(error_response.loginResponse.error);
    const errorMessageParagraph = await screen.findByTestId('show-error-message');

    expect(api.makeLogin).toHaveBeenCalledTimes(1);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessageParagraph).toHaveTextContent(error_response.loginResponse.error);
  });

  /* it('testa se, ao realizar o cadastro correto, o usuário é redirecionato para a tela webchat', async () => {
    const API_response = { registerInfo: { token: 'randomtoken123' } };
    jest.mock('../helpers/redirect');
    router.redirectTo = jest.fn(() => window.location.pathname = '/webchat');
    api.makeLogin = jest.fn(() => API_response);
    api.createUser = jest.fn(() => API_response);
    jest.mock('../helpers/chatBottom', () => jest.fn());
    help.goToChatBottom = jest.fn(() => null);
    api.getMessagesFromDatabase = jest.fn(() => mockedMessages);
    render(<Form submitType='register' />);

    const userNameInputs = screen.getByPlaceholderText('Insira seu nome de usuário');
    const passwordInputs = screen.getByPlaceholderText('Insira sua senha');
    const submitButton = screen.getByTestId('submit-button');
    
    userEvent.type(userNameInputs, 'john');
    userEvent.type(passwordInputs, 'abcd123dcba321');
    userEvent.click(submitButton);

    expect(router.redirectTo).toHaveBeenCalledTimes(1);
  
    const url = window.location.pathname;

    expect(url).toBe('/webchat');
  }); */
})