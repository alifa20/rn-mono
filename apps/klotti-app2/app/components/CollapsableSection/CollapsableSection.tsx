import Feather from 'react-native-vector-icons/Feather';
import React, { ReactNode, useState } from 'react';
import { Pressable, Text } from 'react-native';

type CollapsableSectionType = {
  headerTitle: string;
  children: ReactNode;
};

export const CollapsableSection = ({
  headerTitle,
  children
}: CollapsableSectionType) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text className="font-bold">{headerTitle}</Text>
        {isExpanded ? (
          <Feather name="chevron-up" size={24} color="black" />
        ) : (
          <Feather name="chevron-down" size={24} color="black" />
        )}
      </Pressable>
      {isExpanded && children}
    </>
  );
};
