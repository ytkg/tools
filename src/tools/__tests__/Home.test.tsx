import { render, screen } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import Home from '../Home';

describe('Home', () => {
  it('renders the Tools heading', () => {
    render(<Home />);
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });
});
