import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import PasswordGenerator from '../PasswordGenerator';

describe('PasswordGenerator', () => {
  it('renders the component and generates a password by default', () => {
    render(<PasswordGenerator />);
    expect(screen.getByText('Password Generator')).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(passwordInput.value).not.toBe('');
    expect(passwordInput.value.length).toBe(16); // Default length
  });

  it('generates a password with only lowercase letters', async () => {
    render(<PasswordGenerator />);

    fireEvent.click(screen.getByLabelText('Uppercase (A-Z)'));
    fireEvent.click(screen.getByLabelText('Numbers (0-9)'));
    fireEvent.click(screen.getByLabelText('Symbols (!@#$...)'));

    // Force a re-generation
    fireEvent.click(screen.getByText('Generate New Password'));

    const passwordInput = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(passwordInput.value).toMatch(/^[a-z]+$/);
  });

  it('generates a password with only numbers', async () => {
    render(<PasswordGenerator />);

    fireEvent.click(screen.getByLabelText('Uppercase (A-Z)'));
    fireEvent.click(screen.getByLabelText('Lowercase (a-z)'));
    fireEvent.click(screen.getByLabelText('Symbols (!@#$...)'));

    fireEvent.click(screen.getByText('Generate New Password'));

    const passwordInput = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(passwordInput.value).toMatch(/^[0-9]+$/);
  });

  it('generates an empty password if no options are selected', async () => {
    render(<PasswordGenerator />);

    fireEvent.click(screen.getByLabelText('Uppercase (A-Z)'));
    fireEvent.click(screen.getByLabelText('Lowercase (a-z)'));
    fireEvent.click(screen.getByLabelText('Numbers (0-9)'));
    fireEvent.click(screen.getByLabelText('Symbols (!@#$...)'));

    fireEvent.click(screen.getByText('Generate New Password'));

    const passwordInput = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(passwordInput.value).toBe('');
  });
});
