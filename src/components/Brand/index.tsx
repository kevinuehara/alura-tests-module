import type { PropsWithChildren } from "react";

type BrandProps = {
  className?: string;
};

export const Brand = ({
  children,
  className,
}: PropsWithChildren<BrandProps>) => {
  return (
    <div className={`${className} bg-[#050C42]`} data-testid="brand">
      {children}
    </div>
  );
};
