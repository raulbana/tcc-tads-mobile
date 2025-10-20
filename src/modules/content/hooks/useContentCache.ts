import {useCallback} from 'react';
import {contentCache} from '../services/contentCache';

export const useContentCache = () => {
  const clearCache = useCallback(() => {
    contentCache.clearAll();
  }, []);

  const clearContentCache = useCallback((contentId: string) => {
    contentCache.invalidateContent(contentId);
  }, []);

  const clearContentsCache = useCallback(() => {
    contentCache.clearContents();
  }, []);

  const clearCategoriesCache = useCallback(() => {
    contentCache.clearCategories();
  }, []);

  const getCachedContents = useCallback(() => {
    return contentCache.getContents();
  }, []);

  const getCachedContent = useCallback((contentId: string) => {
    return contentCache.getContent(contentId);
  }, []);

  const getCachedCategories = useCallback(() => {
    return contentCache.getCategories();
  }, []);

  return {
    clearCache,
    clearContentCache,
    clearContentsCache,
    clearCategoriesCache,
    getCachedContents,
    getCachedContent,
    getCachedCategories,
  };
};
