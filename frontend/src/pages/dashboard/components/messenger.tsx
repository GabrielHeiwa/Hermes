import { useState } from 'react';
import { BsFillCircleFill, BsThreeDotsVertical } from 'react-icons/bs';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { MessengerProps } from '..';

interface MessengerCardProps {
  messenger: MessengerProps;
  handleStopMessenger: (id: number) => void;
  handleStartMessenger: (id: number) => void;
  handleEditMessenger: (messenger: MessengerProps) => void;
  handleRemoveMessenger: (id: number) => void;
}

function MessengerCard({
  messenger,
  handleEditMessenger,
  handleRemoveMessenger,
  handleStartMessenger,
  handleStopMessenger,
}: MessengerCardProps) {
  // States
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Arrow functions
  const toggle = () => setDropdownOpen((curr) => !curr);

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
                  <DropdownItem onClick={() => handleStopMessenger(messenger.id)}>Parar</DropdownItem>
                  <DropdownItem onClick={() => handleStartMessenger(messenger.id)}>Iniciar</DropdownItem>
                  <DropdownItem onClick={() => handleRemoveMessenger(messenger.id)}>Remover</DropdownItem>
                  <DropdownItem onClick={() => handleEditMessenger(messenger)}>Editar</DropdownItem>
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
                Rodando: <BsFillCircleFill className={`m-1 ${messenger.running ? 'text-success' : 'text-danger'}`} />
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
}

export default MessengerCard;
