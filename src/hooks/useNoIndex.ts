import { useEffect } from 'react';

/**
 * Injects <meta name="robots" content="noindex,nofollow"> while mounted,
 * and removes it on unmount. Use on auth, error, and admin-redirect pages
 * to prevent Google from indexing them (avoids soft-404 / 403 reports).
 */
export const useNoIndex = () => {
  useEffect(() => {
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex,nofollow';
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);
};
