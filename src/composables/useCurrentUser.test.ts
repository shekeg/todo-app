import { expect, test, describe } from 'vitest';

import { useCurrentUser } from './useCurrentUser';

describe('useCurrentUser', () => {
  test('should return 5 as the current user ID', () => {
    const { id } = useCurrentUser();
    expect(id).toBe(5);
  });
});
