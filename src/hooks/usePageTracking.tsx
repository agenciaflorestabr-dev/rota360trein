import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'pv_session_id';

const getSessionId = () => {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

const detectDevice = () => {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking on admin routes
    if (location.pathname.startsWith('/admin')) return;

    const track = async () => {
      try {
        await supabase.from('page_views').insert({
          path: location.pathname,
          session_id: getSessionId(),
          referrer: document.referrer || null,
          user_agent: navigator.userAgent.slice(0, 500),
          device: detectDevice(),
        });
      } catch (e) {
        // Silent fail
      }
    };
    track();
  }, [location.pathname]);
};
