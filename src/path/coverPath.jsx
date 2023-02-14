export const  coverImg = {
    allGames : "/asset/all.png",
    dotaImg : "/asset/dota2.jpg",
    rovImg : "/asset/rov.webp",
    pubgImg : "/asset/pubg.jpg",
    valoImg : "/asset/valo.jpg"
};

export const  coverImgFirebase = {
    dotaImg : "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Fdota2.jpg?alt=media&token=4353608c-21d9-4ba3-b1da-d85baf262f8e",
    rovImg : "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Frov.webp?alt=media&token=00b49d19-01d1-490d-99a5-d2008c5665b3",
    valoImg : "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Fvalo.jpg?alt=media&token=4a807c94-df56-4c8f-ac5d-253da7247877"
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
    getUserSchedule: "/user/schedule/me", 
    getUserHistory: "/user/:id/history", 
    getUserTournament: "/user/tournamet/me", 
    getUserTeam: "/user/:id/team", 

    //team
    getTeams: "/team",
    getTeamsByGame: "/team/game/:id",
    getTeamEach: "/team/:id",
    getTeamTourJoined: "/team/:id/joined",
    createTeam: "/team",
    updateTeam: "/team/:id",
    deleteTeam: "/team/:id/delete",

    //team member
    getAllTeamMembers: "/team/member",
    getTeamMember: "/team/:id/member",
    getTeamJoiedTour: "/team/:id/joined",
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
    declinedRequest: "/team/request/:id/declined",

    getTournament: "/tournament",
    getTournamentEach: "/tournament/:id",
    createTournament: "/tournament",
    updateTournament: "/tournament/:id/detail",
    registerTournament: "/tournament/:id/register",
    startTournament: "/tournament/:id/start",
    endTournament: "/tournament/:id/end",
    deleteTournament: "/tournament/:id",

    joinTournament: "/tournament/join",
    getTournamentJoined: "/tournament/:id/join",
    getTournamentJoinedEach: "/tournament/join/:id",
    
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
   

    //team member
    getAllTeamMembers: "/team/member",
    getTeamMember: "/team/:id/member",
    

    //team request
    getTeamRequest: "/team/:id/request",
    getMyTeamRequest: "/team/request/me",

    tournamentEach: "/tournament/:id",
    
    error: "/error",

}