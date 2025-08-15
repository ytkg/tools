import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CaseConverter from '../CaseConverter';

// Mock clipboard API
vi.stubGlobal('navigator', {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe('CaseConverter', () => {
  it('renders correctly and converts text to all cases', () => {
    render(<CaseConverter />);

    const inputField = screen.getByLabelText(/Enter your text here/i);
    expect(inputField).toBeInTheDocument();

    const testString = 'hello world';
    fireEvent.change(inputField, { target: { value: testString } });

    // Helper function to check output
    const checkOutput = (title: string, value: string) => {
      const container = screen.getByText(title).closest('div');
      expect(within(container!).getByText(value)).toBeInTheDocument();
    };

    // Check for rendered output values
    checkOutput('UPPER CASE', 'HELLO WORLD');
    checkOutput('lower case', 'hello world');
    checkOutput('camelCase', 'helloWorld');
    checkOutput('PascalCase', 'HelloWorld');
    checkOutput('snake_case', 'hello_world');
    checkOutput('kebab-case', 'hello-world');
  });

  it('handles more complex input strings', () => {
    render(<CaseConverter />);
    const inputField = screen.getByLabelText(/Enter your text here/i);

    const testString = 'Foo-Bar_baz';
    fireEvent.change(inputField, { target: { value: testString } });

    // Helper function to check output
    const checkOutput = (title: string, value: string) => {
      const container = screen.getByText(title).closest('div');
      expect(within(container!).getByText(value)).toBeInTheDocument();
    };

    checkOutput('UPPER CASE', 'FOO-BAR_BAZ');
    checkOutput('lower case', 'foo-bar_baz');
    checkOutput('camelCase', 'fooBarBaz');
    checkOutput('PascalCase', 'FooBarBaz');
    checkOutput('snake_case', 'foo_bar_baz');
    checkOutput('kebab-case', 'foo-bar-baz');
  });

  it('copy button works', async () => {
    render(<CaseConverter />);
    const inputField = screen.getByLabelText(/Enter your text here/i);
    const testString = 'test copy';
    fireEvent.change(inputField, { target: { value: testString } });

    // Find the copy button for UPPER CASE
    const upperCasePaper = screen.getByText('UPPER CASE').closest('div');
    const copyButton = upperCasePaper?.querySelector('button');

    expect(copyButton).not.toBeDisabled();
    if (copyButton) {
      fireEvent.click(copyButton);
    }

    // Check if clipboard.writeText was called with the correct value
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('TEST COPY');
  });
});
