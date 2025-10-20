import {MMKVStorage} from '../../../storage/mmkvStorage';
import { Content, ContentCategory } from '../../../types/content';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class ContentCache {
  private readonly TTL = 5 * 60 * 1000;
  private readonly CATEGORIES_TTL = 10 * 60 * 1000;
  private readonly CACHE_PREFIX = 'content_cache_';

  private generateKey(type: string, id?: string): string {
    return `${this.CACHE_PREFIX}${type}${id ? `_${id}` : ''}`;
  }

  private isExpired(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp > ttl;
  }

  setContents(data: Content[]): void {
    const cacheItem: CacheItem<Content[]> = {
      data,
      timestamp: Date.now(),
      ttl: this.TTL,
    };
    MMKVStorage.set(this.generateKey('contents'), JSON.stringify(cacheItem));
  }

  getContents(): Content[] | null {
    const cached = MMKVStorage.getString(this.generateKey('contents'));
    if (!cached) return null;

    try {
      const cacheItem: CacheItem<Content[]> = JSON.parse(cached);
      if (this.isExpired(cacheItem.timestamp, cacheItem.ttl)) {
        this.clearContents();
        return null;
      }
      return cacheItem.data;
    } catch {
      this.clearContents();
      return null;
    }
  }

  setContent(id: string, data: Content): void {
    const cacheItem: CacheItem<Content> = {
      data,
      timestamp: Date.now(),
      ttl: this.TTL,
    };
    MMKVStorage.set(this.generateKey('content', id), JSON.stringify(cacheItem));
  }

  getContent(id: string): Content | null {
    const cached = MMKVStorage.getString(this.generateKey('content', id));
    if (!cached) return null;

    try {
      const cacheItem: CacheItem<Content> = JSON.parse(cached);
      if (this.isExpired(cacheItem.timestamp, cacheItem.ttl)) {
        this.clearContent(id);
        return null;
      }
      return cacheItem.data;
    } catch {
      this.clearContent(id);
      return null;
    }
  }

  setCategories(data: ContentCategory[]): void {
    const cacheItem: CacheItem<ContentCategory[]> = {
      data,
      timestamp: Date.now(),
      ttl: this.CATEGORIES_TTL,
    };
    MMKVStorage.set(this.generateKey('categories'), JSON.stringify(cacheItem));
  }

  getCategories(): ContentCategory[] | null {
    const cached = MMKVStorage.getString(this.generateKey('categories'));
    if (!cached) return null;

    try {
      const cacheItem: CacheItem<ContentCategory[]> = JSON.parse(cached);
      if (this.isExpired(cacheItem.timestamp, cacheItem.ttl)) {
        this.clearCategories();
        return null;
      }
      return cacheItem.data;
    } catch {
      this.clearCategories();
      return null;
    }
  }

  clearContents(): void {
    MMKVStorage.delete(this.generateKey('contents'));
  }

  clearContent(id: string): void {
    MMKVStorage.delete(this.generateKey('content', id));
  }

  clearCategories(): void {
    MMKVStorage.delete(this.generateKey('categories'));
  }

  clearAll(): void {
    const keys = MMKVStorage.getAllKeys();
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        MMKVStorage.delete(key);
      }
    });
  }

  invalidateContent(id: string): void {
    this.clearContent(id);
    this.clearContents();
  }

  invalidateAll(): void {
    this.clearAll();
  }
}

export const contentCache = new ContentCache();
