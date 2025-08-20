import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import JwtDecoder from '../JwtDecoder';

describe('JwtDecoder', () => {
  // A valid (but expired) JWT for testing
  const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const header = '{"alg":"HS256","typ":"JWT"}';
  const payload = '{"sub":"1234567890","name":"John Doe","iat":1516239022}';

  it('renders the component', () => {
    render(<JwtDecoder />);
    expect(screen.getByText('tools.jwt-decoder.name')).toBeInTheDocument();
  });

  it('decodes a valid JWT', async () => {
    render(<JwtDecoder />);
    const inputArea = screen.getByLabelText('tools.jwt-decoder.input_label');

    fireEvent.change(inputArea, { target: { value: validJwt } });

    const headerElement = await screen.findByTestId('jwt-header');
    const payloadElement = await screen.findByTestId('jwt-payload');

    // Using textContent to ignore whitespace and formatting
    expect(headerElement.textContent).toBe(JSON.stringify(JSON.parse(header), null, 2));
    expect(payloadElement.textContent).toBe(JSON.stringify(JSON.parse(payload), null, 2));
  });

  it('shows an error for an invalid JWT', () => {
    render(<JwtDecoder />);
    const inputArea = screen.getByLabelText('tools.jwt-decoder.input_label');

    fireEvent.change(inputArea, { target: { value: 'invalid.token.string' } });

    expect(screen.getByText(/tools.jwt-decoder.error_invalid/)).toBeInTheDocument();
  });
});
