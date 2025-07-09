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
    <div className="mt-2 print:mt-1">
      <div className="flex flex-wrap gap-3">
        {profiles.map((profile, index) => {
          if (!profile.network) return null;

          const iconData = getIcon(profile.network);
          const Icon = iconData?.icon;
          const iconColor = iconData?.color || '#6c6c6c';

          return (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              title={`${profile.network} ${t('common.profile')}`}
            >
              {Icon ? (
                <Icon className="w-4 h-4" style={{ color: iconColor }} />
              ) : (
                <span className="inline-block w-4 h-4">•</span>
              )}
              <span>{profile.network}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
});
