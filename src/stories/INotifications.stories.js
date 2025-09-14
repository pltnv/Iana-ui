// I-Notifications.stories.js
import INotifications from "../components/INotifications/INotifications.vue";
import { ref } from "vue";

export default {
  title: "Components/I-Notifications", // Путь в Storybook
  component: INotifications,
  tags: ["autodocs"], // Включает автоматическую генерацию docs страницы
  parameters: {
    docs: {
      description: {
        component:
          "Компонент для отображения уведомлений различных типов с настраиваемым поведением."
      }
    }
  },
  argTypes: {
    id: {
      control: "text",
      description: "Уникальный идентификатор уведомления"
    },
    position: {
      control: "select",
      options: [
        "top",
        "bottom",
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left"
      ],
      description: "Позиция уведомления на экране"
    },
    type: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Тип уведомления определяет его цвет и иконку"
    },
    message: {
      control: "text",
      description: "Текст сообщения уведомления"
    },
    openDelay: {
      control: "number",
      description: "Задержка перед показом (мс)"
    },
    closeDelay: {
      control: "number",
      description: "Задержка перед закрытием (мс)"
    },
    duration: {
      control: "number",
      description: "Время автоматического закрытия (мс)"
    },
    maxWidth: {
      control: "text",
      description: "Максимальная ширина уведомления"
    },
    minWidth: {
      control: "text",
      description: "Минимальная ширина уведомления"
    },
    showProgress: {
      control: "boolean",
      description: "Показывать прогресс-бар таймера до закрытия"
    },
    closable: {
      control: "boolean",
      description: "Разрешить пользователю закрывать уведомление"
    }
  }
};

// Базовый шаблон
const Template = (args) => ({
  components: { INotifications },
  setup() {
    const isVisible = ref(true);
    return { args, isVisible };
  },
  template: `
    <div style="min-height: 200px; position: relative;">
      <INotifications
        v-if="isVisible"
        v-bind="args"
        @close="isVisible = false"
      />
    </div>
  `
});

// История по умолчанию (будет использоваться для autodocs)
export const Default = Template.bind({});
Default.args = {
  message: "Это стандартное уведомление",
  type: "default",
  duration: 5000
};
Default.parameters = {
  docs: {
    storyDescription: "Стандартное уведомление с базовыми настройками."
  }
};

export const Success = Template.bind({});
Success.args = {
  message: "Операция выполнена успешно!",
  type: "success",
  duration: 5000
};

export const Error = Template.bind({});
Error.args = {
  message: "Произошла ошибка при выполнении операции",
  type: "error",
  duration: 5000
};

export const Warning = Template.bind({});
Warning.args = {
  message: "Внимание! Проверьте введенные данные",
  type: "warning",
  duration: 5000
};

export const Info = Template.bind({});
Info.args = {
  message: "Информационное сообщение для пользователя",
  type: "info",
  duration: 5000
};

export const WithoutProgress = Template.bind({});
WithoutProgress.args = {
  message: "Уведомление без прогресс-бара",
  type: "info",
  showProgress: false,
  duration: 5000
};

export const LongDuration = Template.bind({});
LongDuration.args = {
  message: "Это уведомление будет показано 10 секунд",
  type: "success",
  duration: 10000
};

export const CustomPosition = (args) => ({
  components: { INotifications },
  setup() {
    const isVisible = ref(true);
    return { args, isVisible };
  },
  template: `
    <div style="min-height: 400px; position: relative;">
      <INotifications
        v-if="isVisible"
        v-bind="args"
        @close="isVisible = false"
      />
      <p style="position: absolute; bottom: 10px; left: 10px;">
        Уведомление позиционируется в указанном месте
      </p>
    </div>
  `
});
CustomPosition.args = {
  message: "Уведомление в левом верхнем углу",
  type: "info",
  position: "top-left",
  duration: 5000
};

export const WithHTML = (args) => ({
  components: { INotifications },
  setup() {
    const isVisible = ref(true);
    const message = ref(
      "Уведомление с <strong>HTML</strong> и <em>форматированием</em>"
    );
    return { args, isVisible, message };
  },
  template: `
    <div style="min-height: 200px; position: relative;">
      <INotifications
        v-if="isVisible"
        v-bind="args"
        :message="message"
        @close="isVisible = false"
      />
    </div>
  `
});
WithHTML.args = {
  type: "warning",
  duration: 5000
};

// Демонстрация нескольких уведомлений
export const MultipleNotifications = () => ({
  components: { INotifications },
  setup() {
    const notifications = ref([
      {
        id: 1,
        message: "Первое уведомление",
        type: "success",
        visible: true,
        duration: 5000
      },
      {
        id: 2,
        message: "Второе уведомление",
        type: "error",
        visible: true,
        duration: 5000
      },
      {
        id: 3,
        message: "Третье уведомление",
        type: "warning",
        visible: true,
        duration: 5000
      }
    ]);

    const closeNotification = (id) => {
      const index = notifications.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notifications.value[index].visible = false;
      }
    };

    return { notifications, closeNotification };
  },
  template: `
    <div style="min-height: 400px; position: relative;">
      <div style="position: absolute; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px;">
        <INotifications
          v-for="notification in notifications"
          v-if="notification.visible"
          :key="notification.id"
          :message="notification.message"
          :type="notification.type"
          :duration="notification.duration"
          @close="closeNotification(notification.id)"
        />
      </div>
      <p style="position: absolute; bottom: 10px; left: 10px;">
        Демонстрация работы нескольких уведомлений одновременно
      </p>
    </div>
  `
});
