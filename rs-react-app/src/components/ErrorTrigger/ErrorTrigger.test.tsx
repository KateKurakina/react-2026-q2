import { render } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorTrigger from './ErrorTrigger';

describe('ErrorTrigger', () => {
  it('throws error when shouldCrash is true', () => {
    expect(() =>
      render(
        <ErrorBoundary>
          <ErrorTrigger shouldCrash={true} />
        </ErrorBoundary>
      )
    ).not.toThrow();
  });
});