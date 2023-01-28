import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function getUserHistory(){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.getUserHistory)
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