import React from 'react';
import {ViewProps, ScrollViewProps} from 'react-native';

import * as S from './style';

type ScreenContainerProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  header?: React.ReactNode;
  headerShown?: boolean;
  containerStyle?: ViewProps['style'];
  safeArea?: boolean;
  loading?: boolean;
  LoadingComponent?: React.ReactNode;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  header,
  headerShown = true,
  containerStyle,
  safeArea = true,
  loading = false,
  LoadingComponent,
  contentContainerStyle,
}) => {
  const Container = safeArea ? S.StyledSafeArea : S.StyledContainer;

  return (
    <Container style={containerStyle}>
      {headerShown && header}
      {loading && LoadingComponent}
      {!loading &&
        (scrollable ? (
          <S.StyledScrollContent contentContainerStyle={contentContainerStyle}>
            {children}
          </S.StyledScrollContent>
        ) : (
          <S.StyledContent style={contentContainerStyle}>
            {children}
          </S.StyledContent>
        ))}
    </Container>
  );
};

export default ScreenContainer;
