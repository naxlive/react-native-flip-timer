import React from 'react';
import { View } from 'react-native';

import style from '../style';

function Separator(props) {
  const { separatorOverrideStyle, overrideCircle } = props.separatorOverrideStyle;
  return (
    <View style={[style.separator, separatorOverrideStyle]}>
      <View style={[style.circle, overrideCircle]} />
      <View style={[style.circle, overrideCircle]} />
    </View>
  );
}

export default Separator;
