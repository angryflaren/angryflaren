import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import { cn } from '../../lib/utils';

interface LanguageSwitcherProps {
  current: 'en' | 'ru';
  onChange: (lang: 'en' | 'ru') => void;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ current, onChange }) => {
  const { t } = useTranslation();
  const nextLang = current === 'ru' ? 'en' : 'ru';

  return (
    <button
      onClick={() => onChange(nextLang)}
      className={cn(
        'flex items-center gap-2 rounded-md p-2 text-sm transition-colors',
        'text-foreground-tertiary hover:text-brand hover:bg-surface-secondary'
      )}
      aria-label={t('header.switch_language') as string}
    >
      <BsGlobe className="w-4 h-4" aria-hidden="true" />
      <span className="font-medium">{nextLang.toUpperCase()}</span>
    </button>
  );
};
