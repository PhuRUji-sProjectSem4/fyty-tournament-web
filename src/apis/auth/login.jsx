import { generatePath } from "react-router-dom";
import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function localLogin(payload){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.localLogin, {
            params: payload
        })
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}

export function oAuthLogin({vendor, query}){
    return new Promise((resolve, reject) => {
      coreApi
        .get(generatePath(ApiRounteKey.oAuthLogin, {vendor})+query)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}