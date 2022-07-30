import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BsFillCircleFill,
  BsFillPersonFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
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
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

function Dashboard() {
  const messengers = [
    {
      name: "Lead's 47",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: false,
    },
    {
      name: "Notícias diárias",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: true,
    },
    {
      name: "Alertas",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: false,
    },
    {
      name: "Reuniões",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
    },
    {
      name: "CECOM",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: false,
    },
    {
      name: "Editais",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: false,
    },
    {
      name: "Curredoria",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!",
      totalMessages: 199,
      totalSend: 99,
      totalPending: 100,
      running: false,
    },
  ];

  // States
  const [dropdowmNew, setDropdownNew] = useState(false);
  const [openAddMessengerModal, setOpenAddMessengerModal] = useState(false);

  // Arrow functions
  const toggleDropdownNew = () => setDropdownNew((curr) => !curr);
  const handleOpenAddMessengerModal = () =>
    setOpenAddMessengerModal((curr) => !curr);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header />

      {openAddMessengerModal && (
        <AddMessenger handleClose={handleOpenAddMessengerModal} />
      )}

      <main
        style={{
          height: "90vh",
          whiteSpace: "nowrap",
          overflow: "auto",
        }}
      >
        <Row className="m-1">
          <Col className="d-flex justify-content-end">
            <Dropdown
              isOpen={dropdowmNew}
              toggle={toggleDropdownNew}
              direction="start"
            >
              <DropdownToggle className="px-4 py-1" color="primary">
                Novo
              </DropdownToggle>
              <DropdownMenu className="mx-1">
                <DropdownItem header>Opções</DropdownItem>
                <DropdownItem>Número</DropdownItem>
                <DropdownItem onClick={handleOpenAddMessengerModal}>
                  Mensageiro
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="m-1">
          {messengers.map((messenger) => {
            // States
            const [dropdownOpen, setDropdownOpen] = useState(false);

            // Arrow functions
            const toggle = () => setDropdownOpen((curr) => !curr);

            return (
              <Col md={4} key={messenger.name}>
                <Card className="m-1">
                  <CardHeader>
                    <Row>
                      <Col>
                        <span>{messenger.name}</span>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Dropdown
                          isOpen={dropdownOpen}
                          toggle={toggle}
                          direction="start"
                        >
                          <DropdownToggle
                            color="link"
                            className="shadow-none text-dark"
                          >
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
                        <span className="h1">{messenger.totalPending}</span>{" "}
                        Restantes
                      </Col>

                      <Col
                        md={6}
                        className="d-flex justify-content-start align-items-end"
                      >
                        <span className="d-flex flex-row">
                          Rodando:{" "}
                          <BsFillCircleFill
                            className={`m-1 ${
                              messenger.running ? "text-success" : "text-danger"
                            }`}
                          />
                        </span>
                      </Col>

                      <Col>
                        <span className="p-1">
                          Total: {messenger.totalMessages}
                        </span>
                      </Col>

                      <Col>
                        <span>Enviadas: {messenger.totalSend}</span>
                      </Col>
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
    <Row className="m-0" style={{ height: "8vh" }}>
      <Col className="d-flex justify-content-end align-items-center">
        <BsFillPersonFill />

        <Dropdown
          className="mx-1"
          isOpen={dropdownUser}
          toggle={toggleUser}
          direction="down"
        >
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

interface NewMessenger {
  name: string;
  message: string;
  start: Date;
  end: Date;
  file: File;
}

function AddMessenger({ handleClose }: AddMessengerProps) {
  // Hooks
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewMessenger>();

  // Functions
  function handleOnSubmit(data) {}

  return (
    <Modal isOpen={true}>
      <ModalHeader>Novo messageiro</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor="name">Nome</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Campo não pode estar vazio" }}
              render={({ field: { onChange } }) => (
                <Input
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
            <Label htmlFor="message">Mensagem</Label>
            <Controller
              name="message"
              rules={{ required: "Campo não pode estar vazio" }}
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
                  rules={{ required: "Campo não pode estar vazio" }}
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
              </FormGroup>
              <FormFeedback>{errors.start?.message}</FormFeedback>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="start">Término</Label>
                <Controller
                  control={control}
                  name="end"
                  rules={{ required: "Campo não pode estar vazio" }}
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
              </FormGroup>
              <FormFeedback>{errors.end?.message}</FormFeedback>
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

export { Dashboard };

{
  /* <header
        style={{ height: "10vh", background: "green" }}
        className="w-full h-16 z-40 flex items-center justify-between"
      >
        <div className="block lg:hidden ml-6">
          <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
            <svg
              width={20}
              height={20}
              className="text-gray-400"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
            </svg>
          </button>
        </div>
        <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
          <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
            <button className="flex p-2 items-center rounded-full text-gray-400 hover:text-gray-700 bg-white shadow text-md">
              <svg
                width={20}
                height={20}
                className=""
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"></path>
              </svg>
            </button>
            <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md">
              <svg
                width={20}
                height={20}
                className="text-gray-400"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z"></path>
              </svg>
            </button>
            <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
            <a href="#" className="block relative">
              <img
                alt="profil"
                src="/images/person/1.jpg"
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <button className="flex items-center text-gray-500 dark:text-white text-md">
              Charlie R
              <svg
                width={20}
                height={20}
                className="ml-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header> */
}
