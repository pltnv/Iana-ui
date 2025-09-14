import IModal from "../components/IModal/IModal.vue";
import IButton from "../components/IButton/IButton.vue";

export default {
  title: "Components/I-Modal",
  component: IModal,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["dialog", "sm", "md", "lg"]
    },
    title: { control: "text" },
    dialogText: { control: "text" },
    showAcceptButton: { control: "boolean" },
    showCancelButton: { control: "boolean" },
    shadowEffect: { control: "boolean" }
  }
};

const Template = (args) => ({
  components: { IModal, IButton },
  setup() {
    return { args };
  },
  template: `
    <div style="min-height: 300px; position: relative;">
    <IModal v-bind="args" v-model="args.modelValue" @accept="alert('Accepted')" @cancel="alert('Canceled')">
      <template #default>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          imperdiet bibendum massa, ac ultrices nulla gravida ac.
        </p>
      </template>
    </IModal>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true,
  title: "Пример модального окна",
  dialogText: "Это простой текстовый диалог.",
  showAcceptButton: true,
  showCancelButton: true,
  shadowEffect: true
};
