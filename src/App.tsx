import { FC, useState, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n/config';
import { Resume as ResumeComponent } from './components/Resume';
import type { ResumeSchema } from './types/resumeSchema';
import resumeEn from '../resume.json';
import resumeRu from '../resume.ru.json';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher';

type Theme = 'light' | 'dark';

const App: FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<'en' | 'ru'>('ru');
  const [resume, setResume] = useState<ResumeSchema>(resumeRu);
  const [theme, setTheme] = useState<Theme>('light');

  const handleLanguageChange = (newLang: 'en' | 'ru') => {
    setLang(newLang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
    setResume(lang === 'ru' ? resumeRu : resumeEn);
    document.title = t('meta.title');
  }, [lang, t]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeSwitcher current={theme} onChange={handleThemeChange} />
      <ResumeComponent
        resume={resume}
        currentLanguage={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
      />
    </I18nextProvider>
  );
};

export default App;
