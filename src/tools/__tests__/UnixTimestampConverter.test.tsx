import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UnixTimestampConverter from '../UnixTimestampConverter';

describe('UnixTimestampConverter', () => {

  // Mock date to have consistent results
  vi.spyOn(Date, 'now').mockImplementation(() => 1672531200000); // 2023-01-01 00:00:00 UTC

  it('renders the component and current timestamp', () => {
    render(<UnixTimestampConverter />);
    expect(screen.getByText('Unix Timestamp Converter')).toBeInTheDocument();
    expect(screen.getByText('1672531200')).toBeInTheDocument();
  });

  it('converts timestamp to date', () => {
    render(<UnixTimestampConverter />);
    const input = screen.getByLabelText('Unix Timestamp');
    const convertButton = screen.getAllByText('Convert')[0];

    fireEvent.change(input, { target: { value: '1672531200' } });
    fireEvent.click(convertButton);

    expect(screen.getByText(/Sun, 01 Jan 2023/)).toBeInTheDocument();
  });

  it('converts date to timestamp', () => {
    render(<UnixTimestampConverter />);
    const input = screen.getByLabelText('Date/Time String');
    const convertButton = screen.getAllByText('Convert')[1];

    // Note: The result of new Date() can be timezone-dependent.
    // This test might be brittle if run in different environments.
    // For this case, we'll use a specific format.
    fireEvent.change(input, { target: { value: '2023-01-01T00:00:00.000Z' } });
    fireEvent.click(convertButton);

    expect(screen.getByTestId('date-to-ts-output')).toHaveTextContent('1672531200');
  });
});
