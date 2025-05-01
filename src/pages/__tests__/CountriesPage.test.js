// src/pages/__tests__/CountriesPage.test.js
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountriesPage from '../CountriesPage';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { AuthProvider } from '../../context/AuthContext';

describe('CountriesPage', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      capital: ['Washington, D.C.'],
      region: 'Americas',
      population: 331000000,
      flags: { png: 'https://flagcdn.com/w320/us.png' },
    },
  ];

  test('fetches and displays countries', async () => {
    mock.onGet('https://restcountries.com/v3.1/all').reply(200, mockCountries);

    render(
      <MemoryRouter>
        <AuthProvider>
          <CountriesPage />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });

  test('displays no countries found when search returns empty', async () => {
    mock.onGet('https://restcountries.com/v3.1/all').reply(200, mockCountries);
    mock.onGet(/name/).reply(404);

    render(
      <MemoryRouter>
        <AuthProvider>
          <CountriesPage />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Invalid' } });

    await waitFor(() => {
      expect(screen.getByText('No countries found.')).toBeInTheDocument();
    });
  });
});