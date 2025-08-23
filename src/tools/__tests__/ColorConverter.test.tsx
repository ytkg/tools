import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import ColorConverter from '../ColorConverter';

describe('ColorConverter', () => {
  it('renders the component', () => {
    render(<ColorConverter />);
    expect(screen.getByText('tools.color-converter.name')).toBeInTheDocument();
  });

  it('updates RGB when HEX is changed', () => {
    render(<ColorConverter />);
    const hexInput = screen.getByLabelText('tools.color-converter.hex_label');

    fireEvent.change(hexInput, { target: { value: '#FF0000' } });

    const rgbInput = screen.getByLabelText('tools.color-converter.rgb_label');
    expect(rgbInput).toHaveValue('rgb(255, 0, 0)');
  });

  it('updates HEX when RGB is changed', () => {
    render(<ColorConverter />);
    const rgbInput = screen.getByLabelText('tools.color-converter.rgb_label');

    fireEvent.change(rgbInput, { target: { value: 'rgb(0, 0, 255)' } });

    const hexInput = screen.getByLabelText('tools.color-converter.hex_label');
    expect(hexInput).toHaveValue('#0000FF');
  });
});
