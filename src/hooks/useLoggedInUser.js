import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../api/axiosDefaults';

const fetchUser = async () => {
  const { data } = await axios.get('http://localhost:8000/dj-rest-auth/user/');
  return data;
};

export const useLoggedInUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    onError: (error) => {
      console.log('error here: ', error);
      if (error.response?.status === 403) {
        console.log('User is not authenticated');
      } else {
        console.error(error);
      }
    },
  });
};
