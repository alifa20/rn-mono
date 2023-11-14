import { truncate } from 'lodash';
import { Text } from 'react-native';
import { useMemo } from 'react';
import { Section } from '../Section';

type FilterSelectionItemProps = {
  navigateToSelectionItemScene: () => void;
  selectedSectionOptions?: string[];
  title: string;
};

export const FilterSelectionItem = ({
  navigateToSelectionItemScene,
  selectedSectionOptions,
  title
}: FilterSelectionItemProps) => {
  const options = useMemo(
    () => selectedSectionOptions?.filter(i => i),
    [selectedSectionOptions]
  );

  return (
    <Section onPress={navigateToSelectionItemScene}>
      <Text>{title}</Text>
      <Text className="text-sm text-gray-500">
        {(options?.length &&
          truncate(options.join(', '), {
            length: 24
          })) ||
          'All'}
      </Text>
    </Section>
  );
};
