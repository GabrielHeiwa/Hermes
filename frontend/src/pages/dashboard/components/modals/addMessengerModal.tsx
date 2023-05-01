import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import { numbers } from '../..';
import { USER_ID } from '../../../../constants/mock';
import { useUser } from '../../../../contexts/user';
import { GetMessagesGroupData, GetMessagesGroupVariables, GET_MESSAGES_GROUP } from '../../../../queries/messagesGroup';
import {
  GetPhonesNumbersByUserIdData,
  GetPhonesNumbersByUserIdVariables,
  GET_PHONES_NUMBERS_BY_USER_ID,
} from '../../../../queries/phonesNumbers';
import { api } from '../../../../services/api';

export interface NewMessenger {
  title: string;
  message: string;
  phone: string;
  start: Date;
  end: Date;
  file: File;
  daysOfWeek: { label: string; value: string }[];
}

interface AddMessengerModalProps {
  handleCloseModal: () => void;
}

export const daysOfWeekOptions = [
  { label: 'Domingo', value: 'sunday' },
  { label: 'Segunda-feira', value: 'monday' },
  { label: 'Terça-feira', value: 'tuesday' },
  { label: 'Quarta-feira', value: 'wednesday' },
  { label: 'Quinta-feira', value: 'thursday' },
  { label: 'Sexta-feira', value: 'friday' },
  { label: 'Sábado', value: 'saturday' },
];

function AddMessengerModal({ handleCloseModal }: AddMessengerModalProps) {
  // Contexts
  const { user } = useUser();

  // Hooks
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<NewMessenger>();

  // States
  const [loadingFile, setLoadingFile] = useState(false);
  const [numbers, setNumbers] = useState<string[]>([]);

  // GraphQL
  const { data } = useQuery<GetMessagesGroupData, GetMessagesGroupVariables>(GET_MESSAGES_GROUP, {
    variables: { userId: user?.id },
  });
  const messagesGroupOptions = data?.messages_groups.map((mg) => ({ label: mg.title, value: mg.id }));

  const { data: phonesNumbersData } = useQuery<GetPhonesNumbersByUserIdData, GetPhonesNumbersByUserIdVariables>(
    GET_PHONES_NUMBERS_BY_USER_ID,
    {
      variables: {
        userId: user?.id,
      },
    },
  );
  const phonesNumbersOptions = phonesNumbersData?.phone_numbers.map((phone_number) => ({
    label: `${phone_number.description} - ${phone_number.phone_number}`,
    value: phone_number.id,
  }));

  // Functions
  async function handleOnSubmit(fields: NewMessenger) {
    try {
      const { data } = await api.post('/messenger/create', {
        ...fields,
        userId: user?.id,
        numbersToSend: numbers,
      });
      toast.success(data.message);
      return;
    } catch (err: any) {
      const errMessage =
        err.message ||
        err.response?.data.message ||
        err.response?.data.error ||
        'Houve um erro ao criar a configuração do mensageiro';

      toast.error(errMessage);

      return;
    }

    // messengers.push({
    //   id: messengers.length,
    //   days: data.daysOfWeekOptions,
    //   message: data.message,
    //   name: data.name,
    //   totalMessages:
    // });
  }

  function handleOnFileLoaded(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    const EXTENSIONS_ACCEPTED = ['text/csv', 'text/plain'];

    try {
      if (!file) throw 'Arquivo não carregado';
      if (!EXTENSIONS_ACCEPTED.includes(file.type)) throw `Formato '${file.type}' não suportado`;

      setLoadingFile((curr) => !curr);
      setValue('file', file);

      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const content = target?.result;

        if (!content) return toast.error('Arquivo vazio');
        const numbers = content.toString().split(/\n|\r/gm).filter(number => !!number);
        setNumbers(numbers);

        setTimeout(() => setLoadingFile((curr) => !curr), 3000);
      };

      reader.readAsText(file);
    } catch (error) {
      toast.error(error as string);

      return;
    }
  }

  return (
    <Modal isOpen size="lg">
      <ModalHeader>Novo messageiro</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor="name">Titúlo</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Campo não pode estar vazio' }}
              render={({ field: { onChange } }) => (
                <Input name="name" id="name" onChange={onChange} invalid={errors.title ? true : false} />
              )}
            />
            <FormFeedback>{errors.title?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Telefone</Label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Campo não pode ser nulo' }}
              render={({ field: { onChange } }) => (
                <ReactSelect options={phonesNumbersOptions} placeholder="Selecione um número" onChange={onChange} />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Conjunto de mensagem</Label>
            <Controller
              name="message"
              rules={{ required: 'Campo não pode estar vazio' }}
              control={control}
              render={({ field: { onChange } }) => (
                <ReactSelect
                  options={messagesGroupOptions}
                  placeholder="Selecione um conjunto de mensagens"
                  onChange={onChange}
                />
                // <Input
                //   name="message"
                //   type="textarea"
                //   id="message"
                //   onChange={onChange}
                //   invalid={errors.message ? true : false}
                // />
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
                    <Input type="time" name="end" id="end" onChange={onChange} invalid={errors.end ? true : false} />
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

          <Row>
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
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleCloseModal} color="link">
          Cancelar
        </Button>
        <Button color="primary" onClick={handleSubmit(handleOnSubmit)}>
          Criar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddMessengerModal;
