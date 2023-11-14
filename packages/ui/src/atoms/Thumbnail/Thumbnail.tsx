import React from 'react';
import { Box, BoxProps, Image, ImageProps } from '../../atoms';
import { Tag, TagProps } from '../Tag';

export type ThumbnailSize = 'xsmall' | 'small' | 'medium' | 'large';

export type ThumbnailProps = BoxProps & {
  image: ImageProps;
  tag?: TagProps;
  aspectRatio?: number;
};

export const Thumbnail = ({ image, tag, ...props }: ThumbnailProps) => {
  return (
    <Box width={'100%'} {...props}>
      {tag && (
        <Box position='absolute' top={0} right={0} margin='3xs' zIndex={1}>
          <Tag amount={10} />
        </Box>
      )}
      <Image borderRadius='s' aspectRatio={1} {...image} />
    </Box>
  );
};
