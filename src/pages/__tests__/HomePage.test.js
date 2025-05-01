// src/pages/__tests__/HomePage.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Test suite for HomePage component
describe('HomePage', () => {
  // Test that HomePage renders correctly
  test('renders tagline and description', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('🌍 Explore the World, One Country at a Time!')).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to the Countries App — your ultimate guide/)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Countries/i })).toHaveAttribute(
      'href',
      '/countries'
    );
  });
});