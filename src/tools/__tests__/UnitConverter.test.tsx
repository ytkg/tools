import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import UnitConverter from '../UnitConverter';

describe('UnitConverter', () => {
  it('renders the component', () => {
    render(<UnitConverter />);
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
  });

  it('converts meters to feet', () => {
    render(<UnitConverter />);
    const valueInput = screen.getByLabelText('Value');
    fireEvent.change(valueInput, { target: { value: '10' } });
    const resultInput = screen.getByLabelText('Result');
    expect(resultInput).toHaveValue('32.8084');
  });

  it('converts kilograms to pounds', async () => {
    render(<UnitConverter />);

    // Open the conversion type select
    fireEvent.mouseDown(screen.getAllByRole('combobox')[0]);
    // Select weight
    const weightOption = await screen.findByRole('option', { name: 'Weight' });
    fireEvent.click(weightOption);

    const valueInput = screen.getByLabelText('Value');
    fireEvent.change(valueInput, { target: { value: '5' } });

    const resultInput = screen.getByLabelText('Result');
    expect(resultInput).toHaveValue('11.0231');
  });

  it('converts celsius to fahrenheit', async () => {
    render(<UnitConverter />);

    // Open the conversion type select
    fireEvent.mouseDown(screen.getAllByRole('combobox')[0]);
    // Select temperature
    const tempOption = await screen.findByRole('option', { name: 'Temperature' });
    fireEvent.click(tempOption);

    const valueInput = screen.getByLabelText('Value');
    fireEvent.change(valueInput, { target: { value: '20' } });

    const resultInput = screen.getByLabelText('Result');
    expect(resultInput).toHaveValue('68.0000');
  });

  it('switches units and recalculates', async () => {
    render(<UnitConverter />);
    // Default is length, m -> ft
    const valueInput = screen.getByLabelText('Value');
    fireEvent.change(valueInput, { target: { value: '1' } });
    const resultInput = screen.getByLabelText('Result');
    expect(resultInput).toHaveValue('3.2808');

    // Change from unit to feet
    fireEvent.mouseDown(screen.getAllByRole('combobox')[1]);
    const fromFootOption = await screen.findByRole('option', { name: 'Feet' });
    fireEvent.click(fromFootOption);

    // Change to unit to meters
    fireEvent.mouseDown(screen.getAllByRole('combobox')[2]);
    const toMeterOption = await screen.findByRole('option', { name: 'Meters' });
    fireEvent.click(toMeterOption);

    expect(resultInput).toHaveValue('0.3048');
  });
});
