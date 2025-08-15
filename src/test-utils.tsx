import type { ReactElement } from 'react';
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const allTheProviders: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <HelmetProvider>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </HelmetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: allTheProviders, ...options });

export { customRender as render, screen, fireEvent, waitFor, within };
