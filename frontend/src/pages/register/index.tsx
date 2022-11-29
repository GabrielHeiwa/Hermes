import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerRequest } from '../../requests/registerRequest';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// TODO: Login user function

interface RegisterFormProps {
  email?: string;
  password?: string;
}

interface RegisterDataRequest {
  message: string;
  userId: string;
}

function Register() {
  // Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormProps>();
  const [, setCookie] = useCookies(['@hermes/userId']);
  const navigate = useNavigate();

  // Functions
  async function handleOnSubmit(data: RegisterFormProps) {
    if (Object.values(data).includes(undefined)) return toast.error('Preecha todos os campos corretamente');

    const registerData = {
      email: data.email ?? '',
      password: data.password ?? '',
    };

    try {
      const { userId, message } = await registerRequest<RegisterDataRequest>(registerData);
      setCookie('@hermes/userId', userId);
      toast.success(message);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || err.response?.data.message || 'Erro ao tentar fazer o login';
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

export default Register;
