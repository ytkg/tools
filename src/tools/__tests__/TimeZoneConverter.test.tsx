import { render, screen, within } from '../../test-utils';
import { vi } from 'vitest';
import TimeZoneConverter from '../TimeZoneConverter';

vi.mock('date-fns-tz', () => ({
    format: (_: unknown, formatString: string, options?: { timeZone: string }) => {
        if (formatString === 'yyyy-MM-dd HH:mm:ss') {
            return `2024-01-01 12:00:00`;
        }
        if (formatString === 'XXX') {
            if (options?.timeZone === 'UTC') return '+00:00';
            if (options?.timeZone === 'Asia/Tokyo') return '+09:00';
            return '+00:00';
        }
        return '';
    }
}));

describe('TimeZoneConverter', () => {
    it('renders the component and default timezones', () => {
        render(<TimeZoneConverter />);
        expect(screen.getByText('tools.time-zone-converter.name')).toBeInTheDocument();

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
