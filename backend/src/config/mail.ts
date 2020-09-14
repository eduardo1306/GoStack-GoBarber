interface IMailConfig {
  driver: 'ethereal' | 'sparkpost';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal' || 'sparkpost',
  defaults: {
    from: {
      email: 'testing@sparkpostbox.com',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
