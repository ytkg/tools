import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Base64Converter from '../Base64Converter';

describe('Base64Converter', () => {
  it('renders the component', () => {
    render(<Base64Converter />);
    expect(screen.getByText('Base64 Converter')).toBeInTheDocument();
  });

  it('encodes text to Base64', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('Input');
    const encodeButton = screen.getByText('Encode');

    fireEvent.change(inputArea, { target: { value: 'hello world' } });
    fireEvent.click(encodeButton);

    const outputArea = screen.getByLabelText('Output');
    expect(outputArea).toHaveValue('aGVsbG8gd29ybGQ=');
  });

  it('decodes Base64 to text', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('Input');
    const decodeButton = screen.getByText('Decode');

    fireEvent.change(inputArea, { target: { value: 'aGVsbG8gd29ybGQ=' } });
    fireEvent.click(decodeButton);

    const outputArea = screen.getByLabelText('Output');
    expect(outputArea).toHaveValue('hello world');
  });

  it('shows an error for invalid Base64 string on decode', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('Input');
    const decodeButton = screen.getByText('Decode');

    fireEvent.change(inputArea, { target: { value: 'invalid base64' } });
    fireEvent.click(decodeButton);

    expect(screen.getByText(/Invalid Base64 string/)).toBeInTheDocument();
  });
});
