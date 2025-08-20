import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import Base64Converter from '../Base64Converter';

describe('Base64Converter', () => {
  it('renders the component', () => {
    render(<Base64Converter />);
    expect(screen.getByText('tools.base64-converter.name')).toBeInTheDocument();
  });

  it('encodes text to Base64', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('tools.base64-converter.inputLabel');
    const encodeButton = screen.getByText('tools.base64-converter.encode_button');

    fireEvent.change(inputArea, { target: { value: 'hello world' } });
    fireEvent.click(encodeButton);

    const outputArea = screen.getByLabelText('tools.base64-converter.outputLabel');
    expect(outputArea).toHaveValue('aGVsbG8gd29ybGQ=');
  });

  it('decodes Base64 to text', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('tools.base64-converter.inputLabel');
    const decodeButton = screen.getByText('tools.base64-converter.decode_button');

    fireEvent.change(inputArea, { target: { value: 'aGVsbG8gd29ybGQ=' } });
    fireEvent.click(decodeButton);

    const outputArea = screen.getByLabelText('tools.base64-converter.outputLabel');
    expect(outputArea).toHaveValue('hello world');
  });

  it('shows an error for invalid Base64 string on decode', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByLabelText('tools.base64-converter.inputLabel');
    const decodeButton = screen.getByText('tools.base64-converter.decode_button');

    fireEvent.change(inputArea, { target: { value: 'invalid base64' } });
    fireEvent.click(decodeButton);

    expect(screen.getByText(/tools.base64-converter.error_decoding/)).toBeInTheDocument();
  });
});
