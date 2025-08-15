import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NumberBaseConverter from '../NumberBaseConverter';

describe('NumberBaseConverter', () => {
  it('renders correctly with all fields', () => {
    render(<NumberBaseConverter />);
    expect(screen.getByLabelText('Decimal')).toBeInTheDocument();
    expect(screen.getByLabelText('Hexadecimal')).toBeInTheDocument();
    expect(screen.getByLabelText('Binary')).toBeInTheDocument();
    expect(screen.getByLabelText('Octal')).toBeInTheDocument();
  });

  it('converts from decimal to other bases', () => {
    render(<NumberBaseConverter />);
    const decimalInput = screen.getByLabelText('Decimal');
    fireEvent.change(decimalInput, { target: { value: '255' } });

    expect(screen.getByLabelText('Hexadecimal')).toHaveValue('ff');
    expect(screen.getByLabelText('Binary')).toHaveValue('11111111');
    expect(screen.getByLabelText('Octal')).toHaveValue('377');
  });

  it('converts from hexadecimal to other bases', () => {
    render(<NumberBaseConverter />);
    const hexInput = screen.getByLabelText('Hexadecimal');
    fireEvent.change(hexInput, { target: { value: '1a' } });

    expect(screen.getByLabelText('Decimal')).toHaveValue('26');
    expect(screen.getByLabelText('Binary')).toHaveValue('11010');
    expect(screen.getByLabelText('Octal')).toHaveValue('32');
  });

  it('clears all fields when one is cleared', () => {
    render(<NumberBaseConverter />);
    const decimalInput = screen.getByLabelText('Decimal');
    fireEvent.change(decimalInput, { target: { value: '123' } });
    fireEvent.change(decimalInput, { target: { value: '' } });

    expect(screen.getByLabelText('Hexadecimal')).toHaveValue('');
    expect(screen.getByLabelText('Binary')).toHaveValue('');
    expect(screen.getByLabelText('Octal')).toHaveValue('');
  });

  it('shows an error for invalid binary input', () => {
    render(<NumberBaseConverter />);
    const binaryInput = screen.getByLabelText('Binary');
    fireEvent.change(binaryInput, { target: { value: '102' } });

    expect(binaryInput).toBeInvalid();
    expect(screen.getByText('Invalid binary input')).toBeInTheDocument();
  });

  it('shows an error for invalid hex input', () => {
    render(<NumberBaseConverter />);
    const hexInput = screen.getByLabelText('Hexadecimal');
    fireEvent.change(hexInput, { target: { value: 'fg' } });

    expect(hexInput).toBeInvalid();
    expect(screen.getByText('Invalid hexadecimal input')).toBeInTheDocument();
  });
});
