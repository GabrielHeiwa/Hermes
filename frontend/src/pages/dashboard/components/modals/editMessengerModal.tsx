import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { numbers } from '../..';
import {
  useAppDispatch,
  // useAppDispatch,
  useAppSelector,
} from '../../../../redux/hooks';
import { setVisibleEditMessengerModal } from '../../../../redux/reducers/dashboardReducer';
// import { setVisibleEditMessengerModal } from '../../../../redux/reducers/dashboardReducer';
import { daysOfWeekOptions, NewMessenger } from './addMessengerModal';

function EditMessengerModal() {
  // Redux
  const dispatch = useAppDispatch();
  const { messengerIdSelected, messengers } = useAppSelector((state) => state.dashboardReducer);

  // States
  //   const [loadingFile, setLoadingFile] = useState<boolean>(false);

  // Hooks
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
  } = useForm<NewMessenger>();

  // Arrow functions
  const handleClose = () => dispatch(setVisibleEditMessengerModal(false));

  // Functions
  function handleOnSubmit(data: NewMessenger) {
    console.log(data);

    // messengers.push({
    //   id: messengers.length,
    //   days: data.daysOfWeekOptions,
    //   message: data.message,
    //   name: data.name,
    //   totalMessages:
    // });
  }

  //   function handleOnFileLoaded(e: React.ChangeEvent<HTMLInputElement>) {
  //     const file = e.target.files ? e.target.files[0] : null;
  //     const EXTENSIONS_ACCEPTED = ['text/csv', 'text/plain'];

  //     try {
  //       if (!file) throw 'Arquivo não carregado';
  //       if (!EXTENSIONS_ACCEPTED.includes(file.type)) throw `Formato '${file.type}' não suportado`;

  //       setLoadingFile((curr) => !curr);
  //       setValue('file', file);

  //       const reader = new FileReader();
  //       reader.onload = ({ target }) => {
  //         const content = target?.result;

  //         if (!content) return toast.error('Arquivo vazio');
  //         const numbers = content.toString().split(/\n|\r/gm);
  //         console.log(numbers);

  //         setTimeout(() => setLoadingFile((curr) => !curr), 3000);
  //       };

  //       reader.readAsText(file);
  //     } catch (error) {
  //       toast.error(error as string);

  //       return;
  //     }
  //   }

  const messengerSelected = messengers.find((messenger) => messenger.id === messengerIdSelected);
  console.log(messengerSelected, messengerIdSelected);

  const numberOptions = numbers.map((number) => ({
    label: `${number.description} - ${number.phone}`,
    value: number.id,
    phone: number.phone,
  }));

  return (
    <Modal isOpen size="lg">
      <ModalHeader>Novo messageiro</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor="name">Nome</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Campo não pode estar vazio' }}
              render={({ field: { onChange } }) => (
                <Input
                  value={messengerSelected?.name}
                  name="name"
                  id="name"
                  onChange={onChange}
                  invalid={errors.name ? true : false}
                />
              )}
            />
            <FormFeedback>{errors.name?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Telefone</Label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Campo não pode ser nulo' }}
              render={({ field: { onChange } }) => (
                <ReactSelect
                  options={numberOptions}
                  defaultValue={numberOptions.find(({ phone }) => phone === messengerSelected?.phone)}
                  placeholder="Selecione um número"
                  onChange={onChange}
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Mensagem</Label>
            <Controller
              name="message"
              rules={{ required: 'Campo não pode estar vazio' }}
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  value={messengerSelected?.message}
                  name="message"
                  type="textarea"
                  id="message"
                  onChange={onChange}
                  invalid={errors.message ? true : false}
                />
              )}
            />
            <FormFeedback>{errors.message?.message}</FormFeedback>
          </FormGroup>

          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="start">Início</Label>
                <Controller
                  control={control}
                  name="start"
                  rules={{ required: 'Campo não pode ser vazio' }}
                  render={({ field: { onChange } }) => (
                    <Input
                      value={messengerSelected?.hours[0]}
                      type="time"
                      name="start"
                      id="start"
                      onChange={onChange}
                      invalid={errors.start ? true : false}
                    />
                  )}
                />
                <FormFeedback>{errors.start?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="start">Término</Label>
                <Controller
                  control={control}
                  name="end"
                  rules={{ required: 'Campo não pode ser vazio' }}
                  render={({ field: { onChange } }) => (
                    <Input
                      value={messengerSelected?.hours[1]}
                      type="time"
                      name="end"
                      id="end"
                      onChange={onChange}
                      invalid={errors.end ? true : false}
                    />
                  )}
                />
                <FormFeedback>{errors.end?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label>Dias da semana</Label>
                <Controller
                  control={control}
                  name="daysOfWeek"
                  render={({ field: { onChange } }) => (
                    <ReactSelect
                      options={daysOfWeekOptions}
                      defaultValue={messengerSelected?.days.map((day) => ({ label: day, value: day }))}
                      isMulti
                      isClearable
                      closeMenuOnSelect={false}
                      noOptionsMessage={() => 'Acabou os dias da semana :/'}
                      onChange={onChange}
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          {/* <Row>
            <Col>
              <Label htmlFor="file">Arquivo com os números</Label>
              <Controller
                control={control}
                name="file"
                rules={{ required: 'Campo não pode ser vazio' }}
                render={() => (
                  <InputGroup>
                    <Input
                      name="file"
                      id="file"
                      type="file"
                      accept="text/*"
                      className="shadow-none"
                      onChange={handleOnFileLoaded}
                    />
                    {loadingFile && (
                      <Button disabled outline color="primary shadow">
                        <Spinner size="sm" color="primary" />
                      </Button>
                    )}
                  </InputGroup>
                )}
              />
            </Col>
          </Row> */}
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleClose} color="link">
          Cancelar
        </Button>
        <Button color="primary" onClick={handleSubmit(handleOnSubmit)}>
          Criar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditMessengerModal;
