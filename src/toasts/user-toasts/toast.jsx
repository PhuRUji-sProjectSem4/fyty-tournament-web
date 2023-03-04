import { toast } from "react-toastify";

export const updatePicSuc = () => {
    toast.success("Update Picture Success", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const updatePicFail = () => {
    toast.error("Update Picture Fail", {
        autoClose : 5000,
        position : "top-right"
    })
};
