import fonts from './fonts';

export interface TextProps {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
}

export interface Typography {
  paragraph: {
    sm1: TextProps;
    sm2: TextProps;
    sm3: TextProps;
    sm4: TextProps;
    sm5: TextProps;
    r1: TextProps;
    r2: TextProps;
    r3: TextProps;
    r4: TextProps;
    r5: TextProps;
    sb1: TextProps;
    sb2: TextProps;
    sb3: TextProps;
    sb4: TextProps;
    sb5: TextProps;
    b1: TextProps;
    b2: TextProps;
    b3: TextProps;
    b4: TextProps;
    b5: TextProps;
    m0: TextProps;
    m1: TextProps;
    m2: TextProps;
    m3: TextProps;
    m4: TextProps;
    m5: TextProps;
  };
  title: {
    h1: TextProps;
    h2: TextProps;
    h3: TextProps;
    h4: TextProps;
    h5: TextProps;
    b1: TextProps;
    b2: TextProps;
    b3: TextProps;
    b4: TextProps;
    b5: TextProps;
    sb1: TextProps;
    sb2: TextProps;
    sb3: TextProps;
    sb4: TextProps;
    sb5: TextProps;
    m1: TextProps;
    m2: TextProps;
    m3: TextProps;
    m4: TextProps;
    m5: TextProps;
  };
}
const typography: Typography = {
  paragraph: {
    sm1: {fontSize: '12', fontWeight: '400', fontFamily: fonts.regular},
    sm2: {fontSize: '14', fontWeight: '400', fontFamily: fonts.regular},
    sm3: {fontSize: '16', fontWeight: '400', fontFamily: fonts.regular},
    sm4: {fontSize: '18', fontWeight: '400', fontFamily: fonts.regular},
    sm5: {fontSize: '20', fontWeight: '400', fontFamily: fonts.regular},

    r1: {fontSize: '12', fontWeight: '400', fontFamily: fonts.regular},
    r2: {fontSize: '14', fontWeight: '400', fontFamily: fonts.regular},
    r3: {fontSize: '16', fontWeight: '400', fontFamily: fonts.regular},
    r4: {fontSize: '18', fontWeight: '400', fontFamily: fonts.regular},
    r5: {fontSize: '20', fontWeight: '400', fontFamily: fonts.regular},

    sb1: {fontSize: '12', fontWeight: '600', fontFamily: fonts.semiBold},
    sb2: {fontSize: '14', fontWeight: '600', fontFamily: fonts.semiBold},
    sb3: {fontSize: '16', fontWeight: '600', fontFamily: fonts.semiBold},
    sb4: {fontSize: '18', fontWeight: '600', fontFamily: fonts.semiBold},
    sb5: {fontSize: '20', fontWeight: '600', fontFamily: fonts.semiBold},

    b1: {fontSize: '12', fontWeight: '700', fontFamily: fonts.bold},
    b2: {fontSize: '14', fontWeight: '700', fontFamily: fonts.bold},
    b3: {fontSize: '16', fontWeight: '700', fontFamily: fonts.bold},
    b4: {fontSize: '18', fontWeight: '700', fontFamily: fonts.bold},
    b5: {fontSize: '20', fontWeight: '700', fontFamily: fonts.bold},

    m0: {fontSize: '10', fontWeight: '500', fontFamily: fonts.medium},
    m1: {fontSize: '12', fontWeight: '500', fontFamily: fonts.medium},
    m2: {fontSize: '14', fontWeight: '500', fontFamily: fonts.medium},
    m3: {fontSize: '16', fontWeight: '500', fontFamily: fonts.medium},
    m4: {fontSize: '18', fontWeight: '500', fontFamily: fonts.medium},
    m5: {fontSize: '20', fontWeight: '500', fontFamily: fonts.medium},
  },
  title: {
    h1: {fontSize: '32', fontWeight: '400', fontFamily: fonts.regular},
    h2: {fontSize: '28', fontWeight: '400', fontFamily: fonts.regular},
    h3: {fontSize: '24', fontWeight: '400', fontFamily: fonts.regular},
    h4: {fontSize: '20', fontWeight: '400', fontFamily: fonts.regular},
    h5: {fontSize: '18', fontWeight: '400', fontFamily: fonts.regular},

    b1: {fontSize: '32', fontWeight: '700', fontFamily: fonts.bold},
    b2: {fontSize: '28', fontWeight: '700', fontFamily: fonts.bold},
    b3: {fontSize: '24', fontWeight: '700', fontFamily: fonts.bold},
    b4: {fontSize: '20', fontWeight: '700', fontFamily: fonts.bold},
    b5: {fontSize: '18', fontWeight: '700', fontFamily: fonts.bold},

    sb1: {fontSize: '32', fontWeight: '600', fontFamily: fonts.semiBold},
    sb2: {fontSize: '28', fontWeight: '600', fontFamily: fonts.semiBold},
    sb3: {fontSize: '24', fontWeight: '600', fontFamily: fonts.semiBold},
    sb4: {fontSize: '20', fontWeight: '600', fontFamily: fonts.semiBold},
    sb5: {fontSize: '18', fontWeight: '600', fontFamily: fonts.semiBold},

    m1: {fontSize: '32', fontWeight: '500', fontFamily: fonts.medium},
    m2: {fontSize: '28', fontWeight: '500', fontFamily: fonts.medium},
    m3: {fontSize: '24', fontWeight: '500', fontFamily: fonts.medium},
    m4: {fontSize: '20', fontWeight: '500', fontFamily: fonts.medium},
    m5: {fontSize: '18', fontWeight: '500', fontFamily: fonts.medium},
  },
};

export default typography;
