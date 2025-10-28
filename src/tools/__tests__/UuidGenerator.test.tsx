import { render, screen, fireEvent } from '../../test-utils';
import { act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UuidGenerator from '../UuidGenerator';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe('UuidGenerator', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders the component and generates a UUID on load', () => {
    const mockUuid = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUuid);

    render(<UuidGenerator />);
    expect(screen.getByText('UUID/GUID Generator')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(mockUuid);
  });

  it('generates a new UUID when the button is clicked', () => {
    const initialUuid = '11111111-1111-1111-1111-111111111111';
    const newUuid = '22222222-2222-2222-2222-222222222222';

    const randomUUIDSpy = vi.spyOn(crypto, 'randomUUID');
    randomUUIDSpy.mockReturnValueOnce(initialUuid);

    render(<UuidGenerator />);

    expect(screen.getByRole('textbox')).toHaveValue(initialUuid);

    randomUUIDSpy.mockReturnValueOnce(newUuid);

    const generateButton = screen.getByText('Generate New UUID');
    fireEvent.click(generateButton);

    expect(screen.getByRole('textbox')).toHaveValue(newUuid);
  });

  it('copies the UUID to the clipboard and shows feedback', async () => {
    vi.useFakeTimers();
    const mockUuid = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUuid);

    render(<UuidGenerator />);
    const copyButton = screen.getByText('Copy to Clipboard');

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockUuid);
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    // Fast-forward timers
    await act(async () => {
        vi.runAllTimers();
    });

    // The button text should revert
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });
});
