import React from 'react';
import {ViewProps, ScrollViewProps} from 'react-native';
import {CaretLeft} from 'phosphor-react-native';

import * as S from './styles';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import {moderateScale} from '../../utils/scales';

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
  goBack,
  goBackTo,
}) => {
  const Container = safeArea ? S.StyledSafeArea : S.StyledContainer;

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

  const resolvedHeader = header ?? (currentPage ? HeaderWithPageName : null);

  return (
    <Container style={containerStyle}>
      {headerShown && resolvedHeader}
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
