import coreApi from "../../core/axios";
import { ApiRounteKey } from "../../path/coverPath";

export function getGames(){
    return new Promise((resolve, reject) => {
      coreApi
        .get(ApiRounteKey.getGames)
        .then((response) => resolve(response.data))
        .catch(reject)
    });
}