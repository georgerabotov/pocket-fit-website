"use client";

import { useEffect, useRef } from "react";

/** A <video> that plays back at a fixed rate (e.g. 4× faster). */
export function RateVideo({
  rate = 1,
  ...props
}: React.ComponentProps<"video"> & { rate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.playbackRate = rate;
  }, [rate]);
  return (
    <video
      ref={ref}
      onLoadedMetadata={(e) => {
        (e.currentTarget as HTMLVideoElement).playbackRate = rate;
      }}
      {...props}
    />
  );
}
