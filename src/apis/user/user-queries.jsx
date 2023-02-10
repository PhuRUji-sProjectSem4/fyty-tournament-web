import { generatePath } from "react-router-dom";
import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function getUser(){
  return new Promise((resolve, reject) => {
    coreApi
      .get(ApiRounteKey.getMyProfile)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function getUserEach(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getUserEach, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}

export function getUserHistory(id){
    return new Promise((resolve, reject) => {
      coreApi
        .get(generatePath(ApiRounteKey.getUserHistory, {id}))
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}

export function getUserSchedule(){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.getUserSchedule)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}

export function getUserTournament(){
  return new Promise((resolve, reject) => {
    coreApi
      .get(ApiRounteKey.getUserTournament)
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}


export function getUserTeam(id){
  return new Promise((resolve, reject) => {
    coreApi
      .get(generatePath(ApiRounteKey.getUserTeam, {id}))
      .then((response) => resolve(response.data))
      .catch(reject)
  });
}