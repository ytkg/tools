import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import JsonFormatter from '../JsonFormatter';

describe('JsonFormatter', () => {
  it('renders the component', () => {
    render(<JsonFormatter />);
    expect(screen.getByText('tools.json-formatter.name')).toBeInTheDocument();
  });

  it('formats valid JSON correctly', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByLabelText('tools.json-formatter.input_label');
    const formatButton = screen.getByText('tools.json-formatter.format_button');

    const unformattedJson = '{"b":2,"a":1}';
    const formattedJson = JSON.stringify({ b: 2, a: 1 }, null, 2);

    fireEvent.change(inputArea, { target: { value: unformattedJson } });
    fireEvent.click(formatButton);

    const outputArea = screen.getByLabelText('tools.json-formatter.output_label');
    expect(outputArea).toHaveValue(formattedJson);
  });

  it('shows an error for invalid JSON', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByLabelText('tools.json-formatter.input_label');
    const formatButton = screen.getByText('tools.json-formatter.format_button');

    const invalidJson = '{"b":2,"a":1';

    fireEvent.change(inputArea, { target: { value: invalidJson } });
    fireEvent.click(formatButton);

    expect(screen.getByText(/tools.json-formatter.error_invalid/)).toBeInTheDocument();
    const outputArea = screen.getByLabelText('tools.json-formatter.output_label');
    expect(outputArea).toHaveValue('');
  });
});
