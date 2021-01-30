import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://api.tvmaze.com/search/shows?q=';
const baseUrl1 = 'http://api.tvmaze.com/shows';

export function getTVShowNames(query){
  if(query!=""){
    return fetch(baseUrl + query)
    .then(handleResponse)
    .catch(handleError);
  }
  else{
    return fetch(baseUrl1)
    .then(handleResponse)
    .catch(handleError);
  }
}