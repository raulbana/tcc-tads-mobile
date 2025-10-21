import React, {forwardRef} from 'react';
import {ViewProps, ScrollViewProps} from 'react-native';
import {CaretLeft} from 'phosphor-react-native';

import * as S from './styles';
import Label from '../Label/Label';
import {moderateScale} from '../../utils/scales';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

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
  fullBleed?: boolean;
};

const ScreenContainer = forwardRef<any, ScreenContainerProps>(
  (
    {
      children,
      scrollable = false,
      header,
      headerShown = false,
      containerStyle,
      safeArea = true,
      loading = false,
      LoadingComponent,
      contentContainerStyle,
      currentPage,
      goBack,
      goBackTo,
      fullBleed = false,
    },
    ref,
  ) => {
    const Container = fullBleed
      ? safeArea
        ? S.StyledSafeAreaFullBleed
        : S.StyledContainerFullBleed
      : safeArea
      ? S.StyledSafeArea
      : S.StyledContainer;

    const theme = useDynamicTheme();

    const HeaderWithPageName = (
      <S.StyledHeader>
        {goBack && goBackTo ? (
          <S.GoBackContainer onPress={goBack}>
            <CaretLeft color={theme.colors.gray_07} size={moderateScale(24)} />
            <Label
              text={goBackTo}
              typography={theme.typography.paragraph.sm3}
              color={theme.colors.gray_07}
            />
          </S.GoBackContainer>
        ) : (
          <Label
            text={currentPage ?? ''}
            typography={theme.typography.paragraph.sm3}
            color={theme.colors.gray_07}
          />
        )}
      </S.StyledHeader>
    );

    const resolvedHeader = headerShown ? header ?? HeaderWithPageName : null;

    const shouldScrollHeader =
      fullBleed && scrollable && headerShown && !!resolvedHeader;

    return (
      <Container style={containerStyle}>
        {headerShown && !shouldScrollHeader && resolvedHeader}
        {loading && LoadingComponent}
        {!loading &&
          (scrollable ? (
            <S.StyledScrollContent
              ref={ref}
              contentContainerStyle={contentContainerStyle}
              showsVerticalScrollIndicator={false}>
              {shouldScrollHeader && resolvedHeader}
              {children}
            </S.StyledScrollContent>
          ) : (
            <S.StyledContent style={contentContainerStyle}>
              {children}
            </S.StyledContent>
          ))}
      </Container>
    );
  },
);

export default ScreenContainer;
