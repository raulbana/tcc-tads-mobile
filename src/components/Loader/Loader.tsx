import React from 'react';
import * as S from './styles';

export type LoaderProps = {
  overlay?: boolean;
};

const Loader: React.FC<LoaderProps> = ({overlay = true}) => {
  if (!overlay) {
    return <S.Spinner />;
  }

  return (
    <S.Overlay>
      <S.Spinner />
    </S.Overlay>
  );
};

export default Loader;
