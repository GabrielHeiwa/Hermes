import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { loginRequest } from '../../requests/loginRequest';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// TODO: Login user function

interface LoginFormProps {
  email?: string;
  password?: string;
}

function Login() {
  // Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormProps>();
  const [, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();

  // Functions
  async function handleOnSubmit(data: LoginFormProps) {
    if (Object.values(data).includes(undefined)) return toast.error('Preecha todos os campos corretamente');

    const loginData = {
      email: data.email ?? '',
      password: data.password ?? '',
    };

    try {
      const response = await loginRequest(loginData);
      setCookie('accessToken', response.data.token.refreshToken);
      setCookie('refreshToken', response.data.token.accessToken);
      navigate('/dashboard');

      toast.success('Login feito com sucesso');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response.data.message || 'Erro ao tentar fazer o login';
      toast.error(errorMessage);
    }

    return;
  }

  return (
    <div style={{ height: '100vh' }} className="w-100 d-flex align-items-center justify-content-center">
      <div className="w-25">
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormGroup>
            <Label htmlFor="username">E-mail</Label>
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Por favor preencha este campo' }}
              render={({ field: { onChange } }) => (
                <Input invalid={errors.email ? true : false} onChange={onChange} type="text" id="email" name="email" />
              )}
            />
            <FormFeedback>{errors.email?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Por favor preencha este campo' }}
              render={({ field: { onChange } }) => (
                <Input
                  invalid={errors.password ? true : false}
                  onChange={onChange}
                  type="password"
                  id="password"
                  name="password"
                />
              )}
            />

            <FormFeedback>{errors.password?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Button className="w-100" color="primary" type="submit">
              Entrar
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default Login;
