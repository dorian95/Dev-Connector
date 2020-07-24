/**
 * function takes in a token, if it's there
 * it'll add it to the headers,
 * otherwise will delete it
 *  */

import axios from 'axios';
import { set } from 'mongoose';

const setAuthToken = (token) => {
  if (token) {
    //set global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
