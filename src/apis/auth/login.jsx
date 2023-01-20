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