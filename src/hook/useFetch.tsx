import axios from 'axios';
import { useEffect, useState } from 'react';
import { Job } from '../types/job.type';

type QueryType = {
  query: string;
  num_pages: string;
  page: string;
};

export const useFetch = (endpoint: string, query: QueryType) => {
  const [data, setData] = useState<Job[]>([] as Job[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    url: `${process.env.BASE_URL}/${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};
