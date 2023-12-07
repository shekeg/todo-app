import { expect, it, describe, vi } from 'vitest';
import { useToast } from 'vue-toast-notification';

import { useToastNotifications } from './useToastNotifications';

vi.mock('vue-toast-notification', () => ({
  useToast: vi.fn(),
}));

describe('useToastNotifications', () => {
  it('should should init toast with "position: top"', () => {
    useToastNotifications();
    expect(useToast).toHaveBeenCalledWith({
      position: 'top',
    });
  });
});
