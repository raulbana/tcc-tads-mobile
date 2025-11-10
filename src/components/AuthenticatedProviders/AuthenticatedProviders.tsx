import React, {ReactNode} from 'react';
import {ContentProvider} from '../../contexts/ContentContext';
import {DiaryProvider} from '../../contexts/DiaryContext';
import {ExerciseProvider} from '../../contexts/ExerciseContext';
import {AccessibilityProvider} from '../../contexts/AccessibilityContext';
import {useAuth} from '../../contexts/AuthContext';

interface AuthenticatedProvidersProps {
  children: ReactNode;
}

const AuthenticatedProviders: React.FC<AuthenticatedProvidersProps> = ({
  children,
}) => {
  return (
    <AccessibilityProvider>
      <ContentProvider>
        <DiaryProvider>
          <ExerciseProvider>{children}</ExerciseProvider>
        </DiaryProvider>
      </ContentProvider>
    </AccessibilityProvider>
  );
};

export default AuthenticatedProviders;
