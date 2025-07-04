import { ReactNode } from "react";

export const VerticalInputWithLabelWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
