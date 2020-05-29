const API_KEY = "2d19c8c04a724b34ab38ac9ae92137cc";
const BASE_URL = "https://api.football-data.org/v2/";
let ENDPOINT_COMPETITION;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    let id = window.location.hash.substr(2).split('/')[1];
    if(id == undefined) id = '2001';
    
    ENDPOINT_COMPETITION = `${BASE_URL}competitions/${id}/standings`;

    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }
    
    
    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getSavedStanding() {
    getAll()
        .then(data => {
            showSavedStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let id_team = urlParams.get("id");

        ENDPOINT_COMPETITION = `${BASE_URL}teams/${id_team}`;
        if ("caches" in window) {
            caches.match(ENDPOINT_COMPETITION).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Competition Data: " + data);
                        showTeam(data);
                        resolve(data);
                    })
                }
            })
        }
        
        
        fetchAPI(ENDPOINT_COMPETITION)
            .then(data => {
                showTeam(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    });
}

function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let id_team = parseInt(urlParams.get("id"));
    getById(id_team)
        .then(data => {
            showTeam(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let preloader = document.getElementById("preloader");
    if(preloader != undefined) {
        preloader.style.display = 'none';
    }
    document.getElementById("judul").innerHTML = data.competition.name;
    let standings = "";
    let standingElement =  document.getElementById("standings");
    data.standings[0].table.forEach(function (standing) {
        standings += `
                <div class="col m3 s12">
                        <div class="card-panel center kartu">
                            <img class="responsive-img" src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/><br>
                            <span class="card-title truncate">${standing.team.name}</span>
                            <table class="centered highlight">
                                <tr>
                                    <td>Win</td>
                                    <td>Draw</td>
                                    <td>Lose</td>
                                </tr>
                                <tr>
                                    <td>${standing.won}</td>
                                    <td>${standing.draw}</td>
                                    <td>${standing.lost}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">${standing.points}Pts</td>
                                </tr>
                            </table>
                            <h5><a href="./team.html?id=${standing.team.id}" class="waves-effect waves-light btn blue darken-2">See More</a></h5>
                        </div>
                </div>
        `;
    });

     standingElement.innerHTML = `
                    <div class="col m12 s12">
                        ${standings}      
                    </div>
    `;
}

function showSavedStanding(data) {
    let standings = "";
    let judul = document.getElementById("judul");
    let standingElement =  document.getElementById("standings");

    console.log(data.length);
    if(data.length == 0) {
        judul.innerHTML = 'Tidak ada data tersimpan';    
    } else {
        judul.innerHTML = "Data Tersimpan";    
    }
    

    data.forEach(function (standing) {
        standings += `
                        <div class="card-panel center kartu">
                            <img class="responsive-img" src="${standing.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/><br>
                            <span class="card-title truncate">${standing.name}</span>
                            <table class="highlight">
                                <tr>
                                    <td class='left-align'>Short Name</td>
                                    <td class='right-align'>${standing.shortName}</td>
                                </tr>
                                <tr>
                                    <td class='left-align'>Tahun Dibentuk</td>
                                    <td class='right-align'>${standing.founded}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class='center'>${standing.email}</td>
                                </tr>
                            </table>
                            <h5><a href="./team.html?id=${standing.id}&saved=true" class="waves-effect waves-light btn blue darken-2">See More</a></h5>
                        </div>
        `;
    });

     standingElement.innerHTML = `
                    <div class="col m12 s12">
                        ${standings}      
                    </div>
    `;
}


function showTeam(data) {
    let teamElement = document.getElementById("body-content");
    let squads = '';
    data.squad.forEach(function (squad) {
        squads += `
                <tr>
                    <td>${squad.name}</td>
                    <td>${squad.role}</td>
                    <td>${squad.nationality}</td>
                </tr>
        `;
    });

        teamElement.innerHTML = `
            <div class='section'>
                <h2 class='center'>${data.name}</h2>
                <div class="col m12 s12">
                    <table>    
                    <tbody>
                        <tr>
                            <td rowspan="3"><img class="responsive-img" style="margin= 0 auto" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" width="200px" alt="badge"/></td>
                            <td>Area</td>
                            <td class='right-align'>${data.area.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td class='right-align'>${data.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td class='right-align'>${data.phone}</td>
                        </tr>
                        <tr>
                            <td colspan=3 class='center-align'>Last Update: ${new Date(Date.parse(data.lastUpdated)).toString()}</td>
                        </tr>

                    </tbody>        
                    </table>
                </div><br>
                <h3>Squads</h3>
                <div class="col m12 s12">
                    <table class='highlight striped'>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Nationality</th>
                        </tr>    
                        ${squads}
                    </table>

                </div>
            </div>

        `;
}


function showAndHideBtn(btnShow,btnHide) {
    btnShow.style.display = 'block';
    btnHide.style.display = 'none';
}