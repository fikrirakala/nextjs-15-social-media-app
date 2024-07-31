import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className: string;
}

export default function InfiniteScrollContainer({
  onBottomReached,
  className,
  children,
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: "100px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
        console.log("inview");
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref}></div>
    </div>
  );
}
