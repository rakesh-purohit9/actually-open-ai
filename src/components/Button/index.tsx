import React from "react";

const shapes = {
  icbCircleBorder10: "rounded-[10px]",
  RoundedBorder3: "rounded-[3px]",
} as const;
const variants = {
  icbFillBluegray90019: "bg-bluegray_900_19",
  FillBlueA700: "bg-blue_A700 text-white_A700",
} as const;
const sizes = { smIcn: "p-[3px]", sm: "p-[10px]" } as const;

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "icbCircleBorder10",
  variant = "icbFillBluegray90019",
  size = "smIcn",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
