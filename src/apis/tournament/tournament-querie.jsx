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

export function updateTournamentRule({id, payload}){
  return new Promise((resolve, reject) => {
    coreApi
      .put(generatePath(ApiRounteKey.updateTournament, {id}), {rule: payload})
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function registerTournament(id){
  return new Promise((resolve, reject) => {
    coreApi
      .put(generatePath(ApiRounteKey.registerTournament, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function startTournament(id){
  return new Promise((resolve, reject) => {
    coreApi
      .put(generatePath(ApiRounteKey.startTournament, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function endTournament(id){
  return new Promise((resolve, reject) => {
    coreApi
      .put(generatePath(ApiRounteKey.endTournament, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function createMatch(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.cretaeTournamentMatch, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function joinTournament(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.joinTournament, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function createMatchScore(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.createMatchScore, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function updateTournamentDetail(payload){
  const {id, ...data} = payload 
  return new Promise((resolve, reject) => {
    coreApi
      .put(generatePath(ApiRounteKey.updateTournament, {id}), data)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function deleteTour(id){
  return new Promise((resolve, reject) => {
    coreApi
      .delete(generatePath(ApiRounteKey.deleteTournament, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function deleteMatch(id){
  return new Promise((resolve, reject) => {
    coreApi
      .delete(generatePath(ApiRounteKey.deleteMatch, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}