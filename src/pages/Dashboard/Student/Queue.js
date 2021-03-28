import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useSocket} from "../../../context/SocketContext";
import Layout from "../../../layout";
import Seo from "../../../components/Seo";
import Devider from "../../../components/Devider";
import PopupMessage from "../../../components/PopupMessage";
import Spinner from "../../../components/Spinner";
import {BackButton, Button} from "../../../components/Button";
import NoData from "../../../components/NoData";
import PersonProfileCard from "../../../components/PersonProfileCard";
import {
  Title,
  Subtitle,
  AntrianContainer
} from "../../../components/Dashboard/Section";
import studentAvatars from "../../../images/students";
import generateQueueStatusMessage from "../../../utils/queueStatusMessage";
import closeSVG from "../../../images/close.svg";

const Header = styled.div`
  margin: 4rem 0;
`;

const CloseImg = styled.img.attrs({
  src: closeSVG,
  alt: ""
})`
  width: 15px;
  display: block;
`;

const CloseBtn = styled.button`
  padding: 5px;
`;

function Queue(props) {
  const socket = useSocket();
  const [queue, setQueue] = useState(undefined);
  const [rejectQueue, setRejectQueue] = useState(false);
  const {id, fullname, professorID, professorStatus} = props;
  const activeQueue = queue?.find(q => q.status === "active");
  const pendingQueue = queue?.filter(q => q.status === "pending");
  const statusMessage =
    queue && generateQueueStatusMessage(id, activeQueue?.id, queue);

  useEffect(() => {
    socket.emit("getQueue", professorID);
    socket.on("newData", (data, profID) => {
      const isInQueue = data.find(x => x.id === id);
      if (isInQueue && professorID === profID) {
        setQueue(data);
      } else {
        setQueue(null);
      }
    });
  }, [id, professorID, socket]);

  const enqueue = () => {
    if (professorStatus) {
      socket.emit("requestQueue", {id, professorID});
      return;
    }

    setRejectQueue(true);
  };

  const dequeue = () => {
    const {time} = queue.find(a => a.id === id);
    socket.emit("outFromQueue", {id, time, professorID});
  };

  const closePopup = () => {
    setRejectQueue(false);
  };

  if (typeof queue !== "object") {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title={`Antrian | ${fullname}`} />
      <BackButton />
      <Header>
        <PopupMessage isOpen={rejectQueue} type="error" closePopup={closePopup}>
          Dosen pembimbing sedang tidak tersedia!
        </PopupMessage>
        <Title>Antrian</Title>
        <Subtitle>{statusMessage}</Subtitle>
      </Header>
      <AntrianContainer>
        {activeQueue ? (
          <>
            <PersonProfileCard.Container>
              <PersonProfileCard.Avatar
                src={studentAvatars[activeQueue.avatar]}
                alt={`${activeQueue.fullname} avatar`}
              />
              <PersonProfileCard.Content
                fullname={activeQueue.fullname}
                study={activeQueue.study}
              />
            </PersonProfileCard.Container>
            <Devider />
          </>
        ) : null}
        {queue ? (
          pendingQueue.map(
            ({fullname: studentName, id: studentID, avatar, study}) => {
              return (
                <PersonProfileCard.Container key={studentID}>
                  <PersonProfileCard.Avatar
                    src={studentAvatars[avatar]}
                    alt={`${studentName} avatar`}
                  />
                  <PersonProfileCard.Content
                    fullname={studentName}
                    study={study}
                  />
                  {studentID === id && (
                    <PersonProfileCard.Button as={CloseBtn} onClick={dequeue}>
                      <CloseImg />
                    </PersonProfileCard.Button>
                  )}
                </PersonProfileCard.Container>
              );
            }
          )
        ) : (
          <NoData message="Kamu belum melakukan bimbingan">
            <Button onClick={enqueue}>Mulai mengantri</Button>
          </NoData>
        )}
      </AntrianContainer>
    </Layout>
  );
}

export default Queue;
