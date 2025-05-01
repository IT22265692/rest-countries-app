// src/components/__tests__/LoginForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm'; // Updated path
import { AuthContext } from '../../context/AuthContext';

// Test suite for LoginForm component
describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockOnClose = jest.fn();

  test('submits username and calls login', () => {
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginForm onClose={mockOnClose} />
      </AuthContext.Provider>
    );

    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'testuser' } });

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith('testuser');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not submit empty username', () => {
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginForm onClose={mockOnClose} />
      </AuthContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});