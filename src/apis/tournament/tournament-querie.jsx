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
