import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface Props<T> {
  param: string;
  ignoreParams?: string[];
  defaultValue?: T | null;
  replace?: boolean;
}

type Value<T> = T | null;
type SetValue<T> = (value?: T | null) => void;

export const useSearchParam = <T extends string>({
  param,
  ignoreParams,
  defaultValue = null,
  replace,
}: Props<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value: Value<T> = (searchParams.get(param) as T) ?? defaultValue;

  const setValue: SetValue<T> = useCallback(
    (value?: T | null) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (ignoreParams && ignoreParams.length > 0) {
        ignoreParams.forEach((key) => {
          newSearchParams.delete(key);
        });
      }

      if (!value || value === "null" || value === "undefined") {
        newSearchParams.delete(param);
      } else {
        newSearchParams.set(param, value);
      }

      setSearchParams(newSearchParams, { replace });
    },
    [searchParams, setSearchParams, param, ignoreParams]
  );

  return { value, setValue };
};
