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
      <header className="relative mb-2 print:mb-0 print:p-0">
        {/* --- Переключатели языка и темы --- */}
        <div className="absolute top-0 right-0 flex items-center gap-2 print:hidden">
          <ThemeSwitcher current={theme} onChange={onThemeChange} />
          {currentLanguage && onLanguageChange && (
            <LanguageSwitcher
              current={currentLanguage}
              onChange={onLanguageChange}
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          {/* -- Левая колонка: Основная информация -- */}
          <div className="flex-grow">
            <h1 className="mb-1 text-5xl font-light text-foreground-muted print:mb-0.5 print:text-[32px]">
              {name}
            </h1>
            {label && (
              <h2 className="mb-2 text-xl font-normal text-foreground print:mb-1 print:text-[16px]">
                {label}
              </h2>
            )}

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

          {/* -- Правая колонка: Изображение -- */}
          {image && (
            <div className="flex-shrink-0 order-first w-32 mx-auto mb-4 md:order-last md:mx-0 md:mb-0">
              <img
                src={image}
                alt={`Фотография ${name}`}
                className="object-cover w-32 h-32 rounded-full print:w-24 print:h-24"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* -- Блок "Обо мне" -- */}
        {summary && (
          <div className="mt-6 leading-relaxed text-foreground-secondary print:my-2 print:py-2">
            <Summary summary={summary} />
          </div>
        )}
      </header>
    );
  }
);
