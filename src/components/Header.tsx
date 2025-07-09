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
      <header className="mb-4 print:mb-2">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* -- Основная информация (слева) -- */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="mb-1 text-4xl font-bold text-foreground sm:text-5xl print:text-[32px]">
              {name}
            </h1>
            {label && (
              <h2 className="mb-3 text-lg font-medium text-brand sm:text-xl print:mb-1 print:text-[16px]">
                {label}
              </h2>
            )}

            <div className="flex flex-col items-center gap-2 md:items-start">
              {location && (
                <div
                  className="flex items-center gap-2 print:gap-1"
                  role="contentinfo"
                  aria-label="Location"
                >
                  <LocationIcon
                    style={{ color: locationColor }}
                    className="w-4 h-4 text-brand print:w-3 print:h-3"
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

          {/* -- Фотография и переключатели (справа) -- */}
          <div className="flex flex-col items-center flex-shrink-0 gap-4">
            <div className="flex items-center gap-2 print:hidden">
              <ThemeSwitcher current={theme} onChange={onThemeChange} />
              {currentLanguage && onLanguageChange && (
                <LanguageSwitcher
                  current={currentLanguage}
                  onChange={onLanguageChange}
                />
              )}
            </div>
            {image && (
              <img
                src={image}
                alt={`Фотография ${name}`}
                className="object-cover w-32 h-32 rounded-full md:w-36 md:h-36"
                aria-hidden="true"
                loading="lazy"
              />
            )}
          </div>
        </div>

        {/* -- Блок "Обо мне" -- */}
        {summary && (
          <div className="mt-6 leading-relaxed text-center text-foreground-secondary md:text-left print:my-2 print:py-2">
            <Summary summary={summary} />
          </div>
        )}
      </header>
    );
  }
);
