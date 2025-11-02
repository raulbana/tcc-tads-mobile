import React, {ReactNode} from 'react';
import {AccessibilityProvider} from '../../contexts/AccessibilityContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
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
          <DiaryProvider>{children}</DiaryProvider>
        </ExerciseProvider>
      </QueryClientProvider>
    </AccessibilityProvider>
  );
};

export default UnauthenticatedProviders;
