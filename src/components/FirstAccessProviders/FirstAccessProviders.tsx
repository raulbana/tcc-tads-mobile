import React, {ReactNode} from 'react';
import {AccessibilityProvider} from '../../contexts/AccessibilityContext';

interface FirstAccessProvidersProps {
  children: ReactNode;
}

const FirstAccessProviders: React.FC<FirstAccessProvidersProps> = ({
  children,
}) => {
  return <AccessibilityProvider>{children}</AccessibilityProvider>;
};

export default FirstAccessProviders;
