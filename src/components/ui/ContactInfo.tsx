import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import { getContactIcon } from '../../lib/socialIcons';

interface ContactInfoProps {
  email?: string;
  phone?: string;
  url?: string;
}

export const ContactInfo: FC<ContactInfoProps> = ({ email, phone, url }) => {
  const { t } = useTranslation();
  const { icon: EmailIcon, color: emailColor } = getContactIcon('email');
  const { icon: PhoneIcon, color: phoneColor } = getContactIcon('phone');

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-foreground-tertiary print:gap-1 md:justify-start"
      role="contentinfo"
      aria-label={t('common.contactInfo')}
    >
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 transition-colors hover:text-brand"
          aria-label={`${t('common.email')}: ${email}`}
        >
          <EmailIcon
            style={{ color: emailColor }}
            className="w-3.5 h-3.5 text-brand print:w-3 print:h-3"
            aria-hidden="true"
          />
          {email}
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 transition-colors hover:text-brand"
          aria-label={`${t('common.phone')}: ${phone}`}
        >
          <PhoneIcon
            style={{ color: phoneColor }}
            className="w-3.5 h-3.5 text-brand print:flex"
            aria-hidden="true"
          />
          {phone}
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-brand"
          aria-label={`${t('common.website')}: ${url}`}
        >
          <BsGlobe className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
          {url}
        </a>
      )}
    </div>
  );
};
