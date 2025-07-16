import React from 'react';
import * as S from './styles';

const Loader = () => {
  return (
    <S.Overlay>
      <S.Spinner />
    </S.Overlay>
  );
};

export default Loader;