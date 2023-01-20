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