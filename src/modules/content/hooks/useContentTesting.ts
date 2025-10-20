import {useCallback} from 'react';
import {useContent} from '../../../contexts/ContentContext';

export const useContentTesting = () => {
  const {
    contents,
    categories,
    isLoading,
    error,
    loadContents,
    loadContentById,
    createContent,
    reportContent,
    getContentStats,
    searchContents,
    clearError,
  } = useContent();

  const testLoadContents = useCallback(async () => {
    try {
      console.log('Testing loadContents...');
      await loadContents();
      console.log('✅ loadContents successful');
      console.log('Contents loaded:', contents.length);
    } catch (err) {
      console.error('❌ loadContents failed:', err);
    }
  }, [loadContents, contents.length]);

  const testLoadContentById = useCallback(async (contentId: string) => {
    try {
      console.log('Testing loadContentById...', contentId);
      const content = await loadContentById(contentId);
      console.log('✅ loadContentById successful');
      console.log('Content loaded:', content?.title);
      return content;
    } catch (err) {
      console.error('❌ loadContentById failed:', err);
      return null;
    }
  }, [loadContentById]);

  const testCreateContent = useCallback(async () => {
    try {
      console.log('Testing createContent...');
      const testContent = {
        title: 'Test Content',
        description: 'This is a test content',
        categories: ['1'],
        images: ['https://picsum.photos/300/300'],
      };
      const newContent = await createContent(testContent);
      console.log('✅ createContent successful');
      console.log('Content created:', newContent?.title);
      return newContent;
    } catch (err) {
      console.error('❌ createContent failed:', err);
      return null;
    }
  }, [createContent]);

  const testReportContent = useCallback(async (contentId: string) => {
    try {
      console.log('Testing reportContent...', contentId);
      await reportContent(contentId, 'Test report reason');
      console.log('✅ reportContent successful');
    } catch (err) {
      console.error('❌ reportContent failed:', err);
    }
  }, [reportContent]);

  const testGetContentStats = useCallback(async () => {
    try {
      console.log('Testing getContentStats...');
      const stats = await getContentStats();
      console.log('✅ getContentStats successful');
      console.log('Stats:', stats);
      return stats;
    } catch (err) {
      console.error('❌ getContentStats failed:', err);
      return null;
    }
  }, [getContentStats]);

  const testSearchContents = useCallback((query: string) => {
    try {
      console.log('Testing searchContents...', query);
      const results = searchContents(query);
      console.log('✅ searchContents successful');
      console.log('Search results:', results.length);
      return results;
    } catch (err) {
      console.error('❌ searchContents failed:', err);
      return [];
    }
  }, [searchContents]);

  const runAllTests = useCallback(async () => {
    console.log('🧪 Running all content tests...');
    
    await testLoadContents();
    await testGetContentStats();
    
    if (contents.length > 0) {
      await testLoadContentById(contents[0].id);
      testSearchContents('test');
    }
    
    console.log('🧪 All tests completed');
  }, [testLoadContents, testLoadContentById, testGetContentStats, testSearchContents, contents]);

  return {
    testLoadContents,
    testLoadContentById,
    testCreateContent,
    testReportContent,
    testGetContentStats,
    testSearchContents,
    runAllTests,
    contents,
    categories,
    isLoading,
    error,
    clearError,
  };
};

