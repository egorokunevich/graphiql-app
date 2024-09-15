'use client';
import Image from '@/node_modules/next/image';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import InputField from '@/src/components/InputField/InputField';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { LanguageType } from '@/src/types/index';
import { auth } from '@/src/utils/firebase';
import { validateEmail, validatePassword } from '@/src/utils/validation';

function SignUp() {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const t = useTranslations();

  useAuthEffect(setAuthUser);
  useEffect(() => {
    if (!!authUser) router.push(`/${params.lang}`);
  }, [authUser]);

  useEffect(() => {
    setError('');
    setEmailError('');
    setPasswordErrors([]);

    if (touchedEmail) {
      setEmailError(validateEmail(email) ? '' : t('errors.email'));
    }
    if (touchedPassword) {
      const passwordErrorKeys = validatePassword(password);
      const passwordErrorsList = passwordErrorKeys.map((key) => {
        const errorKey = key as
          | 'passwordLength'
          | 'passwordDigit'
          | 'passwordLetter'
          | 'passwordSpecial';
        return t(`errors.${errorKey}`);
      });
      setPasswordErrors(passwordErrorsList);
    }
  }, [email, password, touchedEmail, touchedPassword]);

  async function register(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true);

    setTouchedEmail(true);
    setTouchedPassword(true);

    if (!emailError && passwordErrors.length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(`/${params.lang}`);
      } catch (err) {
        const errorCode = (err as { code: string }).code;
        setError(`Error: ${errorCode.replace(/-/g, ' ')}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="mx-auto p-6 m-6 bg-white rounded-lg shadow-md w-[450px]"
      data-testid="signUp-page"
    >
      <h1 className="text-3xl font-semibold mb-4">{t('basic.signUp')}</h1>
      <form onSubmit={register}>
        <InputField
          id="email"
          label={t('basic.email')}
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (!touchedEmail) setTouchedEmail(true);
          }}
          onBlur={() => setTouchedEmail(true)}
          placeholder={t('login.emailPlaceholder')}
          required
          error={touchedEmail ? emailError : ''}
        />

        <InputField
          id="password"
          label={t('basic.password')}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (!touchedPassword) setTouchedPassword(true);
          }}
          onBlur={() => setTouchedPassword(true)}
          placeholder={t('login.passwordPlaceholder')}
          required
          error={
            touchedPassword && passwordErrors.length > 0
              ? passwordErrors.join(' ')
              : ''
          }
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isLoading ? (
          <p>{t('basic.loading')}...</p>
        ) : (
          <Button
            type="submit"
            className="w-full m-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            data-testid="signUp-submitBtn"
          >
            {t('login.createAccount')}
          </Button>
        )}
      </form>
      <Box
        sx={{
          width: '100%',
          height: 250,
          position: 'relative',
          margin: '30px 0',
        }}
      >
        <Image
          src="/static/signin.svg"
          alt="sign in"
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>
    </div>
  );
}

export default SignUp;
