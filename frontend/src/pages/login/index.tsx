import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";

// TODO: Login user function

interface LoginFormProps {
  username: string;
  password: string;
}

function Login() {
  // Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormProps>();

  // Functions
  function handleOnSubmit(data: LoginFormProps) {
    console.log(data);

    return;
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <div className="w-25">
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormGroup>
            <Label htmlFor="username">Usuário</Label>
            <Controller
              control={control}
              name="username"
              rules={{ required: "Por favor preencha este campo" }}
              render={({ field: { onChange } }) => (
                <Input
                  invalid={errors.username ? true : false}
                  onChange={onChange}
                  type="text"
                  id="username"
                  name="username"
                />
              )}
            />
            <FormFeedback>{errors.username?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Por favor preencha este campo" }}
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
