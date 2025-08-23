import { render, screen, fireEvent, within } from '../../test-utils';
import KeyboardEventViewer from '../KeyboardEventViewer';

describe('KeyboardEventViewer', () => {
    it('renders the component and displays keyboard event info', () => {
        render(<KeyboardEventViewer />);
        expect(screen.getByText('tools.keyboard-event-viewer.name')).toBeInTheDocument();

        fireEvent.keyDown(window, { key: 'a', code: 'KeyA', keyCode: 65 });

        const table = screen.getByRole('table');
        expect(within(table).getByText('a')).toBeInTheDocument();
        expect(within(table).getByText('KeyA')).toBeInTheDocument();
        expect(within(table).getByText('65')).toBeInTheDocument();
    });
});
