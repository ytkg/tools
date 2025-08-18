import { render, screen, fireEvent } from '../../test-utils';
import { act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ImageToBase64Converter from '../ImageToBase64Converter';

// Mock FileReader
let mockReader;

Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  });

describe('ImageToBase64Converter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockReader = {
            readAsDataURL: vi.fn(),
            onload: vi.fn(),
            onerror: vi.fn(),
        };
        vi.stubGlobal('FileReader', vi.fn(() => mockReader));
    });

  it('renders the component', () => {
    render(<ImageToBase64Converter />);
    expect(screen.getByText('Image to Base64 Converter')).toBeInTheDocument();
  });

  it('handles image file upload and conversion', async () => {
    render(<ImageToBase64Converter />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploadButton = screen.getByLabelText('Upload Image');

    await act(async () => {
        fireEvent.change(uploadButton, { target: { files: [file] } });
    });

    const base64String = 'data:image/png;base64,KOKMkOKWoV/ilqEp';
    await act(async () => {
        mockReader.onload({ target: { result: base64String } });
    });

    const output = screen.getByLabelText('Base64 Output');
    expect(output).toHaveValue(base64String);
    expect(screen.getByText('Selected file: chucknorris.png')).toBeInTheDocument();
  });

  it('shows an error for non-image files', async () => {
    render(<ImageToBase64Converter />);
    const file = new File(['not an image'], 'text.txt', { type: 'text/plain' });
    const uploadButton = screen.getByLabelText('Upload Image');

    await act(async () => {
        fireEvent.change(uploadButton, { target: { files: [file] } });
    });

    expect(screen.getByText('Please select an image file.')).toBeInTheDocument();
  });

  it('copies the base64 string to the clipboard', async () => {
    render(<ImageToBase64Converter />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploadButton = screen.getByLabelText('Upload Image');

    await act(async () => {
        fireEvent.change(uploadButton, { target: { files: [file] } });
    });

    const base64String = 'data:image/png;base64,KOKMkOKWoV/ilqEp';
    await act(async () => {
        mockReader.onload({ target: { result: base64String } });
    });

    const copyButton = screen.getByText('Copy to Clipboard');
    await act(async () => {
        fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(base64String);
  });
});
