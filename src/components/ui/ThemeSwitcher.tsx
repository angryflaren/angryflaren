import { FC } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { cn } from '../../lib/utils';

type Theme = 'light' | 'dark';

interface ThemeSwitcherProps {
  current: Theme;
  onChange: (theme: Theme) => void;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ current, onChange }) => {
  const nextTheme = current === 'light' ? 'dark' : 'light';

  return (
    <button
      onClick={() => onChange(nextTheme)}
      className={cn(
        'flex items-center gap-2 rounded-md p-2 text-sm transition-colors',
        'text-foreground-tertiary hover:text-brand hover:bg-surface-secondary'
      )}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {current === 'light' ? (
        <BsMoon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <BsSun className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
};
