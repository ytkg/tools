import { render, screen, fireEvent } from '../../test-utils';
import { act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PasswordGenerator from '../PasswordGenerator';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe('PasswordGenerator', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

  it('renders the component', () => {
    render(<PasswordGenerator />);
    expect(screen.getByText('Password Generator')).toBeInTheDocument();
  });

  it('generates a password with default options', () => {
    render(<PasswordGenerator />);
    const passwordInput = screen.getByRole('textbox');
    expect(passwordInput.value).toHaveLength(16);
  });

  it('generates a password with a specific length', () => {
    render(<PasswordGenerator />);
    const slider = screen.getByRole('slider', { name: /Password Length/ });
    fireEvent.change(slider, { target: { value: '32' } });
    const passwordInput = screen.getByRole('textbox');
    expect(passwordInput.value).toHaveLength(32);
  });

  it('generates a password with only numbers', () => {
    render(<PasswordGenerator />);
    fireEvent.click(screen.getByLabelText('Include Uppercase Letters'));
    fireEvent.click(screen.getByLabelText('Include Lowercase Letters'));
    fireEvent.click(screen.getByLabelText('Include Symbols'));

    const passwordInput = screen.getByRole('textbox');
    expect(passwordInput.value).toMatch(/^[0-9]{16}$/);
  });

  it('generates a password with only symbols', () => {
    render(<PasswordGenerator />);
    fireEvent.click(screen.getByLabelText('Include Uppercase Letters'));
    fireEvent.click(screen.getByLabelText('Include Lowercase Letters'));
    fireEvent.click(screen.getByLabelText('Include Numbers'));

    const symbols = '!@#$%^&*()_+~|}{[]:;?><,./-=';
    const passwordInput = screen.getByRole('textbox');
    const password = passwordInput.value;

    expect(password).toHaveLength(16);
    for (const char of password) {
      expect(symbols).toContain(char);
    }
  });

  it('copies the password to the clipboard and shows feedback', async () => {
    vi.useFakeTimers();
    render(<PasswordGenerator />);
    const copyButton = screen.getByText('Copy to Clipboard');
    const passwordInput = screen.getByRole('textbox');
    const password = passwordInput.value;

    await act(async () => {
        fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(password);
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    await act(async () => {
        vi.runAllTimers();
    });

    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });
});
