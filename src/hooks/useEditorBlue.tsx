import { useEffect } from 'react';

import { encodeBase64 } from '@src/utils/base64';

function useEditorBlur(bodyRef: React.RefObject<string>) {
  useEffect(() => {
    const handleBlur = () => {
      const currentBody = bodyRef.current;
      const currentUrl = new URL(window.location.href);

      if (currentBody && currentBody.trim() !== '') {
        const encodedBody = encodeBase64(currentBody);
        currentUrl.searchParams.set('body', encodedBody);
      } else {
        currentUrl.searchParams.delete('body');
      }
      window.history.replaceState({}, '', currentUrl.toString());
    };
    document.addEventListener('blur', handleBlur, true);
    return () => {
      document.removeEventListener('blur', handleBlur, true);
    };
  }, [bodyRef]);
}

export default useEditorBlur;
