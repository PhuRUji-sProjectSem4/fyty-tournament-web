import { generatePath } from "react-router-dom";
import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function getTournament(){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.getTournament)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}

export function createTournament(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.createTournament, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function getTournamentEach(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTournamentEach, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}


export function getTournamentJoined(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTournamentJoined, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function getTournamentMatch(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTournamentMatch, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}