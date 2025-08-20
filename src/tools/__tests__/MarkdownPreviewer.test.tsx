import { render, screen, fireEvent } from '../../test-utils';
import { describe, it, expect } from 'vitest';
import MarkdownPreviewer from '../MarkdownPreviewer';

describe('MarkdownPreviewer', () => {
  it('renders the component with initial markdown', () => {
    render(<MarkdownPreviewer />);
    expect(screen.getByText('tools.markdown-previewer.name')).toBeInTheDocument();
    // Check that the input textarea has the initial markdown
    const inputArea = screen.getByLabelText('tools.markdown-previewer.input_label');
    expect(inputArea).toHaveValue('tools.markdown-previewer.initial_markdown');
  });

  it('updates the preview when markdown is changed', () => {
    render(<MarkdownPreviewer />);
    const inputArea = screen.getByLabelText('tools.markdown-previewer.input_label');

    fireEvent.change(inputArea, { target: { value: '# New Header' } });

    // Check for the H1 element created by marked
    const header = screen.getByRole('heading', { level: 1, name: 'New Header' });
    expect(header).toBeInTheDocument();
  });
});
