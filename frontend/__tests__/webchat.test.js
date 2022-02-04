import '@testing-library/jest-dom/extend-expect' //https://github.com/testing-library/jest-dom/issues/167
import { render, screen } from '@testing-library/react';
import * as api from '../helpers/api';
import * as router from '../helpers/redirect';
import Webchat from '../pages/webchat';
import { mockedMessages } from '../helpers/testMock';
import * as help from '../helpers/chatBottom';

beforeEach(() => {
  jest.mock('../helpers/api.js', () => jest.fn());
  jest.mock('../helpers/chatBottom', () => jest.fn());
  help.goToChatBottom = jest.fn(() => null);
  router.redirectTo = jest.fn(() => window.location.pathname = '/');
  api.getMessagesFromDatabase = jest.fn(() => mockedMessages);
});

describe.skip('webchat', () => {
  it('testa se a página webchat renderiza as mensagens que já estão no banco de dados', async () => {
    render(<Webchat/>);
    
    const firstMessage = await screen.findByText(mockedMessages[0].message);
    expect(firstMessage).toBeInTheDocument();

    mockedMessages.map(async ({ message }) => {
      const currentMessage = await screen.findByText(message);
      expect(currentMessage).toBeInTheDocument();
      expect(currentMessage).toHaveTextContent(message);
    });
  });
});
