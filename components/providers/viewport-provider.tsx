"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ViewportSize = {
  width: number;
  height: number;
};

type ViewportContextValue = ViewportSize & {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  setViewportSize: Dispatch<SetStateAction<ViewportSize>>;
};

const MOBILE_MAX_WIDTH = 768;
const TABLET_MAX_WIDTH = 1024;

const ViewportContext = createContext<ViewportContextValue | null>(null);

const getInitialSize = (): ViewportSize => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return { width: window.innerWidth, height: window.innerHeight };
};

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [viewportSize, setViewportSize] =
    useState<ViewportSize>(getInitialSize);

  useEffect(() => {
    const updateViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const value = useMemo<ViewportContextValue>(() => {
    const { width } = viewportSize;

    const isMobile = width > 0 && width < MOBILE_MAX_WIDTH;
    const isTablet = width >= MOBILE_MAX_WIDTH && width < TABLET_MAX_WIDTH;
    const isDesktop = width >= TABLET_MAX_WIDTH;

    return {
      ...viewportSize,
      isMobile,
      isTablet,
      isDesktop,
      setViewportSize,
    };
  }, [viewportSize]);

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const context = useContext(ViewportContext);

  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }

  return context;
};

export const useIsMobile = () => {
  const { isMobile } = useViewport();
  return isMobile;
};

export const useIsTablet = () => {
  const { isTablet } = useViewport();
  return isTablet;
};

export const useIsDesktop = () => {
  const { isDesktop } = useViewport();
  return isDesktop;
};
