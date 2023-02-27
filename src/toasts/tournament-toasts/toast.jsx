import { toast } from "react-toastify";

export const updateRuleSuc = () => {
    toast.success("Update Tournament Rule Success", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const updateRuleFail = () => {
    toast.error("Update Tournament Rule Fail", {
        autoClose : 5000,
        position : "top-right"
    })
};


export const regTourSuc = () => {
    toast.success("Register Tournament Success", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const regTourFail = () => {
    toast.error("Register Tournament Fail", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const startTourSuc = () => {
    toast.success("Tournament is Started", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const startTourFail = () => {
    toast.error("Fail to Start. Tournament's not full.", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const endtTourSuc = () => {
    toast.success("Tournament is Ended", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const endTourFail = () => {
    toast.error("Fail to End Tournament", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const createMatchSuc = () => {
    toast.success("Match is Added", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const createMatchFail = (err) => {
    toast.error("Fail to Create Match. " + err.response.data.message, {
        autoClose : 5000,
        position : "top-right"
    })
};