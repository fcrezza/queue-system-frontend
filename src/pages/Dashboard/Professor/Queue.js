import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";
import {useSocket} from "../../../utils/socket";
import Layout from "../../../layout";
import Spinner from "../../../components/Spinner";
import Seo from "../../../components/Seo";
import Devider from "../../../components/Devider";
import {BackButton, Button} from "../../../components/Button";
import {
  Title,
  Subtitle,
  AntrianContainer
} from "../../../components/Dashboard/Section";
import studentAvatars from "../../../images/students";
import PersonProfileCard from "../../../components/PersonProfileCard";
import NoData from "../../../components/NoData";

const Link = styled(RouterLink)`
  text-decoration: none;
  padding: 0.6rem 0.8rem;
`;

const ControlContainer = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Queue({id, fullname}) {
  const socket = useSocket();
  const [queue, setQueue] = useState(undefined);
  const activeQueue = queue?.find(q => q.status === "active");
  const pendingQueue = queue?.filter(q => q.status === "pending");

  useEffect(() => {
    socket.emit("getQueue", id);
    socket.on("newData", (data, profID) => {
      if (profID === id) {
        setQueue(data);
      } else {
        setQueue(null);
      }
    });
  }, [id, socket]);

  const nextQueue = () => {
    socket.emit("nextQueue", activeQueue, pendingQueue[0]);
  };

  if (typeof queue !== "object") {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Layout>
      <Seo title={`Antrian | ${fullname}`} />
      <BackButton />
      <ControlContainer>
        <div>
          <Title>Antrian</Title>
          <Subtitle>
            {pendingQueue.length
              ? `${pendingQueue.length} mahasiswa menunggu`
              : null}
          </Subtitle>
        </div>
        <Button disabled={!queue.length} onClick={nextQueue}>
          Next
        </Button>
      </ControlContainer>
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
              <PersonProfileCard.Button
                as={Link}
                to={`/students/${activeQueue.id}`}
              >
                Lihat
              </PersonProfileCard.Button>
            </PersonProfileCard.Container>
            <Devider />
          </>
        ) : null}
        {queue.length ? (
          pendingQueue.map(
            ({fullname: studentName, id: studentID, avatar, study}) => {
              return (
                <PersonProfileCard.Container>
                  <PersonProfileCard.Avatar
                    src={studentAvatars[avatar]}
                    alt={`${studentName} avatar`}
                  />
                  <PersonProfileCard.Content
                    fullname={studentName}
                    study={study}
                  />
                  <PersonProfileCard.Button
                    as={Link}
                    to={`/students/${studentID}`}
                  >
                    Lihat{" "}
                  </PersonProfileCard.Button>
                </PersonProfileCard.Container>
              );
            }
          )
        ) : (
          <NoData message="Tidak ada mahasiswa yang mengantri" />
        )}
      </AntrianContainer>
    </Layout>
  );
}

export default Queue;
