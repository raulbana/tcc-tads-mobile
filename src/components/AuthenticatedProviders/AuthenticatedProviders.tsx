import React, {ReactNode} from 'react';
import {ContentProvider} from '../../contexts/ContentContext';
import {DiaryProvider} from '../../contexts/DiaryContext';
import {ExerciseProvider} from '../../contexts/ExerciseContext';
import {useAuth} from '../../contexts/AuthContext';

interface AuthenticatedProvidersProps {
  children: ReactNode;
}

const AuthenticatedProviders: React.FC<AuthenticatedProvidersProps> = ({
  children,
}) => {
  const {isLoggedIn} = useAuth();

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <ContentProvider>
      <DiaryProvider>
        <ExerciseProvider>{children}</ExerciseProvider>
      </DiaryProvider>
    </ContentProvider>
  );
};

export default AuthenticatedProviders;
