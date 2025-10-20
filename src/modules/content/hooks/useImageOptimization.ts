import {useState, useCallback} from 'react';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
}

export const useImageOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizeImage = useCallback(async (
    imageUri: string,
    options: ImageOptimizationOptions = {}
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const {width = 800, height = 600, quality = 0.8} = options;
      
      const optimizedUri = `${imageUri}?w=${width}&h=${height}&q=${quality}&f=auto`;
      
      setIsLoading(false);
      return optimizedUri;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao otimizar imagem';
      setError(errorMessage);
      setIsLoading(false);
      return imageUri;
    }
  }, []);

  const getOptimizedImageUri = useCallback((imageUri: string, options?: ImageOptimizationOptions) => {
    if (!imageUri) return '';
    
    const {width = 800, height = 600, quality = 0.8} = options || {};
    return `${imageUri}?w=${width}&h=${height}&q=${quality}&f=auto`;
  }, []);

  return {
    optimizeImage,
    getOptimizedImageUri,
    isLoading,
    error,
  };
};
