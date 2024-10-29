/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import { Context, createContext, useContext, useState } from 'react';

interface GlobalState {
  openNavIndex: number;
  setOpenNavIndex: (newState: number) => void;
  openOverlayNavIndex: number;
  setOpenOverlayNavIndex: (newState: number) => void;
  isDarkMode: boolean;
  setIsDarkMode: (newState: boolean) => void;
  isDragOverlay: boolean;
  setIsDragOverlay: (newState: boolean) => void;
  opacity: number;
  setOpacity: (newState: number) => void;
}

const placeholder: GlobalState = {
  openNavIndex: 0,
  setOpenNavIndex: (foo) => foo,
  openOverlayNavIndex: 0,
  setOpenOverlayNavIndex: (foo) => foo,
  isDarkMode: false, // TODO: determine based on last session
  setIsDarkMode: (foo) => foo,
  isDragOverlay: false,
  setIsDragOverlay: (foo) => foo,
  opacity: 80,
  setOpacity: (foo) => foo,
};

const AppContext: Context<GlobalState> = createContext(placeholder);

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider(props: Props): any {
  const { children } = props;
  const [openNavIndex, setOpenNavIndex] = useState(placeholder.openNavIndex);
  const [openOverlayNavIndex, setOpenOverlayNavIndex] = useState(
    placeholder.openOverlayNavIndex,
  );
  const [isDarkMode, setIsDarkMode] = useState(placeholder.isDarkMode);
  const [isDragOverlay, setIsDragOverlay] = useState(placeholder.isDragOverlay);
  const [opacity, setOpacity] = useState(placeholder.opacity);

  const initialState: GlobalState = {
    openNavIndex,
    setOpenNavIndex,
    openOverlayNavIndex,
    setOpenOverlayNavIndex,
    isDarkMode,
    setIsDarkMode,
    isDragOverlay,
    setIsDragOverlay,
    opacity,
    setOpacity,
  };

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
