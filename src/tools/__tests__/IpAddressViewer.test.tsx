import { render, screen, waitFor } from '../../test-utils';
import { vi } from 'vitest';
import IpAddressViewer from '../IpAddressViewer';

global.fetch = vi.fn();

const createFetchResponse = (data: any) => {
    return { json: () => new Promise((resolve) => resolve(data)), ok: true };
};

describe('IpAddressViewer', () => {
    it('renders the component and displays IP information', async () => {
        const mockIpInfo = {
            ip: '123.45.67.89',
            city: 'Test City',
            country_name: 'Test Country',
        };
        (fetch as any).mockResolvedValue(createFetchResponse(mockIpInfo));

        render(<IpAddressViewer />);

        expect(screen.getByText('IP Address Viewer')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('123.45.67.89')).toBeInTheDocument();
            expect(screen.getByText('Test City')).toBeInTheDocument();
        });
    });
});
