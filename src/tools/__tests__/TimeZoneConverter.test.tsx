import { render, screen, within } from '../../test-utils';
import { vi } from 'vitest';
import TimeZoneConverter from '../TimeZoneConverter';

vi.mock('date-fns-tz', () => ({
    toZonedTime: () => {
        // Return a consistent date for testing, ignoring the actual timezone logic
        return new Date(`2024-01-01T12:00:00.000Z`);
    },
    format: (_: unknown, formatString: string) => {
        // Mock the format function as well
        if (formatString === 'yyyy-MM-dd HH:mm:ss') return '2024-01-01 12:00:00';
        if (formatString === 'XXX') return '+00:00';
        return '';
    }
}));

describe('TimeZoneConverter', () => {
    it('renders the component and default timezones', () => {
        render(<TimeZoneConverter />);
        expect(screen.getByText('Time Zone Converter')).toBeInTheDocument();

        const list = screen.getByRole('list');
        const listItems = within(list).getAllByRole('listitem');

        expect(listItems.length).toBe(2);

        // Check for UTC
        const utcItem = listItems[0];
        expect(within(utcItem).getByText('UTC')).toBeInTheDocument();

        // Check for Asia/Tokyo
        const tokyoItem = listItems[1];
        expect(within(tokyoItem).getByText('Asia/Tokyo')).toBeInTheDocument();
    });
});
