import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import HashGenerator from '../HashGenerator';

// Mock crypto.subtle
Object.defineProperty(window, 'crypto', {
  value: {
    subtle: {
      digest: async (algorithm: string, data: Uint8Array) => {
        // Return a predictable buffer for testing
        const text = new TextDecoder().decode(data);
        const mockHash = `${algorithm}-${text}`;
        return new TextEncoder().encode(mockHash).buffer;
      },
    },
  },
});


describe('HashGenerator', () => {
  it('renders the component', () => {
    render(<HashGenerator />);
    expect(screen.getByText('tools.hash-generator.name')).toBeInTheDocument();
  });

  it('generates hashes for input text', async () => {
    render(<HashGenerator />);
    const inputArea = screen.getByLabelText('tools.hash-generator.input_label');
    const generateButton = screen.getByText('tools.hash-generator.generate_button');

    fireEvent.change(inputArea, { target: { value: 'test' } });
    fireEvent.click(generateButton);

    // Wait for the hashes to appear
    const sha1Hash = await screen.findByText('5348412d312d74657374');
    const sha256Hash = await screen.findByText('5348412d3235362d74657374');
    const sha512Hash = await screen.findByText('5348412d3531322d74657374');

    expect(sha1Hash).toBeInTheDocument();
    expect(sha256Hash).toBeInTheDocument();
    expect(sha512Hash).toBeInTheDocument();
  });
});
