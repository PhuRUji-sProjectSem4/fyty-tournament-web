import { generatePath } from "react-router-dom";
import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function getTeams(){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.getTeams)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}

export function createTeam(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.createTeam, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  })
}

export function getTeamEach(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTeamEach, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  })
}

export function getTeamMember(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTeamMember, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  })
}

export function getTeamTourJoined(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTeamTourJoined, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  })
}

export function reqJoieTeam(payload){
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRounteKey.createRequest, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function getTeamReq(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getTeamRequest, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  })
}