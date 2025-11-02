import React, {ReactNode} from 'react';
import {AccessibilityProvider} from '../../contexts/AccessibilityContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../../contexts/AuthContext';
import {ThemeProvider} from 'styled-components';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';
import {DiaryProvider} from '../../contexts/DiaryContext';
import {ExerciseProvider} from '../../contexts/ExerciseContext';

interface UnauthenticatedProvidersProps {
  children: ReactNode;
}

const UnauthenticatedProviders: React.FC<UnauthenticatedProvidersProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  return (
    <AccessibilityProvider>
      <QueryClientProvider client={queryClient}>
        <ExerciseProvider>
          <DiaryProvider>
            <AuthProvider>{children}</AuthProvider>
          </DiaryProvider>
        </ExerciseProvider>
      </QueryClientProvider>
    </AccessibilityProvider>
  );
};

export default UnauthenticatedProviders;
