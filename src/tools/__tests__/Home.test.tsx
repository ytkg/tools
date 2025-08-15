import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../Home';

describe('Home', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Developer Tools')).toBeInTheDocument();
  });
});
