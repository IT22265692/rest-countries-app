// src/components/__tests__/CountryCard.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../CountryCard';
import { AuthContext } from '../../context/AuthContext';

describe('CountryCard', () => {
  const mockCountry = {
    cca3: 'USA',
    name: { common: 'United States' },
    flags: { png: 'flag.png' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331000000,
  };

  test('renders country details without favorite button when not logged in', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: null }}>
          <CountryCard country={mockCountry} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText(/Washington, D.C./)).toBeInTheDocument();
    expect(screen.getByText(/Americas/)).toBeInTheDocument();
    expect(screen.getByText(/331,000,000/)).toBeInTheDocument();
    expect(screen.queryByText(/Add Favorite/i)).not.toBeInTheDocument();
  });

  test('toggles favorite status when logged in', async () => {
    const user = { username: 'testuser' };
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify([]));

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user }}>
          <CountryCard country={mockCountry} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByText('Add Favorite');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Remove Favorite')).toBeInTheDocument();
    });
  });
});