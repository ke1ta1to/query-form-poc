import { useCallback } from "react";
import { useSearchParams } from "react-router";

export const useQueryParamsUpdate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParams = useCallback(
    (params: Readonly<Record<string, string | number | null>>) => {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null) {
            newSearchParams.set(key, value.toString());
          } else {
            // 値がnullの場合はクエリパラメータから削除
            newSearchParams.delete(key);
          }
        });
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  const removeQueryParam = useCallback(
    (...keys: string[]) => {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        keys.forEach((key) => {
          newSearchParams.delete(key);
        });
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  return {
    /**
     * 現在のクエリパラメータ
     * @example
     * const { updateQueryParams } = useQueryParamUpdate();
     * updateQueryParams({ search: "keyword" }); // クエリパラメータを更新
     * updateQueryParams({ search: null }); // クエリパラメータから検索を削除
     */
    searchParams,
    /**
     * クエリパラメータを更新
     */
    updateQueryParams,
    /**
     * クエリパラメータを削除
     * @param keys - 削除するクエリパラメータ
     */
    removeQueryParam,
  } as const;
};
