import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbService from "../services/tmdbService";
import { MediaType } from "../types";
import {
  NavBar,
  VideoContainer,
  WatchPageContainer,
  YoutubeFrame,
} from "./WatchPage.styled";
import { IoMdArrowBack as Back_icon } from "react-icons/io";

interface WatchPageProps {
  type: MediaType;
}

const STOCK_VIDEO = "kVxTrhojpFI";

const WatchPage = ({ type }: WatchPageProps) => {
  const [videoKey, setVideoKey] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      tmdbService.getVideo(type, id).then((key) => {
        if (key) setVideoKey(key);
        else setVideoKey(STOCK_VIDEO);
      });

    if (!id) navigate("/browse");
  }, []);

  return (
    <WatchPageContainer>
      {videoKey && (
        <VideoContainer>
          <NavBar>
            <Back_icon onClick={() => navigate(-1)} />
          </NavBar>
          <YoutubeFrame
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="autoplay"
          />
        </VideoContainer>
      )}
    </WatchPageContainer>
  );
};

export default WatchPage;
