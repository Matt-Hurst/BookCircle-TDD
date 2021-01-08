import axios from 'axios';
import { retrieveTokenFromLocalStorage } from '../../auth';
import { URL } from '../../helpers';

export const getFriendName = async (id: string) => {
  const { data } = await axios(`${URL}getFriendsNames/${id}`, {
    method: 'GET',
    headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
  })
  return data
}