import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ColorConverter from '../ColorConverter';

describe('ColorConverter', () => {
  it('renders the component', () => {
    render(<ColorConverter />);
    expect(screen.getByText('Color Converter')).toBeInTheDocument();
  });

  it('updates RGB when HEX is changed', () => {
    render(<ColorConverter />);
    const hexInput = screen.getByLabelText('HEX');

    fireEvent.change(hexInput, { target: { value: '#FF0000' } });

    const rgbInput = screen.getByLabelText('RGB');
    expect(rgbInput).toHaveValue('rgb(255, 0, 0)');
  });

  it('updates HEX when RGB is changed', () => {
    render(<ColorConverter />);
    const rgbInput = screen.getByLabelText('RGB');

    fireEvent.change(rgbInput, { target: { value: 'rgb(0, 0, 255)' } });

    const hexInput = screen.getByLabelText('HEX');
    expect(hexInput).toHaveValue('#0000FF');
  });
});
