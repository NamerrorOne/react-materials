import { useCallback, useRef } from "react";

export const useIntersection = (
  onIntersect: () => void,
  isFetchingNextPage: boolean,
  hasNextPage: boolean
) => {
  const unsubscribe = useRef(() => {});
  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (
            intersection.isIntersecting &&
            !isFetchingNextPage &&
            hasNextPage
          ) {
            onIntersect();
          }
        });
      });

      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect, isFetchingNextPage, hasNextPage]
  );
};
