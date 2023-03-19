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

export const joinTourSuc = () => {
    toast.success("Join Tournament Success", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const joinTourFail = (err) => {
    toast.error("Fail to Join Tournamnet. You'd already joined.", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const wrongScore = () => {
    toast.error("Wrong Score Input.",{
        autoClose : 5000,
        position : "top-right"
    })
};

export const createScoreSuc = () => {
    toast.success("Score Success", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const createScoreSucFail = (err) => {
    toast.error("Fail to Score. " + err.response.data.message, {
        autoClose : 5000,
        position : "top-right"
    })
};

export const invalidDate = (err) => {
    toast.error(err, {
        autoClose : 7000,
        position : "top-right"
    })
};

export const delTourSuc = () => {
    toast.success("Tournament is Deleted", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const delTourFail = () => {
    toast.error("Fail to Delete Tournament", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const delMatchSuc = () => {
    toast.success("Match is Deleted", {
        autoClose : 5000,
        position : "top-right"
    })
};

export const delMatchFail = () => {
    toast.error("Fail to Delete Match. This Match is Scored", {
        autoClose : 5000,
        position : "top-right"
    })
};