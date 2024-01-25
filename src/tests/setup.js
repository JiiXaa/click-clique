import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { handlers } from '../mocks/handlers';
import { setupServer } from 'msw/node';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
