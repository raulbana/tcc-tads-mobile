import React from 'react';
import {ViewProps, ScrollViewProps} from 'react-native';

import * as S from './styles';
import Label from '../Label/Label';
import theme from '../../theme/theme';

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
  currentPage?: string;
  goBack?: () => void;
  goBackTo?: string;
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
  currentPage,
}) => {
  const Container = safeArea ? S.StyledSafeArea : S.StyledContainer;

  const HeaderWithPageName = (
    <S.StyledHeader>
      <Label
        text={currentPage ?? ''}
        typography={theme.typography.title.sb3}
        color={theme.colors.gray_08}
      />
    </S.StyledHeader>
  );

  return (
    <Container style={containerStyle}>
      {headerShown &&
        (header ? header : currentPage ? HeaderWithPageName : <></>)}
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
