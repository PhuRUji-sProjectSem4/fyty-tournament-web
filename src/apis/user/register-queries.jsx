import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function registerFyTy(payload){
    return new Promise((resolve, reject) => {
      coreApi
        .post(ApiRounteKey.register, payload)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}