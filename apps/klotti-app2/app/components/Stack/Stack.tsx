import React from 'react';
import { View } from 'react-native';

type StackProps = {
  children: React.ReactNode;
  className?: string;
  spacing?: 's' | 'm' | 'l';
  direction?: 'horizontal' | 'vertical';
};

const spacingMap = {
  s: 4,
  m: 8,
  l: 16,
  xl: 24
};

export const Stack: React.FC<StackProps> = ({
  spacing = 'm',
  direction = 'vertical',
  className,
  children
}) => {
  const childrenWithSpacing = React.Children.toArray(children).map(
    (child, index) => (
      <View
        key={index}
        style={{
          [direction === 'horizontal' ? 'marginRight' : 'marginBottom']:
            spacingMap[spacing]
        }}>
        {child}
      </View>
    )
  );

  return <View className={className}>{childrenWithSpacing}</View>;
};
