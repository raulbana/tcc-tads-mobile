import React, {ReactNode, useMemo} from 'react';
import {AccessibilityProvider} from '../../contexts/AccessibilityContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ExerciseProvider} from '../../contexts/ExerciseContext';
import {DiaryProvider} from '../../contexts/DiaryContext';

interface FirstAccessProvidersProps {
  children: ReactNode;
}

const FirstAccessProviders: React.FC<FirstAccessProvidersProps> = ({
  children,
}) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );
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

export default FirstAccessProviders;
