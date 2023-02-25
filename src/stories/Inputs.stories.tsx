import React from "react";
import { Meta, Story } from "@storybook/react";
import { Input } from "components";

export default {
  title: "actually_openai/Input",
  component: Input,
};

export const SampleInput: Story<any> = (args) => <Input {...args} />;
SampleInput.args = {
  type: "text",
  wrapClassName: "w-[300px]",
  className: "w-full",
  placeholder: "placeholder",
};
