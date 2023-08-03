interface LoginProps {
  isLoginForm: boolean;
  setIsLoginForm: (params: boolean) => void;
}

interface Response {
  data: {
    data: {
      name: string;
      token: string;
      email: string;
    };
  };
}

export type { LoginProps, Response };
