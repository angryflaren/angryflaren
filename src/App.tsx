import { FC, useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Resume as ResumeComponent } from './components/Resume';
import type { ResumeSchema } from './types/resumeSchema';
import resumeEn from '../resume.json';
import resumeRu from '../resume.ru.json';

const App: FC = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('ru');
  const [resume, setResume] = useState<ResumeSchema>(lang === 'ru' ? resumeRu : resumeEn);

  const handleLanguageChange = (newLang: 'en' | 'ru') => {
    setLang(newLang);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
    setResume(lang === 'ru' ? resumeRu : resumeEn);
  }, [lang]);

  return (
    <I18nextProvider i18n={i18n}>
      <ResumeComponent
        resume={resume}
        currentLanguage={lang}
        onLanguageChange={handleLanguageChange}
      />
    </I18nextProvider>
  );
};

export default App;
