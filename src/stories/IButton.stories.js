import IButton from "../components/IButton/IButton.vue";

export default {
  title: "I-Button",
  component: IButton
};

const Template = (args) => ({
  components: { IButton },
  setup() {
    return { args };
  },
  template: '<i-button v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  disabled: true,
  label: "Button"
};
