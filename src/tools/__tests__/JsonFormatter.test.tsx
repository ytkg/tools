import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JsonFormatter from '../JsonFormatter';

describe('JsonFormatter', () => {
  it('renders the component', () => {
    render(<JsonFormatter />);
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument();
  });

  it('formats valid JSON correctly', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByLabelText('Input JSON');
    const formatButton = screen.getByText('Format');

    const unformattedJson = '{"b":2,"a":1}';
    const formattedJson = JSON.stringify({ b: 2, a: 1 }, null, 2);

    fireEvent.change(inputArea, { target: { value: unformattedJson } });
    fireEvent.click(formatButton);

    const outputArea = screen.getByLabelText('Formatted JSON');
    expect(outputArea).toHaveValue(formattedJson);
  });

  it('shows an error for invalid JSON', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByLabelText('Input JSON');
    const formatButton = screen.getByText('Format');

    const invalidJson = '{"b":2,"a":1';

    fireEvent.change(inputArea, { target: { value: invalidJson } });
    fireEvent.click(formatButton);

    expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
    const outputArea = screen.getByLabelText('Formatted JSON');
    expect(outputArea).toHaveValue('');
  });
});
