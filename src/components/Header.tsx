import { FC, memo } from 'react';
import { getContactIcon } from '../lib/socialIcons';
import { Summary } from './Summary';
import { ContactInfo } from './ui/ContactInfo';
import { SocialProfiles } from './ui/SocialProfiles';
import type { ResumeSchema } from '../types/resumeSchema';
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
        <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
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
            alt={`Headshot of ${name}`}
            className="float-right object-cover mb-2 ml-4 w-28 h-28 rounded-full sm:w-32 sm:h-32 print:w-24 print:h-24 print:rounded-md print:float-none print:m-0"
            aria-hidden="true"
          />
        )}
        <div className="pr-24 md:pr-0">
          <div>
            <h1 className="mb-1 text-5xl font-light text-foreground-muted print:mb-0.5 print:text-[32px]">
              {name}
            </h1>
            {label && (
              <h2 className="mb-2 text-xl font-normal text-foreground print:mb-1 print:text-[16px]">
                {label}
              </h2>
            )}
          </div>

          {location && (
            <div
              className="flex gap-2 items-center print:gap-1"
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

          {summary && (
            <div className="mt-6 leading-relaxed text-foreground-secondary print:my-2 print:py-2">
              <Summary summary={summary} />
            </div>
          )}
        </div>
      </header>
    );
  }
);
