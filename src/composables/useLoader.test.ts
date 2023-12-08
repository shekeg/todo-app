import { expect, test, describe } from 'vitest';

import { useLoader } from './useLoader';

describe('useLoader', () => {
  test('should have false as default value', () => {
    const { isLoading } = useLoader();
    expect(isLoading.value).toBe(false);
  });

  test('should set isLoading to true if startLoading is called', () => {
    const { isLoading, startLoading } = useLoader();
    startLoading();
    expect(isLoading.value).toBe(true);
  });

  test('should set isLoading to false if stopLoading is called', () => {
    const { isLoading, stopLoading } = useLoader();
    stopLoading();
    expect(isLoading.value).toBe(false);
  });
});
