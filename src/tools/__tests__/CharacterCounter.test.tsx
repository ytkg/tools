import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import CharacterCounter from '../CharacterCounter';

describe('CharacterCounter', () => {
  it('renders the component', () => {
    render(<CharacterCounter />);
    expect(screen.getByText('tools.character-counter.name')).toBeInTheDocument();
  });

  it('updates counts as user types', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByLabelText('tools.character-counter.label');

    const testString = 'Hello world.\nThis is a test.';
    fireEvent.change(inputArea, { target: { value: testString } });

    // Characters (with spaces)
    expect(screen.getByText('28')).toBeInTheDocument();
    // Characters (no spaces)
    expect(screen.getByText('23')).toBeInTheDocument();
    // Words
    expect(screen.getByText('6')).toBeInTheDocument();
     // Lines
     expect(screen.getByText('2')).toBeInTheDocument();
  });
});
