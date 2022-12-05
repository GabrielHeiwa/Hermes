// eslint-disable-next-line import/named
import { useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BsFillPersonFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner } from 'reactstrap';
import { useUser } from '../../contexts/user';
import {
  getAllMessengersByUserIdData,
  getAllMessengersByUserIdVariables,
  GET_ALL_MESSENGERS_BY_USER_ID,
} from '../../queries/messengers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setMessengers,
  setSelectedMessengerId,
  setVisibleEditMessengerModal,
  setVisibleMessageGroupModal,
  setVisibleRemoveMessengerModal,
  setVisibleStartMessengerModal,
  setVisibleStopMessengerModal,
} from '../../redux/reducers/dashboardReducer';
import MessengerCard from './components/messenger';
import { AddMessageGroupModal } from './components/modals/addMessagesGroupModal';
import AddMessengerModal from './components/modals/addMessengerModal';
import EditMessengerModal from './components/modals/editMessengerModal';
import NewPhoneNumberModal from './components/modals/newPhoneNumberModal';
import RemoveMessengerModal from './components/modals/removeMessengerModal';
import StartMessengerModal from './components/modals/startMessengerModal';
import StopMessengerModal from './components/modals/stopMessengerModal';

export interface MessengerProps {
  id: string;
  name: string;
  message: string;
  totalSend: number;
  totalPending: number;
  totalMessages: number;
  running: boolean;
  days: string[];
  hours: string[];
  phone: string;
  numbers: string[];
}

export const numbers = [
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
  // Contexts
  const { isAuthenticated } = useUser();

  // Hooks
  const [cookies] = useCookies(['@hermes/userId']);

  // Redux
  const dispatch = useAppDispatch();
  const {
    visibleEditMessengerModal,
    messengers,
    visibleStopMessengerModal,
    visibleStartMessengerModal,
    visibleRemoveMessengerModal,
    visibleAddMessageGroupModal,
  } = useAppSelector((state) => state.dashboardReducer);

  // States
  const [dropdowmNew, setDropdownNew] = useState(false);
  const [openAddMessengerModal, setOpenAddMessengerModal] = useState(false);
  const [openNewPhoneNumberModal, setOpenNewPhoneNumberModal] = useState(false);

  // GraphQL
  const { data, loading, error } = useSubscription<getAllMessengersByUserIdData, getAllMessengersByUserIdVariables>(
    GET_ALL_MESSENGERS_BY_USER_ID,
    {
      variables: { user_id: cookies['@hermes/userId'] },
    },
  );

  // Arrow functions
  const toggleDropdownNew = () => setDropdownNew((curr) => !curr);
  const handleOpenAddMessengerModal = () => setOpenAddMessengerModal((curr) => !curr);
  const handleOpenNewPhoneNumberModal = () => setOpenNewPhoneNumberModal((curr) => !curr);
  const handleSelectedMessenger = (id: string) => dispatch(setSelectedMessengerId(id));
  const handleToggleEditMessenger = () => dispatch(setVisibleEditMessengerModal(!visibleEditMessengerModal));

  const handleOpenStopMessengerModal = () => dispatch(setVisibleStopMessengerModal(true));
  const handleCloseStopMessengerModal = () => dispatch(setVisibleStopMessengerModal(false));

  const handleOpenStartMessengerModal = () => dispatch(setVisibleStartMessengerModal(true));
  const handleCloseStartMessengerModal = () => dispatch(setVisibleStartMessengerModal(false));

  const handleOpenRemoveMessenger = () => dispatch(setVisibleRemoveMessengerModal(true));
  const handleCloseRemoveMessenger = () => dispatch(setVisibleRemoveMessengerModal(false));

  const handleOpenAddMessageGroupModal = () => dispatch(setVisibleMessageGroupModal(true));
  const handleCloseAddMessageGroupModal = () => dispatch(setVisibleMessageGroupModal(false));

  // Functions
  function handleStopMessenger(id: string) {
    handleSelectedMessenger(id);
    handleOpenStopMessengerModal();
  }

  function handleStartMessenger(id: string) {
    handleSelectedMessenger(id);
    handleOpenStartMessengerModal();
  }

  function handleRemoveMessenger(id: string) {
    handleSelectedMessenger(id);
    handleOpenRemoveMessenger();
  }

  function handleEditMessenger(messenger: MessengerProps) {
    handleSelectedMessenger(messenger.id);
    handleToggleEditMessenger();
  }

  // UseEffects
  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      const _messengers = [];
      for (const phoneNumbers of data.users_by_pk.phone_numbers) {
        for (const messenger of phoneNumbers.messengers) {
          const _messenger: MessengerProps = {
            days: messenger.days_running.split(","),
            hours: [messenger.hour_start, messenger.hour_end],
            id: messenger.id,
            message: '',
            name: messenger.title,
            numbers: [],
            phone: phoneNumbers.phone_number,
            running: false,
            totalMessages: 0,
            totalPending: 0,
            totalSend: 0
          }

          _messengers.push(_messenger)
        }
      }

      dispatch(setMessengers(_messengers));
    }

    if (error) {
      console.error(error);
      toast.error('Houve um erro ao pegar as informações dos mensageiros');
    }
  }, [data, error]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Header />

      {visibleAddMessageGroupModal && <AddMessageGroupModal handleCloseModal={handleCloseAddMessageGroupModal} />}
      {openAddMessengerModal && <AddMessengerModal handleCloseModal={handleOpenAddMessengerModal} />}
      {openNewPhoneNumberModal && <NewPhoneNumberModal handleCloseModal={handleOpenNewPhoneNumberModal} />}
      {visibleEditMessengerModal && <EditMessengerModal />}
      {visibleStopMessengerModal && <StopMessengerModal handleCloseModal={handleCloseStopMessengerModal} />}
      {visibleStartMessengerModal && <StartMessengerModal handleCloseModal={handleCloseStartMessengerModal} />}
      {visibleRemoveMessengerModal && <RemoveMessengerModal handleCloseModal={handleCloseRemoveMessenger} />}

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
                <DropdownItem onClick={handleOpenAddMessageGroupModal}>Conjunto de mensagens</DropdownItem>
                <DropdownItem onClick={handleOpenAddMessengerModal}>Mensageiro</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="m-1">
          {loading ? (
            <Spinner color="primary" />
          ) : (
            messengers.map((messenger) => (
              <MessengerCard
                key={messenger.id}
                messenger={messenger}
                handleEditMessenger={handleEditMessenger}
                handleRemoveMessenger={handleRemoveMessenger}
                handleStartMessenger={handleStartMessenger}
                handleStopMessenger={handleStopMessenger}
              />
            ))
          )}
        </Row>
      </main>
    </div>
  );
}

function Header() {
  // Contexts
  const { logout } = useUser();

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
            <DropdownItem onClick={() => logout()}>Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Dashboard;
