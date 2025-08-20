import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import UrlEncoderDecoder from '../UrlEncoderDecoder';

describe('UrlEncoderDecoder', () => {
  it('renders the component', () => {
    render(<UrlEncoderDecoder />);
    expect(screen.getByText('tools.url-encoder-decoder.name')).toBeInTheDocument();
  });

  it('encodes a URL component', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByLabelText('tools.url-encoder-decoder.input_label');
    const encodeButton = screen.getByText('tools.url-encoder-decoder.encode_button');

    const rawString = 'https://example.com/?q=test value';
    const encodedString = 'https%3A%2F%2Fexample.com%2F%3Fq%3Dtest%20value';

    fireEvent.change(inputArea, { target: { value: rawString } });
    fireEvent.click(encodeButton);

    const outputArea = screen.getByLabelText('tools.url-encoder-decoder.output_label');
    expect(outputArea).toHaveValue(encodedString);
  });

  it('decodes a URL component', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByLabelText('tools.url-encoder-decoder.input_label');
    const decodeButton = screen.getByText('tools.url-encoder-decoder.decode_button');

    const rawString = 'https://example.com/?q=test value';
    const encodedString = 'https%3A%2F%2Fexample.com%2F%3Fq%3Dtest%20value';

    fireEvent.change(inputArea, { target: { value: encodedString } });
    fireEvent.click(decodeButton);

    const outputArea = screen.getByLabelText('tools.url-encoder-decoder.output_label');
    expect(outputArea).toHaveValue(rawString);
  });
});
