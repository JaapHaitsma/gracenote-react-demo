import { useMemo, useState } from "react";
import styled from "styled-components";

import { useFetchData } from "../hooks/useFetchData";

import { Title } from "../components/Title";

const Content = styled.div`
  background-color: aliceblue;
  top: 1rem;
`;

export const LandingPage = () => {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [zipcode, setZipcode] = useState("49464");

  const now = new Date();
  const ISODate = now.toISOString();
  const startDate = ISODate.split("T")[0];

  const queryString = useMemo(() => {
    return {
      startDate: startDate,
      zip: zipcode,
      api_key: apiKey,
    };
  }, [apiKey, startDate, zipcode]);

  interface FetchData {
    isLoading?: boolean;
    data?: [] | undefined;
    error?: Error;
  }

  interface Show {
    tmsId: string;
  }

  const {
    isLoading,
    data: shows,
    error,
  }: FetchData = useFetchData(baseUrl, moviesTheatrePathName, queryString);

  return (
    <Content>
      <h3>This is the Landing page.</h3>
      <select
        value={zipcode}
        onChange={(event) => {
          setZipcode(event.target.value);
        }}
      >
        <option value="49464">1</option>
        <option value="30075">2</option>
        <option value="60067">3</option>
        <option value="01886">4</option>
      </select>
      <div>
        {isLoading && "Loading..."}
        {error && JSON.stringify(error)}
        {shows &&
          !!shows.length &&
          shows.map((show: Show) => <Title key={show.tmsId} show={show} />)}
      </div>
    </Content>
  );
};
