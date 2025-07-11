import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';
import { SidebarSection } from './ui/SidebarSection';

interface SkillsProps {
  skills: ResumeSchema['skills'];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills?.length) return null;

  return (
    <SidebarSection title="sections.skills" contentClassName="grid grid-cols-2 gap-x-6 gap-y-3">
      {skills.map((skill, skillIndex) => (
        <div key={`skill-${skillIndex}`}>
          {/* Делаем заголовок жирным и добавляем отступы */}
          <h3 className="text-base font-semibold text-foreground mb-1">{skill.name}</h3>
          
          {skill.level && <span className="text-sm text-foreground-tertiary">{skill.level}</span>}

          {skill.keywords && skill.keywords.length > 0 && (
            <TagList className="mt-2">
              {skill.keywords.map((keyword, keywordIndex) => (
                <Tag key={`keyword-${skillIndex}-${keywordIndex}`}>{keyword}</Tag>
              ))}
            </TagList>
          )}
        </div>
      ))}
    </SidebarSection>
  );
};
