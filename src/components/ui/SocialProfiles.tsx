import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ResumeSchema } from '../../types/resumeSchema';
import { getIcon } from '../../lib/socialIcons';

interface SocialProfilesProps {
  profiles?: NonNullable<ResumeSchema['basics']>['profiles'];
}

export const SocialProfiles: FC<SocialProfilesProps> = memo(({ profiles }) => {
  const { t } = useTranslation();

  if (!profiles || profiles.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 print:mt-1">
      {profiles.map((profile, index) => {
        if (!profile.network) return null;

        const iconData = getIcon(profile.network);
        const Icon = iconData?.icon;

        return (
          <a
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
            title={`${profile.network} ${t('common.profile')}`}
          >
            {Icon ? (
              <Icon className="w-4 h-4" />
            ) : (
              <span className="inline-block w-4 h-4">•</span>
            )}
            <span>{profile.network}</span>
          </a>
        );
      })}
    </div>
  );
});
