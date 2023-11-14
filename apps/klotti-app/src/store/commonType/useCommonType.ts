import { useCommonTypeStore } from './useCommonTypeStore';

export const useCommonType = () => {
  const { commonType, setCommonType } = useCommonTypeStore();

  if (!commonType) {
    throw new Error('commonType is undefined');
  }

  return {
    commonType,
    setCommonType
  };
};
