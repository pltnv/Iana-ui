import { fn } from "@storybook/test";
import IButton from "../components/IButton/IButton.vue";

function cons() {
  console.log("e");
}

export default {
  title: "IButton",
  component: IButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "flat", "outlined", "text", "plain"]
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"]
    }
  },
  args: { onClick: fn() }
};

export const Primary = {
  args: {
    primary: true,
    label: "Button"
  }
};

export const Outlined = {
  args: {
    variant: "outlined",
    label: "Button"
  }
};

export const Flat = {
  args: {
    variant: "flat",
    label: "Button"
  }
};

export const Text = {
  args: {
    variant: "text",
    label: "Button"
  }
};

export const Plain = {
  args: {
    variant: "plain",
    label: "Button"
  }
};
