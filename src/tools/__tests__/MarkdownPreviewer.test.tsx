import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import MarkdownPreviewer from '../MarkdownPreviewer';

describe('MarkdownPreviewer', () => {
  it('renders the component with initial markdown', () => {
    render(<MarkdownPreviewer />);
    expect(screen.getByText('Markdown Previewer')).toBeInTheDocument();
    // Check for an element from the initial markdown
    expect(screen.getByText('Block Quotes!')).toBeInTheDocument();
  });

  it('updates the preview when markdown is changed', () => {
    render(<MarkdownPreviewer />);
    const inputArea = screen.getByLabelText('Markdown Input');

    fireEvent.change(inputArea, { target: { value: '# New Header' } });

    // Check for the H1 element created by marked
    const header = screen.getByRole('heading', { level: 1, name: 'New Header' });
    expect(header).toBeInTheDocument();
  });
});
