import React from 'react';
import AxiosMock from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from '@testing-library/react';

import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const mockedApi = new AxiosMock(api);

const mockedHistoryPush = jest.fn();
const mockedToken = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: {
        replace: mockedToken,
      },
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Reset Password Page', () => {
  beforeEach(() => {
    mockedApi.reset();
    mockedAddToast.mockClear();
    mockedHistoryPush.mockClear();
    mockedToken.mockClear();
  });

  it('should be able to reset password', async () => {
    mockedToken.mockImplementation(() => {
      return {
        token: 'token-123',
      };
    });

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);
    const passwordField = getByPlaceholderText('Nova senha...');
    const password_confirmationField = getByPlaceholderText(
      'Confirmação da senha...',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(password_confirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    mockedApi.onPost('/password/reset').reply(200);

    await waitFor(() => {
      expect(mockedToken).toHaveReturnedWith(
        expect.objectContaining({
          token: 'token-123',
        }),
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to reset a password from unlogged user', async () => {
    mockedToken.mockImplementation(() => {
      return {
        token: null,
      };
    });

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha...');
    const password_confirmationField = getByPlaceholderText(
      'Confirmação da senha...',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(password_confirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    mockedApi.onPost('/password/reset').reply(400);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
