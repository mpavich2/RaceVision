import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTitle = (title: string) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [title, location]);
};
