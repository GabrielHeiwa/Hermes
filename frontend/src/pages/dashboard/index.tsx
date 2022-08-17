import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsFillCircleFill, BsFillPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
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

const messengers = [
  {
    id: 1,
    name: "Lead's 47",
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo', 'Domingo'],
    hours: ['10:00', '18:00'],
    phone: '(47) 9 9999-9999',
  },
  {
    id: 2,
    name: 'Notícias diárias',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: true,
  },
  {
    id: 3,
    name: 'Alertas',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
  },
  {
    id: 4,
    name: 'Reuniões',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
  },
  {
    id: 5,
    name: 'CECOM',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
  },
  {
    id: 6,
    name: 'Editais',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
  },
  {
    id: 7,
    name: 'Curredoria',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
  },
];

const numbers = [
  {
    id: 1,
    phone: '47991907711',
    description: 'Telefone pessoal',
  },
  {
    id: 2,
    phone: '47984288351',
    description: 'Telefone 2',
  },
];

function Dashboard() {
  // States
  const [dropdowmNew, setDropdownNew] = useState(false);
  const [openAddMessengerModal, setOpenAddMessengerModal] = useState(false);
  const [openNewPhoneNumberModal, setOpenNewPhoneNumberModal] = useState(false);

  // Arrow functions
  const toggleDropdownNew = () => setDropdownNew((curr) => !curr);
  const handleOpenAddMessengerModal = () => setOpenAddMessengerModal((curr) => !curr);
  const handleOpenNewPhoneNumberModal = () => setOpenNewPhoneNumberModal((curr) => !curr);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Header />

      {openAddMessengerModal && <AddMessenger handleClose={handleOpenAddMessengerModal} />}
      {openNewPhoneNumberModal && <NewPhoneNumber handleClose={handleOpenNewPhoneNumberModal} />}

      <main
        style={{
          height: '90vh',
          whiteSpace: 'nowrap',
          overflow: 'auto',
        }}
      >
        <Row className="m-1">
          <Col className="d-flex justify-content-end">
            <Dropdown isOpen={dropdowmNew} toggle={toggleDropdownNew} direction="start">
              <DropdownToggle className="px-4 py-1" color="primary">
                Novo
              </DropdownToggle>
              <DropdownMenu className="mx-1">
                <DropdownItem header>Opções</DropdownItem>
                <DropdownItem onClick={handleOpenNewPhoneNumberModal}>Número</DropdownItem>
                <DropdownItem onClick={handleOpenAddMessengerModal}>Mensageiro</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="m-1">
          {messengers.map((messenger) => {
            // Redux
            // const dispatch = useDispatch();

            // States
            const [dropdownOpen, setDropdownOpen] = useState(false);

            // Arrow functions
            const toggle = () => setDropdownOpen((curr) => !curr);
            // const handleSelectedMessenger = () => dispatch(setSelectedMessengerId(String(messenger.id)))

            return (
              <Col md={4} key={messenger.id}>
                <Card className="m-1">
                  <CardHeader>
                    <Row>
                      <Col>
                        <span>{messenger.name}</span>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="start">
                          <DropdownToggle color="link" className="shadow-none text-dark">
                            <BsThreeDotsVertical />
                          </DropdownToggle>
                          <DropdownMenu flip={false}>
                            <DropdownItem header>Opções</DropdownItem>
                            <DropdownItem>Parar</DropdownItem>
                            <DropdownItem>Iniciar</DropdownItem>
                            <DropdownItem>Remover</DropdownItem>
                            <DropdownItem>Editar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <span className="h1">{messenger.totalPending}</span> Restantes
                      </Col>

                      <Col md={6} className="d-flex justify-content-start align-items-end">
                        <span className="d-flex flex-row">
                          Rodando:{' '}
                          <BsFillCircleFill className={`m-1 ${messenger.running ? 'text-success' : 'text-danger'}`} />
                        </span>
                      </Col>

                      <Col>
                        <span>Total: {messenger.totalMessages}</span>
                      </Col>

                      <Col>
                        <span>Enviadas: {messenger.totalSend}</span>
                      </Col>
                    </Row>

                    <Row>
                      <span className="text-truncate">Mensagem: {messenger.message}</span>
                    </Row>

                    <Row>
                      <span className="text-truncate">Dias: {messenger.days?.join(', ')}</span>
                    </Row>

                    <Row>
                      <span>Horário: das {messenger.hours?.join(' às ')}</span>
                    </Row>

                    <Row>
                      <span>Número: {messenger.phone}</span>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </main>
    </div>
  );
}

function Header() {
  // States
  const [dropdownUser, setDropdownUser] = useState(false);

  // Arrow functions
  const toggleUser = () => setDropdownUser((curr) => !curr);

  return (
    <Row className="m-0" style={{ height: '8vh' }}>
      <Col className="d-flex justify-content-end align-items-center">
        <BsFillPersonFill />

        <Dropdown className="mx-1" isOpen={dropdownUser} toggle={toggleUser} direction="down">
          <DropdownToggle split color="link" className="shadow-none">
            <span className="text-truncate"> Gabriel P.</span>
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem>Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  );
}

interface AddMessengerProps {
  handleClose: () => void;
}

const daysOfWeekOptions = [
  { label: 'Domingo', value: 'sunday' },
  { label: 'Segunda-feira', value: 'monday' },
  { label: 'Terça-feira', value: 'tuesday' },
  { label: 'Quarta-feira', value: 'wednesday' },
  { label: 'Quinta-feira', value: 'thursday' },
  { label: 'Sexta-feira', value: 'friday' },
  { label: 'Sábado', value: 'saturday' },
];

interface NewMessenger {
  name: string;
  message: string;
  phone: string;
  start: Date;
  end: Date;
  file: File;
  daysOfWeek: { label: string; value: string }[];
}

function AddMessenger({ handleClose }: AddMessengerProps) {
  // Hooks
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<NewMessenger>();

  // States
  const [loadingFile, setLoadingFile] = useState(false);

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
        const numbers = content.toString().split(/\n|\r/gm)
        console.log(numbers)        

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
            <Label htmlFor="name">Nome</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Campo não pode estar vazio' }}
              render={({ field: { onChange } }) => (
                <Input name="name" id="name" onChange={onChange} invalid={errors.name ? true : false} />
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
                  options={numbers.map((number) => ({
                    label: `${number.description} - ${number.phone}`,
                    value: number.id,
                  }))}
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
                      type="datetime-local"
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
                      type="datetime-local"
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

interface NewPhoneNumberProps {
  handleClose: () => void;
}

interface PhoneNumber {
  phone: string;
  description: string;
}

function NewPhoneNumber({ handleClose }: NewPhoneNumberProps) {
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumber>();

  // Functions
  function handleOnSubmit(data: PhoneNumber) {
    console.log(data);

    numbers.push({
      id: numbers.length,
      ...data,
    });
  }

  return (
    <Modal isOpen={true}>
      <ModalHeader>Novo número de celular</ModalHeader>

      <ModalBody>
        <Form>
          <Row>
            <FormGroup>
              <Label htmlFor="phone">Celular</Label>
              <Controller
                control={control}
                name="phone"
                rules={{ required: 'Campo não pode ser vazio' }}
                render={({ field: { onChange } }) => (
                  <Input id="phone" name="phone" invalid={errors.phone ? true : false} onChange={onChange} />
                )}
              />
              {errors.phone ? <FormFeedback>{errors.phone.message}</FormFeedback> : <></>}
            </FormGroup>

            <FormGroup>
              <Label>Descrição</Label>
              <Controller
                control={control}
                name="description"
                rules={{ required: 'Campo não pode ser vazio' }}
                render={({ field: { onChange } }) => (
                  <Input
                    id={'description'}
                    type="textarea"
                    name="description"
                    invalid={errors.description ? true : false}
                    onChange={onChange}
                  />
                )}
              />
              {errors.description ? <FormFeedback>{errors.description.message}</FormFeedback> : <></>}
            </FormGroup>
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="link" onClick={handleClose} type="button">
          Cancelar
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit(handleOnSubmit)}>
          Adicionar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export { Dashboard };
