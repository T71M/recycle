import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props<T> {
  param: string;
  ignoreParams?: string[];
  defaultValue?: T | null;
  replaceAll?: boolean;
  resetPage?: boolean;
}

type Value<T> = T | null;
type SetValue<T> = (value?: T | null) => void;
type RemoveValue<T> = (value: T) => void;

export const useSearchParam = <T extends string>({
  param,
  ignoreParams,
  replaceAll,
  resetPage,
}: Props<T>) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const value: Value<T> = searchParams.get(param) as T;
  const multiplyValue: Set<T> = new Set(searchParams.getAll(param) as T[]);

  const setValue: SetValue<T> = useCallback(
    (value?: T | null) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (resetPage) {
        newSearchParams.set("page", "1");
      }

      if (ignoreParams && ignoreParams.length > 0) {
        ignoreParams.forEach((key) => {
          newSearchParams.delete(key);
        });
      }

      if (!value || value === "null" || value === "undefined") {
        newSearchParams.delete(param);
      } else {
        if (replaceAll) {
          newSearchParams.forEach((_, k) => {
            if (k !== "page") {
              newSearchParams.delete(k);
            }
          });
        }
        newSearchParams.set(param, value);
      }

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, param, ignoreParams, replaceAll, resetPage, router, pathname]
  );

  const addValue: SetValue<T | T[]> = useCallback(
    (value) => {
      if (Array.isArray(value)) {
        const params = new URLSearchParams();
        value.forEach((v) => {
          params.append(param, v);
        });
        return router.replace(`${pathname}?${params.toString()}`);
      }
      const newSearchParams = new URLSearchParams(searchParams);
      if (resetPage) {
        newSearchParams.set("page", "1");
      }

      if (ignoreParams && ignoreParams.length > 0) {
        ignoreParams.forEach((key) => {
          newSearchParams.delete(key);
        });
      }

      if (replaceAll) {
        newSearchParams.forEach((_, k) => {
          if (k !== "page") {
            newSearchParams.delete(k);
          }
        });
      }
      if (value) {
        newSearchParams.append(param, value as T);
      }

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, param, ignoreParams, replaceAll, resetPage, pathname, router]
  );

  const removeRecord: RemoveValue<T> = useCallback(
    (v) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(param, v);
      if (resetPage) {
        newSearchParams.set("page", "1");
      }

      if (ignoreParams && ignoreParams.length > 0) {
        ignoreParams.forEach((key) => {
          newSearchParams.delete(key);
        });
      }
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, param, ignoreParams, resetPage, pathname, router]
  );

  return { value, setValue, addValue, removeRecord, multiplyValue } as const;
};
