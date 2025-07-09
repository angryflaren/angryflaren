import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { getContactIcon } from '../lib/socialIcons';
import { Summary } from './Summary';
import { ContactInfo } from './ui/ContactInfo';
import { SocialProfiles } from './ui/SocialProfiles';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { ThemeSwitcher } from './ui/ThemeSwitcher';

interface HeaderProps {
  basics: NonNullable<ResumeSchema['basics']>;
  currentLanguage?: 'en' | 'ru';
  onLanguageChange?: (lang: 'en' | 'ru') => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const Header: FC<HeaderProps> = memo(
  ({ basics, currentLanguage, onLanguageChange, theme, onThemeChange }) => {
    const { name, label, email, phone, url, profiles, location, summary, image } =
      basics;
    const { icon: LocationIcon, color: locationColor } =
      getContactIcon('location');

    return (
      <header className="mb-6 print:mb-2">
        {/* --- Переключатели вынесены наверх --- */}
        <div className="flex justify-end w-full mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ThemeSwitcher current={theme} onChange={onThemeChange} />
            {currentLanguage && onLanguageChange && (
              <LanguageSwitcher
                current={currentLanguage}
                onChange={onLanguageChange}
              />
            )}
          </div>
        </div>

        {/* --- Основной блок шапки --- */}
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* -- Левая колонка: Информация -- */}
          <div className="text-center md:text-left">
            <h1 className="mb-1 text-4xl font-light text-foreground-muted sm:text-5xl print:text-[32px]">
              {name}
            </h1>
            <h2 className="mb-4 text-lg font-medium text-brand sm:text-xl print:mb-2 print:text-[16px]">
              {label}
            </h2>
            
            {/* Группа контактов с плотным интервалом */}
            <div className="flex flex-col items-center gap-1.5 md:items-start">
              {location && (
                <div
                  className="flex items-center gap-2 text-sm text-foreground-tertiary print:gap-1"
                  role="contentinfo"
                  aria-label="Location"
                >
                  <LocationIcon
                    style={{ color: locationColor }}
                    className="w-4 h-4 print:w-3 print:h-3"
                    aria-hidden="true"
                  />
                  {[
                    location.address,
                    location.city,
                    location.region,
                    location.postalCode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              )}
              <ContactInfo email={email} phone={phone} url={url} />
              <SocialProfiles profiles={profiles} />
            </div>
          </div>

          {/* -- Правая колонка: Фотография -- */}
          {image && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={`Фотография ${name}`}
                className="object-cover w-36 h-36 rounded-full"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* -- Блок "Обо мне" -- */}
        {summary && (
          <div className="mt-8 leading-relaxed text-foreground-secondary print:my-2 print:py-2">
            <Summary summary={summary} />
          </div>
        )}
      </header>
    );
  }
);
