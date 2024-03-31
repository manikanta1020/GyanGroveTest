import  { useEffect, useState, useRef } from "react";
import arrow from "../assets/right-arrow-black.svg";
import axios from "axios";

const NewEvent = () => {
  const [events, setEvents] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    fetchEvents();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    setLoading(false);
  }, [events]);

  const fetchEvents = () => {
    setLoading(true);
    axios
      .get(
        `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`
      )
      .then((response) => {
        if (response.data.events.length === 0) {
          setReachedEnd(true);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...response.data.events]);
          const ids = response.data.events.map((item) =>
            extractFileId(item.imgUrl)
          );
          setFileIds((prevFileIds) => [...prevFileIds, ...ids]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleScroll = () => {
    if (
      bottomBoundaryRef.current &&
      bottomBoundaryRef.current.getBoundingClientRect().top <= window.innerHeight &&
      !loading &&
      !reachedEnd
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const extractFileId = (imgUrl) => {
    const startIndex = imgUrl.indexOf("/d/") + 3;
    const endIndex = imgUrl.indexOf("/view", startIndex);
    if (startIndex !== -1 && endIndex !== -1) {
      return imgUrl.substring(startIndex, endIndex);
    } else {
      console.error("Invalid image URL format");
      return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const convertToKilometers = (distanceInMeters) => {
    return (distanceInMeters / 1000).toFixed(2);
  };

  const reduceEventName = (eventName) => {
    const parts = eventName.split(" ");
    if (parts.length >= 3) {
      return parts.slice(0, 2).join(" ");
    } else {
      return eventName;
    }
  };

  return (
    <div>
      <div className="flex items-center font-semibold gap-2">
        <p className="ml-12">Upcoming events</p>
        <img src={arrow} alt="right-arrow" className="w-4 h-4" />
      </div>
      <div className="flex flex-wrap gap-12 mt-6 w-11/12 mx-20 max-[480px]:mx-auto">
        {events.map((item, index) => (
          <div key={index}>
            <div className="border">
              <div className="relative">
                <img
                  src={`https://drive.google.com/thumbnail?id=${fileIds[index]}&sz=w1000`}
                  alt={`event${index}`}
                  className="w-72"
                />
                <div className="absolute bottom-3 text-center text-white bg-black w-11/12 left-3">
                  {formatDate(item.date)}
                </div>
              </div>
              <div className="ps-3 text-sm">
                <div className="font-semibold">
                  {reduceEventName(item.eventName)}
                </div>
                <div className="flex justify-between">
                  <div>{item.cityName}</div>
                  <div className="flex gap-1">
                    <div>{item.weather}</div>|
                    <div className="pe-2">
                      {convertToKilometers(item.distanceKm)} Km
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
        {reachedEnd && <div>No more events</div>}
        <div ref={bottomBoundaryRef} />
      </div>
    </div>
  );
};

export default NewEvent;
