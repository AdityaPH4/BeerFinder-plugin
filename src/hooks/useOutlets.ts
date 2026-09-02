import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getOutlets }
  from "../services/outletService";

import type {
  BeerFinderFilters,
  Outlet,
} from "../types";

export function useOutlets(
  filters: BeerFinderFilters
) {

  const [outlets, setOutlets] =
    useState<Outlet[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const load = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      const data =
        await getOutlets(filters);

      setOutlets(data);

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load outlets"
      );

    } finally {

      setLoading(false);

    }

  }, [filters]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    outlets,
    loading,
    error,
    reload: load,
  };
}