import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import UnitConverter from '../UnitConverter';

describe('UnitConverter', () => {
  it('renders the component and performs a length conversion', () => {
    render(<UnitConverter />);

    // Check for title
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();

    const input = screen.getByLabelText('Input');
    fireEvent.change(input, { target: { value: '10' } });

    // Default is meters to feet
    expect(screen.getByText('32.80840')).toBeInTheDocument();
  });

  it('performs a weight conversion', async () => {
    render(<UnitConverter />);

    // Change conversion type to Weight
    const conversionTypeSelect = screen.getByLabelText('Conversion Type');
    fireEvent.mouseDown(conversionTypeSelect);
    const weightOption = await screen.findByText('Weight');
    fireEvent.click(weightOption);

    const input = screen.getByLabelText('Input');
    fireEvent.change(input, { target: { value: '5' } });

    // Default is kilograms to pounds
    // Use findByText to wait for the value to update
    expect(await screen.findByText('11.02310')).toBeInTheDocument();
  });

  it('performs a temperature conversion', async () => {
    render(<UnitConverter />);

    // Change conversion type to Temperature
    const conversionTypeSelect = screen.getByLabelText('Conversion Type');
    fireEvent.mouseDown(conversionTypeSelect);
    const tempOption = await screen.findByText('Temperature');
    fireEvent.click(tempOption);

    const input = screen.getByLabelText('Input');
    fireEvent.change(input, { target: { value: '100' } });

    // Default is Celsius to Fahrenheit
    // Use findByText to wait for the value to update
    expect(await screen.findByText('212.00000')).toBeInTheDocument();
  });
});
