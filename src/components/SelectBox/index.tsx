import React from "react";
import Select, { Props } from "react-select";
import { ErrorMessage } from "../ErrorMessage";

type selectOptionType = { value: string; label: string };

const selectOptions: selectOptionType[] = [
  { value: "Write an email for: ", label: "Write Email" },
  { value: "Write an Essay", label: "Write an Essay" },
];

const variants = {
  UnderLineBlack90060: "border-b-[1px] border-black_900_60",
} as const;

const sizes = { sm: "pl-[9px] py-[10px]" } as const;

export type SelectProps = Omit<Props, "getOptionLabel"> &
  Partial<{
    placeholder: string;
    className: string;
    options: selectOptionType[];
    isSearchable: boolean;
    placeholderClassName: string;
    isMulti: boolean;
    onChange: (option: any) => void;
    value: string;
    errors: string[];
    indicator: React.ReactElement;
    getOptionLabel: (e: any) => string;

    variant: keyof typeof variants;
    size: keyof typeof sizes;
  }>;

const SelectBox = React.forwardRef<any, SelectProps>(
  (
    {
      children,
      placeholder = "Select",
      className = "",
      options = selectOptions,
      isSearchable = false,
      placeholderClassName = "",
      isMulti = false,
      onChange,
      value = "",
      errors = [],
      indicator,
      variant = "UnderLineBlack90060",
      size = "sm",
      ...restProps
    },
    ref
  ) => {
    const [selectedVal, setSelectedVal] = React.useState(value);

    const handleChange = (data) => {
      setSelectedVal(data);
      if (isMulti) {
        onChange?.(data?.map((d) => d.value) || []);
      } else {
        onChange?.(data?.value);
      }
    };

    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} ${(size && sizes[size]) || ""} ${
            (variant && variants[variant]) || ""
          }`}
          placeholder={
            <div className={placeholderClassName}>{placeholder}</div>
          }
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          value={selectedVal}
          onChange={handleChange}
          styles={{
            container: (provided) => ({
              ...provided,
              zIndex: 0,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "0 !important",
              minHeight: "auto",
              "&:hover": {
                border: "0 !important",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? "#fafafa" : "#ffffff",
              backgroundColor: state.isSelected ? "#2761ff" : "#ffffff",
              "&:hover": { backgroundColor: "#2761ff", color: "#ffffff" },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "inherit",
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
              margin: "0",
              padding: "0",
              // height: "0",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "0",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              paddingTop: "0px",
              paddingBottom: "0px",
            }),
            clearIndicator: (provided) => ({
              ...provided,
              padding: "0",
            }),
            multiValue: (provided) => ({
              ...provided,
              margin: "0",
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              padding: "0",
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event: any) => {
            return event.target.id === "scrollContainer";
          }}
          {...restProps}
        />
        <ErrorMessage errors={errors} />
        {children}
      </>
    );
  }
);

export { SelectBox };
