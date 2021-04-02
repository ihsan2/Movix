import {BASE_URL, API_VERSION} from './constants';
import axios from 'axios';

export const API = (endpoint, params) => {
  let requestHeaders = {
    accept: 'application/json',
  };

  const request = axios.create({
    baseURL: `${BASE_URL}${API_VERSION}`,
    timeout: 5000,
    headers: requestHeaders,
  });

  return {
    request,
  };
};

export const scrollIsCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 60;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
