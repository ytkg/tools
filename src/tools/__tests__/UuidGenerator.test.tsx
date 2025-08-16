import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UuidGenerator from '../UuidGenerator';

// Mock the uuid library
vi.mock('uuid', () => ({
  v1: vi.fn(() => '11111111-1111-1111-1111-111111111111'),
  v4: vi.fn(() => '44444444-4444-4444-4444-444444444444'),
}));

describe('UuidGenerator', () => {
  // We need to import the mocked functions after the mock is established.
  let v1Mock: vi.Mock;
  let v4Mock: vi.Mock;

  beforeEach(async () => {
    // Dynamically import the mocked module to get the spy instances
    const uuid = await import('uuid');
    v1Mock = uuid.v1 as vi.Mock;
    v4Mock = uuid.v4 as vi.Mock;
    vi.clearAllMocks();
  });

  it('renders the component and generates a v4 UUID by default', async () => {
    render(<UuidGenerator />);
    // Need to wait for the component to generate the initial UUID
    await screen.findByDisplayValue('44444444-4444-4444-4444-444444444444');
    expect(screen.getByText('UUID/GUID Generator')).toBeInTheDocument();

    const uuidInput = screen.getByLabelText('Generated UUID') as HTMLInputElement;
    expect(uuidInput.value).toBe('44444444-4444-4444-4444-444444444444');
    expect(v4Mock).toHaveBeenCalledTimes(1);
  });

  it('generates a new v4 UUID when the button is clicked', async () => {
    render(<UuidGenerator />);
    await screen.findByDisplayValue('44444444-4444-4444-4444-444444444444');
    v4Mock.mockClear();

    const generateButton = screen.getByText('Generate New UUID');
    fireEvent.click(generateButton);

    const uuidInput = screen.getByLabelText('Generated UUID') as HTMLInputElement;
    expect(uuidInput.value).toBe('44444444-4444-4444-4444-444444444444');
    expect(v4Mock).toHaveBeenCalledTimes(1);
  });

  it('switches to v1 and generates a v1 UUID', async () => {
    render(<UuidGenerator />);
    await screen.findByDisplayValue('44444444-4444-4444-4444-444444444444');
    v4Mock.mockClear();

    const v1RadioButton = screen.getByLabelText('Version 1');
    fireEvent.click(v1RadioButton);

    await screen.findByDisplayValue('11111111-1111-1111-1111-111111111111');
    const uuidInput = screen.getByLabelText('Generated UUID') as HTMLInputElement;
    expect(uuidInput.value).toBe('11111111-1111-1111-1111-111111111111');
    expect(v1Mock).toHaveBeenCalledTimes(1);
    expect(v4Mock).not.toHaveBeenCalled();
  });
});
