import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return  <div
      style={{ border: "1px solid black", fontSize: "16px" }}
      className="layer-container"
    >{children}</div>;
};
