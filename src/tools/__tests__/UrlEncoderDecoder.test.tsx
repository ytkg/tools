import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UrlEncoderDecoder from '../UrlEncoderDecoder';

describe('UrlEncoderDecoder', () => {
  it('renders the component', () => {
    render(<UrlEncoderDecoder />);
    expect(screen.getByText('URL Encoder / Decoder')).toBeInTheDocument();
  });

  it('encodes a URL component', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByLabelText('Input / Output');
    const encodeButton = screen.getByText('Encode');

    const rawString = 'https://example.com/?q=test value';
    const encodedString = 'https%3A%2F%2Fexample.com%2F%3Fq%3Dtest%20value';

    fireEvent.change(inputArea, { target: { value: rawString } });
    fireEvent.click(encodeButton);

    const outputArea = screen.getByLabelText('Result');
    expect(outputArea).toHaveValue(encodedString);
  });

  it('decodes a URL component', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByLabelText('Input / Output');
    const decodeButton = screen.getByText('Decode');

    const rawString = 'https://example.com/?q=test value';
    const encodedString = 'https%3A%2F%2Fexample.com%2F%3Fq%3Dtest%20value';

    fireEvent.change(inputArea, { target: { value: encodedString } });
    fireEvent.click(decodeButton);

    const outputArea = screen.getByLabelText('Result');
    expect(outputArea).toHaveValue(rawString);
  });
});
