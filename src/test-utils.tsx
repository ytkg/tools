import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const AllTheProviders: React.FC<{children: React.ReactNode}> = ({ children }) => {
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
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
