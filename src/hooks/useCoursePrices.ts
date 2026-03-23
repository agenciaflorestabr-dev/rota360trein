import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const PRICES_KEY = 'course_prices';

export function useCoursePrices() {
  const [prices, setPrices] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('section_key', PRICES_KEY)
        .maybeSingle();

      if (data?.value) {
        try {
          const parsed = JSON.parse(data.value);
          const numPrices: Record<string, number> = {};
          for (const [key, val] of Object.entries(parsed)) {
            numPrices[key] = parseFloat(val as string) || 0;
          }
          setPrices(numPrices);
        } catch {
          setPrices(null);
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const getPrice = (slug: string, defaultPrice?: number): number | undefined => {
    if (prices && prices[slug] !== undefined) return prices[slug];
    return defaultPrice;
  };

  return { prices, loading, getPrice };
}
