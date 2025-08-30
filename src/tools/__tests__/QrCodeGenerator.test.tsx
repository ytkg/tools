import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import QrCodeGenerator from '../QrCodeGenerator';

describe('QrCodeGenerator', () => {
  it('renders the component and a default QR code', () => {
    render(<QrCodeGenerator />);
    expect(screen.getByText('tools.qr-code-generator.name')).toBeInTheDocument();
    // The qrcode.react library renders a <canvas> element which has a role of 'img'
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('updates the qr code when text is changed', () => {
    render(<QrCodeGenerator />);
    const input = screen.getByLabelText('tools.qr-code-generator.input_label');
    fireEvent.change(input, { target: { value: 'new value' } });
    // Just make sure it doesn't crash and the canvas is still there
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('allows changing foreground and background colors', () => {
    render(<QrCodeGenerator />);
    const fgInput = screen.getByLabelText('tools.qr-code-generator.fg_color_label');
    const bgInput = screen.getByLabelText('tools.qr-code-generator.bg_color_label');

    // Change colors and ensure the canvas still renders
    fireEvent.change(fgInput, { target: { value: '#ff0000' } });
    fireEvent.change(bgInput, { target: { value: '#00ff00' } });
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
