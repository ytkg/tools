import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import App from '../../App';

describe('Routing redirects unsupported locales', () => {
  it('redirects /fr/json-formatter to /ja/json-formatter', async () => {
    window.history.pushState({}, 'Test', '/fr/json-formatter');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/ja/json-formatter');
    });
  });
});

