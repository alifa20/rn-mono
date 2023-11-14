import { useContext } from 'react';
import { UnauthenticatedSheetContext } from './UnauthenticatedSheet';

export const useUnauthenticatedSheet = () => {
  const context = useContext(UnauthenticatedSheetContext);
  return context;
};
