export const  coverImg = {
    allGames : "/asset/all.png",
    dotaImg : "/asset/dota2.jpg",
    rovImg : "/asset/rov.webp",
    pubgImg : "/asset/pubg.jpg",
    valoImg : "/asset/valo.jpg"
};

export const ApiRounteKey = {
    //game
    getGames: "/game",
    getGameEach: "/game/:id",

    //User
    getUsers: "/user",
    getUserEach: "/user/:id",
    getMyProfile: "/user/me",
    register: "/user/register",
    updateProfile: "/user/me", 

    //team
    getTeams: "/team",
    getTeamsByGame: "/team/game/:id",
    getTeamEach: "/team/:id",
    createTeam: "/team",
    updateTeam: "/team/:id",
    deleteTeam: "/team/:id/delete",

    //team member
    getAllTeamMembers: "/team/member",
    getTeamMember: "/team/:id/member",
    updateCoach: "/team/member/:id/coach",
    updateManager: "/team/member/:id/manger",
    updatePlayer: "/team/member/:id/player",
    kick: "/team/member/:id/kick",
    leave: "/team/:id/member/leave",

    //team request
    getTeamRequest: "/team/:id/request",
    getMyTeamRequest: "/team/request/me",
    createRequest: "/team/request",
    acceptRequest: "/team/request/:id/accepted",
    acceptdeclined: "/team/request/:id/declined",

    localLogin: "/auth/login"
}

export const ClientRounteKey = {
    home: "/home",
    profile: "/myProfile",
    schedule: "/mySchedule",

    //game
    getGames: "/game",
    getGameEach: "/game/:id",

    //User
    getUsers: "/user",
    getUserEach: "/user/:id",
    getMyProfile: "/user/me",
    register: "/user/register",
    updateProfile: "/user/me", 

    //team
    getTeams: "/team",
    getTeamsByGame: "/team/game/:id",
    getTeamEach: "/team/:id",
    createTeam: "/team",
    updateTeam: "/team/:id",
    deleteTeam: "/team/:id/delete",

    //team member
    getAllTeamMembers: "/team/member",
    getTeamMember: "/team/:id/member",
    updateCoach: "/team/member/:id/coach",
    updateManager: "/team/member/:id/manger",
    updatePlayer: "/team/member/:id/player",
    kick: "/team/member/:id/kick",
    leave: "/team/:id/member/leave",

    //team request
    getTeamRequest: "/team/:id/request",
    getMyTeamRequest: "/team/request/me",
    createRequest: "/team/request",
    acceptRequest: "/team/request/:id/accepted",
    acceptdeclined: "/team/request/:id/declined",


}