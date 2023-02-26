import ICheckbox from "../components/ICheckbox/ICheckbox.vue";

export default {
  title: "I-Checkbox",
  component: ICheckbox
};

const Template = (args) => ({
  components: { ICheckbox },
  setup() {
    return { args };
  },
  template: '<i-checkbox v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  label: "Button"
};
