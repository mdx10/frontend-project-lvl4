export default {
  translation: {
    notFound: {
      title: 'Страница не найдена',
      homeLink: 'На главную',
    },
    signup: {
      title: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        button: 'Зарегистрироваться',
      },
    },
    signin: {
      title: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        button: 'Войти',
      },
      noAccount: 'Нет аккаунта?',
      registrationLink: 'Регистрация',
    },
    header: {
      logo: 'Hexlet Chat',
      logOutBtn: 'Выйти',
    },
    chat: {
      channels: {
        title: 'Каналы',
        removeBtn: 'Удалить',
        renameBtn: 'Переименовать',
      },
      messages: {
        messagesCount_one: '{{count}} сообщение',
        messagesCount_few: '{{count}} сообщения',
        messagesCount_many: '{{count}} сообщений',
      },
      form: {
        text: 'Введите сообщение...',
      },
    },
    modals: {
      buttons: {
        cancel: 'Отменить',
        remove: 'Удалить',
        submit: 'Отправить',
      },
      add: {
        title: 'Добавить канал',
        body: 'Введите название',
      },
      remove: {
        title: 'Удалить канал',
        body: 'Канал "{{name}}" будет удален. Вы уверены?',
      },
      rename: {
        title: 'Переименовать канал',
        body: 'Введите название',
      },
    },
    feedback: {
      errors: {
        required: 'Обязательное поле',
        min: 'Не менее {{count}} символов',
        minMax: 'От {{min}} до {{max}} символов',
        confirmPassword: 'Пароли должны совпадать',
        userAlreadyExists: 'Такой пользователь уже существует',
        invalidAuthData: 'Неверные имя пользователя или пароль',
        mustBeUnique: 'Должно быть уникальным',
        networkProblem: 'Ошибка соединения',
      },
      success: {
        addChannel: 'Канал добавлен',
        removeChannel: 'Канал удалён',
        renameChannel: 'Канал переименован',
      },
    },
  },
};
