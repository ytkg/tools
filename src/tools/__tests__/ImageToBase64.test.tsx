import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import ImageToBase64 from '../ImageToBase64';

describe('ImageToBase64', () => {
  it('renders the component', () => {
    render(<ImageToBase64 />);
    expect(screen.getByText('Image to Base64 Converter')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('uploads an image and converts it to base64', async () => {
    render(<ImageToBase64 />);

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-input');

    // fireEvent.change doesn't work well with hidden inputs and user-event is not available
    // We will simulate the upload by directly setting the files property
    Object.defineProperty(input, 'files', {
        value: [file]
    });

    fireEvent.change(input);

    await waitFor(() => {
      const base64Input = screen.getByLabelText('Base64 String') as HTMLTextAreaElement;
      expect(base64Input.value).toContain('data:image/png;base64,');

      const imagePreview = screen.getByAltText('Uploaded preview');
      expect(imagePreview).toBeInTheDocument();
      expect(imagePreview).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });
  });

  it('shows an error for non-image files', async () => {
    render(<ImageToBase64 />);

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-input');

    Object.defineProperty(input, 'files', {
        value: [file]
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText('Please upload a valid image file.')).toBeInTheDocument();
    });
  });
});
