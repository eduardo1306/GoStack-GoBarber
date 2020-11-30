import React from 'react';
import AxiosMock from 'axios-mock-adapter';

import { render, fireEvent, waitFor } from '@testing-library/react';

import Profile from '../../pages/Profile';
import api from '../../services/api';

const mockedApi = new AxiosMock(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedUpdateUser = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      updateUser: mockedUpdateUser,
    }),
  };
});

describe('Profile Page', () => {
  beforeEach(() => {
    mockedApi.reset();
    mockedAddToast.mockClear();
    mockedHistoryPush.mockClear();
  });

  it('should be able to change user password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação de senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(oldPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordField, { target: { value: '1234567' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '1234567' },
    });

    fireEvent.click(buttonElement);

    mockedApi.onPut('/profile').reply(200);

    await waitFor(() => {
      expect(mockedHistoryPush).toBeCalledWith('/dashboard');
      expect(mockedAddToast).toBeCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should be able to change user avatar', async () => {
    const { getByTestId, getByText } = render(<Profile />);

    const avatarInput = getByTestId('avatar-input');

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(avatarInput, { target: { files: ['avatar.jpg'] } });

    fireEvent.click(buttonElement);

    mockedApi.onPatch('/users/avatar').reply(200);

    await waitFor(() => {
      expect(mockedAddToast).toBeCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to change user password without passwords informations ', async () => {
    const { getByText } = render(<Profile />);

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.click(buttonElement);

    mockedApi.onPut('/profile').reply(400);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toBeCalledWith('/dashboard');
      expect(mockedAddToast).toBeCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
