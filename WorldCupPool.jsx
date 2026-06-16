import { useState, useEffect } from "react";

const SEED_STATS = {
lastUpdate: "Jun 15, 2026 — 9 matches complete (Saudi Arabia 1-1 Uruguay result added)",
topScorers: [
{ player: "Folarin Balogun", team: "USA", goals: 2, assists: 0 },
{ player: "Nestory Irankunda", team: "Australia", goals: 1, assists: 0 },
{ player: "Connor Metcalfe", team: "Australia", goals: 1, assists: 0 },
{ player: "Raúl Jiménez", team: "Mexico", goals: 1, assists: 0 },
{ player: "Julián Quiñones", team: "Mexico", goals: 1, assists: 0 },
{ player: "Hwang In-beom", team: "South Korea", goals: 1, assists: 1 },
{ player: "Oh Hyeon-gyu", team: "South Korea", goals: 1, assists: 0 },
{ player: "Gio Reyna", team: "USA", goals: 1, assists: 0 },
{ player: "John McGinn", team: "Scotland", goals: 1, assists: 0 },
{ player: "Jonathan David", team: "Canada", goals: 1, assists: 0 },
],
poolLeaderStats: [
{ poolPlayer: "Jimmy", teams: ["Czech Republic","Canada","USA","DR Congo"], totalGoals: 6, totalGoalsAgainst: 4, wins: 1, draws: 1, losses: 1, bestTeam: "USA" },
{ poolPlayer: "Grady", teams: ["Morocco","Australia","Tunisia","Croatia"], totalGoals: 3, totalGoalsAgainst: 1, wins: 1, draws: 1, losses: 0, bestTeam: "Australia" },
{ poolPlayer: "Bradberry", teams: ["Mexico","Qatar","Netherlands","Cape Verde"], totalGoals: 3, totalGoalsAgainst: 1, wins: 1, draws: 1, losses: 0, bestTeam: "Mexico" },
{ poolPlayer: "Murphy", teams: ["South Korea","Ivory Coast","Spain","Jordan"], totalGoals: 2, totalGoalsAgainst: 1, wins: 1, draws: 0, losses: 0, bestTeam: "South Korea" },
{ poolPlayer: "Dixon", teams: ["Brazil","Iran","Senegal","Iraq"], totalGoals: 1, totalGoalsAgainst: 1, wins: 0, draws: 1, losses: 0, bestTeam: "Brazil" },
{ poolPlayer: "Cisco", teams: ["Switzerland","Argentina","Algeria","Panama"], totalGoals: 1, totalGoalsAgainst: 1, wins: 0, draws: 1, losses: 0, bestTeam: "Switzerland" },
{ poolPlayer: "Weddick", teams: ["South Africa","Scotland","Belgium","Uruguay"], totalGoals: 1, totalGoalsAgainst: 2, wins: 1, draws: 0, losses: 1, bestTeam: "Scotland" },
{ poolPlayer: "Thomas", teams: ["Bosnia & Herzegovina","New Zealand","Norway","Colombia"],totalGoals: 1, totalGoalsAgainst: 1, wins: 0, draws: 1, losses: 0, bestTeam: "Bosnia & Herzegovina" },
{ poolPlayer: "Wood", teams: ["Paraguay","Germany","Japan","Uzbekistan"], totalGoals: 1, totalGoalsAgainst: 4, wins: 0, draws: 0, losses: 1, bestTeam: "—" },
{ poolPlayer: "Fisher", teams: ["Haiti","Ecuador","Austria","England"], totalGoals: 0, totalGoalsAgainst: 1, wins: 0, draws: 0, losses: 1, bestTeam: "—" },
{ poolPlayer: "Aric", teams: ["Turkey","Egypt","Saudi Arabia","Portugal"], totalGoals: 1, totalGoalsAgainst: 3, wins: 0, draws: 1, losses: 1, bestTeam: "Saudi Arabia" },
{ poolPlayer: "Nate", teams: ["Curaçao","Sweden","France","Ghana"], totalGoals: 0, totalGoalsAgainst: 0, wins: 0, draws: 0, losses: 0, bestTeam: "—" },
],
yourTeamStats: [
{ team: "Turkey", group: "Group D", played: 1, goals: 0, goalsAgainst: 2, cleanSheets: 0, keyPlayer: "Hakan Çalhanoglu", form: "L" },
{ team: "Egypt", group: "Group G", played: 0, goals: 0, goalsAgainst: 0, cleanSheets: 0, keyPlayer: "Mohamed Salah", form: "" },
{ team: "Saudi Arabia", group: "Group H", played: 1, goals: 1, goalsAgainst: 1, cleanSheets: 0, keyPlayer: "Salem Al-Dawsari", form: "D" },
{ team: "Portugal", group: "Group K", played: 0, goals: 0, goalsAgainst: 0, cleanSheets: 0, keyPlayer: "Cristiano Ronaldo",form: "" },
],
poolRivalries: [
{ player1: "Jimmy", player2: "Wood", matchups: [{ team1: "USA", team2: "Paraguay", score: "4–1", winner: "USA" }]},
{ player1: "Cisco", player2: "Bradberry",matchups:[{ team1: "Switzerland", team2: "Qatar", score: "1–1", winner: null }]},
{ player1: "Murphy", player2: "Jimmy", matchups: [{ team1: "South Korea", team2: "Czech Republic", score: "2–1", winner: "South Korea" }]},
{ player1: "Jimmy", player2: "Thomas", matchups: [{ team1: "Canada", team2: "Bosnia & Herzegovina", score: "1–1", winner: null }]},
{ player1: "Bradberry", player2: "Weddick", matchups: [{ team1: "Mexico", team2: "South Africa", score: "2–0", winner: "Mexico" }]},
{ player1: "Dixon", player2: "Grady", matchups: [{ team1: "Brazil", team2: "Morocco", score: "1–1", winner: null }]},
{ player1: "Weddick", player2: "Fisher", matchups: [{ team1: "Scotland", team2: "Haiti", score: "1–0", winner: "Scotland" }]},
],
funFacts: [
"💀 Australia shocked YOUR Turkey 2-0! Irankunda (27') & Metcalfe (75') — Turkey yet to score. Redemption needed vs Paraguay on Jun 19.",
"Brazil 1-1 Morocco — Saibari chipped Alisson brilliantly for Morocco. Vinícius equalised late. Dixon and Grady share the spoils.",
"Scotland beat Fisher's Haiti 1-0 — McGinn scuffed one in. Scotland's first WC win since 1998. Weddick gets the W.",
"Qatar equalized in stoppage time vs Switzerland for a 1-1 draw — Qatar's FIRST EVER World Cup point! Cisco and Bradberry split points.",
"Egypt 🇪🇬 (YOUR team) faces Belgium TODAY at 3pm ET in Seattle — Mohamed Salah's moment awaits!",
"Saudi Arabia 🇸🇦 (YOUR team) held Uruguay to a 1-1 draw! A gritty performance keeps Group H wide open.",
"Portugal 🇵🇹 (YOUR team) plays DR Congo on June 17 — Ronaldo's shot at history (6th World Cup goal).",
"Germany leads Curaçao 2-1 live right now (40') — Wood's Germany looking strong despite the scare!",
],
mostDangerous: { team: "USA", reason: "4-1 over Paraguay, Balogun in electric form, Pochettino's system humming. Home crowd, best attack in the pool so far with 4 goals in one game." },
biggestUpset: { winner: "Australia", loser: "Turkey", score: "2–0", description: "Australia stunned YOUR Turkey with Irankunda's stunning first-touch finish and Metcalfe's 75th-minute strike. Turkey had 61% possession but zero goals. The Socceroos are flying." },
};

const SEED_GROUPS = [{"name":"Group A","teams":["Mexico","South Africa","South Korea","Czech Republic"]},{"name":"Group B","teams":["Canada","Bosnia & Herzegovina","Qatar","Switzerland"]},{"name":"Group C","teams":["Brazil","Morocco","Haiti","Scotland"]},{"name":"Group D","teams":["USA","Paraguay","Australia","Turkey"]},{"name":"Group E","teams":["Germany","Curaçao","Ivory Coast","Ecuador"]},{"name":"Group F","teams":["Netherlands","Japan","Sweden","Tunisia"]},{"name":"Group G","teams":["Belgium","Egypt","Iran","New Zealand"]},{"name":"Group H","teams":["Spain","Cape Verde","Saudi Arabia","Uruguay"]},{"name":"Group I","teams":["France","Senegal","Iraq","Norway"]},{"name":"Group J","teams":["Argentina","Algeria","Austria","Jordan"]},{"name":"Group K","teams":["Portugal","DR Congo","Uzbekistan","Colombia"]},{"name":"Group L","teams":["England","Croatia","Ghana","Panama"]}];

const SEED_MATCHES = [{"round":"Matchday 1","date":"2026-06-11","time":"13:00 UTC-6","team1":"Mexico","team2":"South Africa","group":"Group A","ground":"Mexico City","score1":2,"score2":0},{"round":"Matchday 1","date":"2026-06-11","time":"20:00 UTC-6","team1":"South Korea","team2":"Czech Republic","group":"Group A","ground":"Guadalajara (Zapopan)","score1":2,"score2":1},{"round":"Matchday 8","date":"2026-06-18","time":"12:00 UTC-4","team1":"Czech Republic","team2":"South Africa","group":"Group A","ground":"Atlanta"},{"round":"Matchday 8","date":"2026-06-18","time":"19:00 UTC-6","team1":"Mexico","team2":"South Korea","group":"Group A","ground":"Guadalajara (Zapopan)"},{"round":"Matchday 14","date":"2026-06-24","time":"19:00 UTC-6","team1":"Czech Republic","team2":"Mexico","group":"Group A","ground":"Mexico City"},{"round":"Matchday 14","date":"2026-06-24","time":"19:00 UTC-6","team1":"South Africa","team2":"South Korea","group":"Group A","ground":"Monterrey (Guadalupe)"},{"round":"Matchday 2","date":"2026-06-12","time":"15:00 UTC-4","team1":"Canada","team2":"Bosnia & Herzegovina","group":"Group B","ground":"Toronto","score1":1,"score2":1},{"round":"Matchday 3","date":"2026-06-13","time":"12:00 UTC-7","team1":"Qatar","team2":"Switzerland","group":"Group B","ground":"San Francisco Bay Area (Santa Clara)","score1":1,"score2":1},{"round":"Matchday 8","date":"2026-06-18","time":"12:00 UTC-7","team1":"Switzerland","team2":"Bosnia & Herzegovina","group":"Group B","ground":"Los Angeles (Inglewood)"},{"round":"Matchday 8","date":"2026-06-18","time":"15:00 UTC-7","team1":"Canada","team2":"Qatar","group":"Group B","ground":"Vancouver"},{"round":"Matchday 14","date":"2026-06-24","time":"12:00 UTC-7","team1":"Switzerland","team2":"Canada","group":"Group B","ground":"Vancouver"},{"round":"Matchday 14","date":"2026-06-24","time":"12:00 UTC-7","team1":"Bosnia & Herzegovina","team2":"Qatar","group":"Group B","ground":"Seattle"},{"round":"Matchday 3","date":"2026-06-13","time":"18:00 UTC-4","team1":"Brazil","team2":"Morocco","group":"Group C","ground":"New York/New Jersey (East Rutherford)","score1":1,"score2":1},{"round":"Matchday 3","date":"2026-06-13","time":"21:00 UTC-4","team1":"Haiti","team2":"Scotland","group":"Group C","ground":"Boston (Foxborough)","score1":0,"score2":1},{"round":"Matchday 9","date":"2026-06-19","time":"18:00 UTC-4","team1":"Scotland","team2":"Morocco","group":"Group C","ground":"Boston (Foxborough)"},{"round":"Matchday 9","date":"2026-06-19","time":"20:30 UTC-4","team1":"Brazil","team2":"Haiti","group":"Group C","ground":"Philadelphia"},{"round":"Matchday 14","date":"2026-06-24","time":"18:00 UTC-4","team1":"Scotland","team2":"Brazil","group":"Group C","ground":"Miami (Miami Gardens)"},{"round":"Matchday 14","date":"2026-06-24","time":"18:00 UTC-4","team1":"Morocco","team2":"Haiti","group":"Group C","ground":"Atlanta"},{"round":"Matchday 2","date":"2026-06-12","time":"18:00 UTC-7","team1":"USA","team2":"Paraguay","group":"Group D","ground":"Los Angeles (Inglewood)","score1":4,"score2":1},{"round":"Matchday 3","date":"2026-06-13","time":"21:00 UTC-7","team1":"Australia","team2":"Turkey","group":"Group D","ground":"Vancouver","score1":2,"score2":0},{"round":"Matchday 9","date":"2026-06-19","time":"12:00 UTC-7","team1":"USA","team2":"Australia","group":"Group D","ground":"Seattle"},{"round":"Matchday 9","date":"2026-06-19","time":"20:00 UTC-7","team1":"Turkey","team2":"Paraguay","group":"Group D","ground":"San Francisco Bay Area (Santa Clara)"},{"round":"Matchday 15","date":"2026-06-25","time":"19:00 UTC-7","team1":"Turkey","team2":"USA","group":"Group D","ground":"Los Angeles (Inglewood)"},{"round":"Matchday 15","date":"2026-06-25","time":"19:00 UTC-7","team1":"Paraguay","team2":"Australia","group":"Group D","ground":"San Francisco Bay Area (Santa Clara)"},{"round":"Matchday 4","date":"2026-06-14","time":"12:00 UTC-5","team1":"Germany","team2":"Curaçao","group":"Group E","ground":"Houston"},{"round":"Matchday 4","date":"2026-06-14","time":"19:00 UTC-4","team1":"Ivory Coast","team2":"Ecuador","group":"Group E","ground":"Philadelphia"},{"round":"Matchday 10","date":"2026-06-20","time":"16:00 UTC-4","team1":"Germany","team2":"Ivory Coast","group":"Group E","ground":"Toronto"},{"round":"Matchday 10","date":"2026-06-20","time":"19:00 UTC-5","team1":"Ecuador","team2":"Curaçao","group":"Group E","ground":"Kansas City"},{"round":"Matchday 15","date":"2026-06-25","time":"16:00 UTC-4","team1":"Curaçao","team2":"Ivory Coast","group":"Group E","ground":"Philadelphia"},{"round":"Matchday 15","date":"2026-06-25","time":"16:00 UTC-4","team1":"Ecuador","team2":"Germany","group":"Group E","ground":"New York/New Jersey (East Rutherford)"},{"round":"Matchday 4","date":"2026-06-14","time":"15:00 UTC-5","team1":"Netherlands","team2":"Japan","group":"Group F","ground":"Dallas (Arlington)"},{"round":"Matchday 4","date":"2026-06-14","time":"20:00 UTC-6","team1":"Sweden","team2":"Tunisia","group":"Group F","ground":"Monterrey (Guadalupe)"},{"round":"Matchday 10","date":"2026-06-20","time":"12:00 UTC-5","team1":"Netherlands","team2":"Sweden","group":"Group F","ground":"Houston"},{"round":"Matchday 10","date":"2026-06-20","time":"22:00 UTC-6","team1":"Tunisia","team2":"Japan","group":"Group F","ground":"Monterrey (Guadalupe)"},{"round":"Matchday 15","date":"2026-06-25","time":"18:00 UTC-5","team1":"Japan","team2":"Sweden","group":"Group F","ground":"Dallas (Arlington)"},{"round":"Matchday 15","date":"2026-06-25","time":"18:00 UTC-5","team1":"Tunisia","team2":"Netherlands","group":"Group F","ground":"Kansas City"},{"round":"Matchday 5","date":"2026-06-15","time":"12:00 UTC-7","team1":"Belgium","team2":"Egypt","group":"Group G","ground":"Seattle"},{"round":"Matchday 5","date":"2026-06-15","time":"18:00 UTC-7","team1":"Iran","team2":"New Zealand","group":"Group G","ground":"Los Angeles (Inglewood)"},{"round":"Matchday 11","date":"2026-06-21","time":"12:00 UTC-7","team1":"Belgium","team2":"Iran","group":"Group G","ground":"Los Angeles (Inglewood)"},{"round":"Matchday 11","date":"2026-06-21","time":"18:00 UTC-7","team1":"New Zealand","team2":"Egypt","group":"Group G","ground":"Vancouver"},{"round":"Matchday 16","date":"2026-06-26","time":"20:00 UTC-7","team1":"Egypt","team2":"Iran","group":"Group G","ground":"Seattle"},{"round":"Matchday 16","date":"2026-06-26","time":"20:00 UTC-7","team1":"New Zealand","team2":"Belgium","group":"Group G","ground":"Vancouver"},{"round":"Matchday 5","date":"2026-06-15","time":"12:00 UTC-4","team1":"Spain","team2":"Cape Verde","group":"Group H","ground":"Atlanta"},{"round":"Matchday 5","date":"2026-06-15","time":"18:00 UTC-4","team1":"Saudi Arabia","team2":"Uruguay","group":"Group H","ground":"Miami (Miami Gardens)"},{"round":"Matchday 11","date":"2026-06-21","time":"12:00 UTC-4","team1":"Spain","team2":"Saudi Arabia","group":"Group H","ground":"Atlanta"},{"round":"Matchday 11","date":"2026-06-21","time":"18:00 UTC-4","team1":"Uruguay","team2":"Cape Verde","group":"Group H","ground":"Miami (Miami Gardens)"},{"round":"Matchday 16","date":"2026-06-26","time":"19:00 UTC-5","team1":"Cape Verde","team2":"Saudi Arabia","group":"Group H","ground":"Houston"},{"round":"Matchday 16","date":"2026-06-26","time":"18:00 UTC-6","team1":"Uruguay","team2":"Spain","group":"Group H","ground":"Guadalajara (Zapopan)"},{"round":"Matchday 6","date":"2026-06-16","time":"15:00 UTC-4","team1":"France","team2":"Senegal","group":"Group I","ground":"New York/New Jersey (East Rutherford)"},{"round":"Matchday 6","date":"2026-06-16","time":"18:00 UTC-4","team1":"Iraq","team2":"Norway","group":"Group I","ground":"Boston (Foxborough)"},{"round":"Matchday 12","date":"2026-06-22","time":"17:00 UTC-4","team1":"France","team2":"Iraq","group":"Group I","ground":"Philadelphia"},{"round":"Matchday 12","date":"2026-06-22","time":"20:00 UTC-4","team1":"Norway","team2":"Senegal","group":"Group I","ground":"New York/New Jersey (East Rutherford)"},{"round":"Matchday 16","date":"2026-06-26","time":"15:00 UTC-4","team1":"Norway","team2":"France","group":"Group I","ground":"Boston (Foxborough)"},{"round":"Matchday 16","date":"2026-06-26","time":"15:00 UTC-4","team1":"Senegal","team2":"Iraq","group":"Group I","ground":"Toronto"},{"round":"Matchday 6","date":"2026-06-16","time":"20:00 UTC-5","team1":"Argentina","team2":"Algeria","group":"Group J","ground":"Kansas City"},{"round":"Matchday 6","date":"2026-06-16","time":"21:00 UTC-7","team1":"Austria","team2":"Jordan","group":"Group J","ground":"San Francisco Bay Area (Santa Clara)"},{"round":"Matchday 12","date":"2026-06-22","time":"12:00 UTC-5","team1":"Argentina","team2":"Austria","group":"Group J","ground":"Dallas (Arlington)"},{"round":"Matchday 12","date":"2026-06-22","time":"20:00 UTC-7","team1":"Jordan","team2":"Algeria","group":"Group J","ground":"San Francisco Bay Area (Santa Clara)"},{"round":"Matchday 17","date":"2026-06-27","time":"21:00 UTC-5","team1":"Algeria","team2":"Austria","group":"Group J","ground":"Kansas City"},{"round":"Matchday 17","date":"2026-06-27","time":"21:00 UTC-5","team1":"Jordan","team2":"Argentina","group":"Group J","ground":"Dallas (Arlington)"},{"round":"Matchday 7","date":"2026-06-17","time":"12:00 UTC-5","team1":"Portugal","team2":"DR Congo","group":"Group K","ground":"Houston"},{"round":"Matchday 7","date":"2026-06-17","time":"20:00 UTC-6","team1":"Uzbekistan","team2":"Colombia","group":"Group K","ground":"Mexico City"},{"round":"Matchday 13","date":"2026-06-23","time":"12:00 UTC-5","team1":"Portugal","team2":"Uzbekistan","group":"Group K","ground":"Houston"},{"round":"Matchday 13","date":"2026-06-23","time":"20:00 UTC-6","team1":"Colombia","team2":"DR Congo","group":"Group K","ground":"Guadalajara (Zapopan)"},{"round":"Matchday 17","date":"2026-06-27","time":"19:30 UTC-4","team1":"Colombia","team2":"Portugal","group":"Group K","ground":"Miami (Miami Gardens)"},{"round":"Matchday 17","date":"2026-06-27","time":"19:30 UTC-4","team1":"DR Congo","team2":"Uzbekistan","group":"Group K","ground":"Atlanta"},{"round":"Matchday 7","date":"2026-06-17","time":"15:00 UTC-5","team1":"England","team2":"Croatia","group":"Group L","ground":"Dallas (Arlington)"},{"round":"Matchday 7","date":"2026-06-17","time":"19:00 UTC-4","team1":"Ghana","team2":"Panama","group":"Group L","ground":"Toronto"},{"round":"Matchday 13","date":"2026-06-23","time":"16:00 UTC-4","team1":"England","team2":"Ghana","group":"Group L","ground":"Boston (Foxborough)"},{"round":"Matchday 13","date":"2026-06-23","time":"19:00 UTC-4","team1":"Panama","team2":"Croatia","group":"Group L","ground":"Toronto"},{"round":"Matchday 17","date":"2026-06-27","time":"17:00 UTC-4","team1":"Panama","team2":"England","group":"Group L","ground":"New York/New Jersey (East Rutherford)"},{"round":"Matchday 17","date":"2026-06-27","time":"17:00 UTC-4","team1":"Croatia","team2":"Ghana","group":"Group L","ground":"Philadelphia"}];
const SEED_KNOCKOUT = []; // Added missing constant
// ─── HELPERS ──────────────────────────────────────────────────────────────────
// ─── PAYOUT STRUCTURE ─────────────────────────────────────────────────────────
const PAYOUT_STRUCTURE = {
"Round of 32": { perTeam: 5 },
"Round of 16": { perTeam: 10 },
"Quarterfinals": { perTeam: 15 },
"Semifinals": { perTeam: 25 },
"Runner-Up": { perTeam: 60 },
"Champion": { perTeam: 150 },
};
const ROUNDS_ORDER = ["Group Stage","Round of 32","Round of 16","Quarterfinals","Semifinals","Runner-Up","Champion"];
const BUY_IN = 40;

// ─── POOL ─────────────────────────────────────────────────────────────────────
const INITIAL_PLAYERS = [
  { name: "Aric", teams: ["Turkey", "Egypt", "Saudi Arabia", "Portugal"] },
  { name: "Cisco", teams: ["Switzerland", "Argentina", "Algeria", "Panama"] },
  { name: "Fisher", teams: ["Haiti", "Ecuador", "Austria", "England"] },
  { name: "Nate", teams: ["Curaçao", "Sweden", "France", "Ghana"] },
  { name: "Murphy", teams: ["South Korea", "Ivory Coast", "Spain", "Jordan"] },
  { name: "Dixon", teams: ["Brazil", "Iran", "Senegal", "Iraq"] },
  { name: "Wood", teams: ["Paraguay", "Germany", "Japan", "Uzbekistan"] },
  { name: "Jimmy", teams: ["Czech Republic", "Canada", "USA", "DR Congo"] },
  { name: "Bradberry", teams: ["Mexico", "Qatar", "Netherlands", "Cape Verde"] },
  { name: "Thomas", teams: ["Bosnia & Herzegovina", "New Zealand", "Norway", "Colombia"] },
  { name: "Weddick", teams: ["South Africa", "Scotland", "Belgium", "Uruguay"] },
  { name: "Grady", teams: ["Morocco", "Australia", "Tunisia", "Croatia"] },
];


function getAllTeams(players) {
  const s = new Set();
  players.forEach(p => p.teams.forEach(t => s.add(t)));
  return [...s];
}

function calcEarnings(teams, tp) {
  let total = 0;
  teams.forEach(team => {
    const prog = tp[team];
    if (!prog) return;
    ROUNDS_ORDER.forEach(r => {
      if (r === "Group Stage") return;
      if (ROUNDS_ORDER.indexOf(prog.currentRound) >= ROUNDS_ORDER.indexOf(r)) total += PAYOUT_STRUCTURE[r].perTeam;
    });
  });
  return total;
}

function getRoundColor(r) {
  return { "Group Stage": "#4b5563", "Round of 32": "#1d4ed8", "Round of 16": "#0891b2", "Quarterfinals": "#7c3aed", "Semifinals": "#b45309", "Runner-Up": "#b91c1c", "Champion": "#d97706" }[r] || "#374151";
}

const FLAG_MAP = { "Portugal": "🇵🇹", "Argentina": "🇦🇷", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "France": "🇫🇷", "Spain": "🇪🇸", "Brazil": "🇧🇷", "Germany": "🇩🇪", "Netherlands": "🇳🇱", "USA": "🇺🇸", "Mexico": "🇲🇽", "Japan": "🇯🇵", "Morocco": "🇲🇦", "Senegal": "🇸🇳", "Uruguay": "🇺🇾", "Croatia": "🇭🇷", "Belgium": "🇧🇪", "Colombia": "🇨🇴", "Switzerland": "🇨🇭", "Ecuador": "🇪🇨", "Canada": "🇨🇦", "Australia": "🇦🇺", "South Korea": "🇰🇷", "Ghana": "🇬🇭", "Qatar": "🇶🇦", "Tunisia": "🇹🇳", "South Africa": "🇿🇦", "Czech Republic": "🇨🇿", "Bosnia & Herzegovina": "🇧🇦", "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Paraguay": "🇵🇾", "Turkey": "🇹🇷", "Ivory Coast": "🇨🇮", "Sweden": "🇸🇪", "Egypt": "🇪🇬", "Iran": "🇮🇷", "New Zealand": "🇳🇿", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", "Iraq": "🇮🇶", "Norway": "🇳🇴", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴", "DR Congo": "🇨🇩", "Uzbekistan": "🇺🇿", "Panama": "🇵🇦", "Curaçao": "🇨🇼" };

function Flag({ country }) {
  return <span>{FLAG_MAP[country] || "⚽"}</span>;
}

function Spinner() {
  return (
    <div style={{
      width: 14,
      height: 14,
      border: "2px solid rgba(74,222,128,0.2)",
      borderTop: "2px solid #4ade80",
      borderRadius: "50%",
      animation: "spin 0.6s linear infinite",
    }} />
  );
}

function buildStandings(groups, matches) {
  const s = {};
  groups.forEach(g => {
    s[g.name] = {};
    g.teams.forEach(t => { s[g.name][t] = { team: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 }; });
  });
  matches.forEach(m => {
    if (!m.group || m.score1 === undefined || m.score2 === undefined) return;
    const g = s[m.group]; if (!g) return;
    const t1 = g[m.team1], t2 = g[m.team2]; if (!t1 || !t2) return;
    t1.played++; t2.played++;
    t1.gf += m.score1; t1.ga += m.score2; t1.gd = t1.gf - t1.ga;
    t2.gf += m.score2; t2.ga += m.score1; t2.gd = t2.gf - t2.ga;
    if (m.score1 > m.score2) { t1.won++; t1.pts += 3; t2.lost++; }
    else if (m.score1 < m.score2) { t2.won++; t2.pts += 3; t1.lost++; }
    else { t1.drawn++; t1.pts++; t2.drawn++; t2.pts++; }
  });
  const sorted = {};
  Object.entries(s).forEach(([gn, teams]) => {
    sorted[gn] = Object.values(teams).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));
  });
  return sorted;
}

// Resolve a slot label (e.g. "1A", "2B", "W73", "3rd") to an actual team name
function resolveSlot(slot, groupStandings, knockoutResults) {
  if (!slot) return null;
  // Already a real team name (no digits at end pattern of slot codes)
  if (knockoutResults[slot]) return knockoutResults[slot];
  // Winner/Loser of match
  const wMatch = slot.match(/^W(\d+)$/);
  if (wMatch) {
    const num = parseInt(wMatch[1]);
    return knockoutResults[`W${num}`] || null;
  }
  const lMatch = slot.match(/^L(\d+)$/);
  if (lMatch) {
    const num = parseInt(lMatch[1]);
    return knockoutResults[`L${num}`] || null;
  }
  // Group position: 1A = 1st in Group A, 2B = 2nd in Group B
  const posMatch = slot.match(/^([12])([A-L])$/);
  if (posMatch) {
    const pos = parseInt(posMatch[1]) - 1;
    const grp = `Group ${posMatch[2]}`;
    const st = groupStandings[grp];
    if (st && st[pos]) return st[pos].team;
    return null;
  }
  // 3rd place placeholders
  if (slot.startsWith("3")) return null; // TBD until group stage done
  return null;
}

// Build winner/loser map from knockout matches with scores
function buildKnockoutResults(knockoutMatches, groupStandings) {
  const results = {};
  // Process in order so W73 is available when W89 = W73 is needed
  const sorted = [...knockoutMatches].sort((a, b) => (a.num || 999) - (b.num || 999));
  sorted.forEach(m => {
    if (!m.num) return;
    // Resolve team names
    const t1 = resolveSlot(m.team1, groupStandings, results) || m.team1;
    const t2 = resolveSlot(m.team2, groupStandings, results) || m.team2;
    if (m.score1 !== undefined && m.score2 !== undefined) {
      const winner = m.score1 > m.score2 ? t1 : m.score2 > m.score1 ? t2 : null;
      const loser = m.score1 > m.score2 ? t2 : m.score2 > m.score1 ? t1 : null;
      if (winner) results[`W${m.num}`] = winner;
      if (loser) results[`L${m.num}`] = loser;
    }
  });
  return results;
}

// ─── BRACKET MATCH CARD ───────────────────────────────────────────────────────
function BracketMatch({ match, groupStandings, knockoutResults, yourTeams, poolTeams, isChampion = false, isThird = false }) {
  const t1Name = resolveSlot(match.team1, groupStandings, knockoutResults);
  const t2Name = resolveSlot(match.team2, groupStandings, knockoutResults);
  const label1 = t1Name || match.team1;
  const label2 = t2Name || match.team2;
  const played = match.score1 !== undefined && match.score2 !== undefined;
  const winner = played ? (match.score1 > match.score2 ? label1 : match.score2 > match.score1 ? label2 : null) : null;
  const isResolved1 = !!t1Name;
  const isResolved2 = !!t2Name;

  const teamRow = (name, score, isResolved, side) => {
    const isYou = yourTeams.has(name);
    const isPool = poolTeams.has(name);
    const isWinner = winner === name;
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isChampion ? "7px 10px" : "5px 8px",
        background: isWinner ? "rgba(74,222,128,0.12)" : "transparent",
        borderRadius: 4,
        borderLeft: isYou ? "3px solid #4ade80" : isPool ? "3px solid #818cf8" : "3px solid transparent",
        opacity: played && !isWinner ? 0.55 : 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, flex: 1 }}>
          {isResolved && <Flag country={name} />}
          <span style={{
            fontSize: isChampion ? 13 : 11,
            fontWeight: isYou ? 800 : isWinner ? 700 : 400,
            color: isYou ? "#4ade80" : isPool ? "#a5b4fc" : isResolved ? "#e5e7eb" : "#4b5563",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {isResolved ? name : <span style={{ color: "#374151", fontStyle: "italic" }}>{name}</span>}
          </span>
          {isWinner && <span style={{ fontSize: 9, color: "#4ade80" }}>✓</span>}
        </div>
        {played && (
          <span style={{ fontSize: isChampion ? 14 : 12, fontWeight: 900, color: isWinner ? "#fbbf24" : "#6b7280", marginLeft: 6, flexShrink: 0 }}>
            {score}
          </span>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: isChampion ? "rgba(217,119,6,0.1)" : "rgba(17,24,19,0.95)",
      border: isChampion ? "1px solid #d97706" : isThird ? "1px solid #7c3aed" : played ? "1px solid #22c55e44" : "1px solid #1f2937",
      borderRadius: 7,
      width: isChampion ? 180 : 152,
      flexShrink: 0,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "3px 8px",
        background: isChampion ? "rgba(217,119,6,0.2)" : "rgba(0,0,0,0.3)",
        fontSize: 9, fontWeight: 700, color: isChampion ? "#fbbf24" : isThird ? "#c4b5fd" : "#4b5563",
        letterSpacing: 0.5, textTransform: "uppercase",
        display: "flex", justifyContent: "space-between",
      }}>
        <span>{isChampion ? "🏆 FINAL" : isThird ? "🥉 3RD PLACE" : `#${match.num}`}</span>
        <span style={{ color: "#374151" }}>{match.date ? new Date(match.date + "T12:00:00").toLocaleDateString("en-US", { month: "numeric", day: "numeric" }) : ""}</span>
      </div>
      <div style={{ padding: "3px 0" }}>
        {teamRow(label1, match.score1, isResolved1, "top")}
        <div style={{ height: 1, background: "rgba(31,41,55,0.6)", margin: "0 6px" }} />
        {teamRow(label2, match.score2, isResolved2, "bot")}
      </div>
    </div>
  );
}

// ─── BRACKET COLUMN ───────────────────────────────────────────────────────────
function BracketColumn({ title, matches, groupStandings, knockoutResults, yourTeams, poolTeams, color="#6b7280" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "center", flexShrink: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6, whiteSpace: "nowrap" }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", flex: 1, gap: 6, width: "100%" }}>
        {matches.map((m, i) => (
          <BracketMatch
            key={m.num || i}
            match={m}
            groupStandings={groupStandings}
            knockoutResults={knockoutResults}
            yourTeams={yourTeams}
            poolTeams={poolTeams}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WorldCupPool() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [teamProgress, setTP] = useState(() => {
    const obj = {};
    [...new Set(INITIAL_PLAYERS.flatMap(p => p.teams))].forEach(t => { obj[t] = { currentRound: "Group Stage" }; });
    return obj;
  });
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [editingPlayer, setEP] = useState(null);
  const [editingSlot, setES] = useState(null);
  const [newTeamName, setNTN] = useState("");
  const [selectedGroup, setSG] = useState("Group K");

  // Local Storage Keys for match data persistence
  const LOCAL_STORAGE_MATCHES_KEY = "wc_matches_data";
  const LOCAL_STORAGE_KNOCKOUT_KEY = "wc_knockout_data";
  const LOCAL_STORAGE_LAST_REFRESH_KEY = "wc_last_refresh_time";

  // Initialize match data from localStorage or fall back to SEED_MATCHES/SEED_KNOCKOUT
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem(LOCAL_STORAGE_MATCHES_KEY);
    return savedMatches ? JSON.parse(savedMatches) : SEED_MATCHES;
  });
  const [knockout, setKnockout] = useState(() => {
    const savedKnockout = localStorage.getItem(LOCAL_STORAGE_KNOCKOUT_KEY);
    return savedKnockout ? JSON.parse(savedKnockout) : SEED_KNOCKOUT;
  });
  const [groups] = useState(SEED_GROUPS);
  const [lastRefresh, setLastRefresh] = useState(() => localStorage.getItem(LOCAL_STORAGE_LAST_REFRESH_KEY) || "Initial Load");
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showStatsPrompt, setShowStatsPrompt] = useState(false);
  const [statsData] = useState(SEED_STATS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false); // New loading state for stats
  const [showUserModal, setShowUserModal] = useState(true);
  const [dataSource, setDataSource] = useState(() => localStorage.getItem(LOCAL_STORAGE_MATCHES_KEY) ? 'cache' : 'seed');

  const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

  const fetchLiveScores = async () => {
    setIsLoading(true);

    const TEAM_NAME_MAP = {
      "United States": "USA",
      "Czechia": "Czech Republic",
      "Bosnia-Herzegovina": "Bosnia & Herzegovina",
      "Cape Verde Islands": "Cape Verde",
      "Congo DR": "DR Congo"
    };

    const ROUND_NAME_MAP = {
      "GROUP_STAGE": "Group Stage",
      "LAST_32": "Round of 32",
      "LAST_16": "Round of 16",
      "QUARTER_FINALS": "Quarter-final",
      "SEMI_FINALS": "Semi-final",
      "THIRD_PLACE": "Match for third place",
      "FINAL": "Final"
    };

    console.log("Fetching scores from Football-Data.org...");
    try {
      const response = await fetch("/fd-api/competitions/WC/matches?season=2026", {
        method: "GET",
        headers: {
          "X-Auth-Token": RAPID_API_KEY,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorBody = {};
        try { errorBody = JSON.parse(errorText); } catch (e) { errorBody = { message: errorText }; }
        throw new Error(`API Error ${response.status}: ${errorBody.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Scores updated successfully:", data);

      if (data.matches && data.matches.length > 0) {
        const transformed = data.matches.map(item => ({
          round: ROUND_NAME_MAP[item.stage] || item.stage.replace(/_/g, ' '),
          date: item.utcDate.split("T")[0],
          time: item.utcDate.split("T")[1].substring(0, 5),
          team1: TEAM_NAME_MAP[item.homeTeam.name] || item.homeTeam.name,
          team2: TEAM_NAME_MAP[item.awayTeam.name] || item.awayTeam.name,
          score1: item.score.fullTime.home ?? undefined,
          score2: item.score.fullTime.away ?? undefined,
          group: item.group ? item.group.replace('GROUP_', 'Group ') : null,
          ground: item.venue || "TBD",
          num: item.id
        }));

        // Separate into group and knockout
        const groupMatches = transformed.filter(m => m.group);
        const knockoutMatches = transformed.filter(m => !m.group);

        if (groupMatches.length > 0) setMatches(groupMatches);
        if (knockoutMatches.length > 0) setKnockout(knockoutMatches);
        
        setDataSource('live');
        // Persist fetched data to localStorage
        localStorage.setItem(LOCAL_STORAGE_MATCHES_KEY, JSON.stringify(groupMatches));
        localStorage.setItem(LOCAL_STORAGE_KNOCKOUT_KEY, JSON.stringify(knockoutMatches));
        const newRefreshTime = `Refreshed: ${new Date().toLocaleString()}`; // Use toLocaleString for full date/time
        setLastRefresh(newRefreshTime);
        localStorage.setItem(LOCAL_STORAGE_LAST_REFRESH_KEY, newRefreshTime);
      } else {
        console.warn("API returned 0 matches. Displaying previously loaded data or seed data.");
      }
    } catch (error) {
      console.error("Failed to fetch scores:", error);
      alert("API Error: Check console or verify your RapidAPI key.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("wc_pool_user");
    if (savedUser) {
      setPlayers(prev => prev.map(p => ({ ...p, isYou: p.name === savedUser })));
    }
  }, []);

  const handleUserSelect = (name) => {
    setPlayers(prev => prev.map(p => ({ ...p, isYou: p.name === name })));
    localStorage.setItem("wc_pool_user", name);
    setShowUserModal(false);
  };

  useEffect(() => {
    const all = getAllTeams(players);
    setTP(prev => {
      const u = { ...prev };
      all.forEach(t => { if (!u[t]) u[t] = { currentRound: "Group Stage" }; });
      return u;
    });
  }, [players]);

// ── UPDATE: post message to parent Claude chat ───────────────────────────────
  function requestScoreUpdate() {
    if (RAPID_API_KEY) {
      fetchLiveScores();
      return;
    }
    const msg = "Update my World Cup scores";
    try { window.parent.postMessage({ type: "human_turn", message: msg }, "*"); } catch (e) { }
    try { navigator.clipboard.writeText(msg); } catch (e) { }
    setShowUpdatePrompt(true);
    setTimeout(() => setShowUpdatePrompt(false), 4000);
  }

// ── STATS: baked-in data, updated by Claude on request ──────────────────────
  // Function to update stats based on fetched match data
  const updateStatsFromMatches = async () => {
    setIsLoadingStats(true);
    
    const TEAM_NAME_MAP = {
      "United States": "USA",
      "Czechia": "Czech Republic",
      "Bosnia-Herzegovina": "Bosnia & Herzegovina",
      "Cape Verde Islands": "Cape Verde",
      "Congo DR": "DR Congo"
    };

    try {
      // 1. Fetch Top Scorers
      const scorersRes = await fetch("/fd-api/competitions/WC/scorers", {
        headers: { "X-Auth-Token": RAPID_API_KEY }
      });
      const scorersData = await scorersRes.json();

      // 2. Fetch Tournament Teams (to get info like Coach and Venue)
      const teamsRes = await fetch("/fd-api/competitions/WC/teams", {
        headers: { "X-Auth-Token": RAPID_API_KEY }
      });
      const teamsData = await teamsRes.json();

      const allPlayedMatches = [...matches, ...knockout].filter(m => m.score1 !== undefined && m.score2 !== undefined);
      const totalPlayed = allPlayedMatches.length;

      // Update lastUpdate string
      // Transform scorers
      const newTopScorers = (scorersData.scorers || []).map(s => ({
        player: s.player.name,
        team: TEAM_NAME_MAP[s.team.name] || s.team.name,
        goals: s.goals,
        assists: s.assists || 0
      }));

      // Generate Dynamic Fun Facts from Team data
      const apiFunFacts = [];
      if (teamsData.teams && teamsData.teams.length > 0) {
        // Fact about a random team
        const randomTeam = teamsData.teams[Math.floor(Math.random() * teamsData.teams.length)];
        apiFunFacts.push(`${randomTeam.name} is lead by coach ${randomTeam.coach.name} and hosts matches at ${randomTeam.venue || "various venues"}.`);
        
        // Fact about a user's team specifically
        const myTeamNames = Array.from(yourTeams);
        const myRandomTeam = teamsData.teams.find(t => myTeamNames.includes(TEAM_NAME_MAP[t.name] || t.name));
        if (myRandomTeam) {
          apiFunFacts.push(`Your team, ${myRandomTeam.shortName}, was founded in ${myRandomTeam.founded}. Their colors are ${myRandomTeam.clubColors}.`);
        }
      }

      // Update statsData state
      setStatsData(prevStats => ({
        ...prevStats,
        // lastUpdate: `Refreshed: ${new Date().toLocaleString()} (${totalPlayed} matches played)`
        // Note: More complex stats like topScorers, poolLeaderStats, etc.,
        // would require significant aggregation logic here, or additional API calls
        // to endpoints like /players or /teams if available.
        // For this request, we're primarily updating the timestamp.
        lastUpdate: `Refreshed: ${new Date().toLocaleString()} (${totalPlayed} matches played)`,
        topScorers: newTopScorers.length > 0 ? newTopScorers : prevStats.topScorers,
        funFacts: apiFunFacts.length > 0 ? [...apiFunFacts, ...prevStats.funFacts.slice(0, 4)] : prevStats.funFacts
      }));
      
      console.log("Stats updated from current match data.");
    } catch (error) {
      console.error("Failed to update stats from match data:", error);
      alert("Failed to fetch detailed tournament stats. Check your API limit.");
    } finally {
      setIsLoadingStats(false);
    }
  };

  async function requestStatsUpdate() {
    if (RAPID_API_KEY) {
      await updateStatsFromMatches();
    } else {
      const msg = "Update my World Cup stats";
      try { window.parent.postMessage({ type: "human_turn", message: msg }, "*"); } catch (e) { }
      try { navigator.clipboard.writeText(msg); } catch (e) { }
    }
    setShowStatsPrompt(true);
    setTimeout(() => setShowStatsPrompt(false), 4000);
  }

// ── DERIVED ────────────────────────────────────────────────────────────────
  const myPlayer = players.find(p => p.isYou);
  const myEarnings = myPlayer ? calcEarnings(myPlayer.teams, teamProgress) : 0;
  const myNet = myEarnings - BUY_IN;
  const maxPossible = 430; // 4×(5+10+15+25) + 1×60 + 1×150
  const progressPct = Math.min(100, Math.max(0, (myEarnings / (BUY_IN + maxPossible)) * 100));
  const leaderboard = players.map(p => ({ ...p, earnings: calcEarnings(p.teams, teamProgress), net: calcEarnings(p.teams, teamProgress) - BUY_IN })).sort((a, b) => b.earnings - a.earnings);
  const myRank = leaderboard.findIndex(p => p.isYou) + 1;
  const groupStandings = buildStandings(groups, matches);
  const matchesByGroup = {};
  matches.forEach(m => { if (m.group) { if (!matchesByGroup[m.group]) matchesByGroup[m.group] = []; matchesByGroup[m.group].push(m); } });
  const poolTeams = new Set(players.flatMap(p => p.teams));
  const yourTeams = new Set(myPlayer?.teams || []);
  const knockoutResults = buildKnockoutResults(knockout, groupStandings);

  const DataSourceBadge = () => {
    const config = {
      live: { icon: "📡", label: "LIVE", color: "#4ade80" },
      cache: { icon: "💾", label: "CACHED", color: "#fbbf24" },
      seed: { icon: "🌱", label: "SEED", color: "#6b7280" }
    }[dataSource];

    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 5px", borderRadius: 4, background: "rgba(0,0,0,0.3)", fontSize: 9, fontWeight: 800, color: config.color, marginLeft: 8, border: `1px solid ${config.color}33`, verticalAlign: "middle" }}>
        {config.icon} {config.label}
      </span>
    );
  };

  // Bracket columns
  const r32 = knockout.filter(m => m.round === "Round of 32").sort((a, b) => a.num - b.num);
  const r16 = knockout.filter(m => m.round === "Round of 16").sort((a, b) => a.num - b.num);
  const qf = knockout.filter(m => m.round === "Quarter-final").sort((a, b) => a.num - b.num);
  const sf = knockout.filter(m => m.round === "Semi-final").sort((a, b) => a.num - b.num);
  const final = knockout.find(m => m.round === "Final");
  const third = knockout.find(m => m.round === "Match for third place");

  // Schedule filters
  const allMatches = [...matches, ...knockout];
  const todayStr = new Date().toISOString().split('T')[0];
  const todayGames = allMatches.filter(m => m.date === todayStr);
  const upcomingGames = allMatches.filter(m => m.date > todayStr).sort((a, b) => new Date(a.date) - new Date(b.date));
  const resultsMatches = allMatches.filter(m => m.score1 !== undefined && m.score2 !== undefined && m.date !== todayStr).sort((a, b) => new Date(b.date) - new Date(a.date));

  const tabs = [
    { id: "leaderboard", label: "🏆 Leaderboard" },
    { id: "groupstage", label: "⚽ Group Stage" },
    { id: "bracket", label: "⚔️ Bracket" },
    { id: "schedule", label: "📅 Schedule" },
    { id: "myteams", label: "🚩 My Teams" },
    { id: "stats", label: "📊 Stats" },
    { id: "allteams", label: "🔧 All Teams" },
    { id: "payouts", label: "💰 Payouts" },
    { id: "edit", label: "✏️ Edit Draft" },
    // Show Icons tab only if Aric is selected
    ...(myPlayer?.name === "Aric" ? [{ id: "icons", label: "✨ Icons" }] : []),
  ];

  const card = (extra = {}) => ({ background: "rgba(17,24,19,0.9)", border: "1px solid #1f2937", borderRadius: 10, ...extra });
  const pill = (active, color = "#22c55e") => ({ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid", background: active ? "rgba(20,83,45,0.6)" : "transparent", borderColor: active ? color : "#374151", color: active ? color : "#6b7280", transition: "all 0.15s" });

  const ScheduleMatchItem = ({ m }) => {
    const t1 = resolveSlot(m.team1, groupStandings, knockoutResults) || m.team1;
    const t2 = resolveSlot(m.team2, groupStandings, knockoutResults) || m.team2;
    const played = m.score1 !== undefined && m.score2 !== undefined;
    const isYou1 = yourTeams.has(t1), isYou2 = yourTeams.has(t2);
    const isPool1 = poolTeams.has(t1), isPool2 = poolTeams.has(t2);
    
    const owners1 = players.filter(p => p.teams.includes(t1));
    const owners2 = players.filter(p => p.teams.includes(t2));

    return (
      <div style={{ ...card(), padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{ width: 50, fontSize: 10, color: "#4b5563", fontWeight: 700 }}>
          {m.time ? m.time.split(' ')[0] : 'TBD'}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", width: "100%" }}>
            <span style={{ 
              fontSize: 13, fontWeight: isYou1 ? 800 : 500, 
              color: isYou1 ? "#4ade80" : isPool1 ? "#a5b4fc" : "#e5e7eb",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
              {t1}
            </span>
            <Flag country={t1} />
          </div>
          {owners1.length > 0 && (
            <div style={{ fontSize: 9, color: isYou1 ? "#4ade80cc" : "#6b7280", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
              {owners1.map(o => o.isYou ? "You" : o.name).join(", ")}
            </div>
          )}
        </div>
        <div style={{ 
          width: 54, textAlign: "center", fontWeight: 900, fontSize: played ? 15 : 11, 
          color: played ? "#fbbf24" : "#374151", background: "rgba(0,0,0,0.3)", 
          padding: "3px 0", borderRadius: 5, flexShrink: 0 
        }}>
          {played ? `${m.score1}–${m.score2}` : "vs"}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            <Flag country={t2} />
            <span style={{ 
              fontSize: 13, fontWeight: isYou2 ? 800 : 500, 
              color: isYou2 ? "#4ade80" : isPool2 ? "#a5b4fc" : "#e5e7eb",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
              {t2}
            </span>
          </div>
          {owners2.length > 0 && (
            <div style={{ fontSize: 9, color: isYou2 ? "#4ade80cc" : "#6b7280", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
              {owners2.map(o => o.isYou ? "You" : o.name).join(", ")}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0a1a0f,#0d2318 40%,#0a1a0f)", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#e5e7eb" }}>

{/* HEADER */}
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#14532d,#166534 50%,#15803d)", borderBottom: "2px solid #22c55e", padding: "18px 20px 14px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 60px,#fff 60px,#fff 61px)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#86efac", textTransform: "uppercase", marginBottom: 3 }}>⚽ 2026 FIFA World Cup Pool</div>
              <h1 style={{ margin: 0, fontSize: "clamp(20px,5vw,30px)", fontWeight: 800, color: "#fff", letterSpacing: -1 }}>
                {myPlayer ? `${myPlayer.name}'s Dashboard` : "World Cup Dashboard"}
              </h1>
              <div style={{ marginTop: 4, color: "#bbf7d0", fontSize: 12 }}>
                {myPlayer?.teams.map((t, i) => <span key={i}><Flag country={t} /> {t} </span>)}
                • Rank #{myRank} of {players.length}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#86efac", letterSpacing: 2, textTransform: "uppercase" }}>Net Position</div>
              <div style={{ fontSize: "clamp(26px,6vw,40px)", fontWeight: 900, color: myNet >= 0 ? "#4ade80" : "#f87171", letterSpacing: -2 }}>
                {myNet >= 0 ? "+" : ""}{myNet < 0 ? `-$${Math.abs(myNet)}` : `$${myNet}`}
              </div>
              <div style={{ fontSize: 11, color: "#6ee7b7" }}>${myEarnings} earned / $40 invested</div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 11, color: "#86efac" }}>
              <span>📉 -$40</span>
              <span style={{ fontWeight: 700, color: myNet >= 0 ? "#4ade80" : "#fbbf24" }}>{myNet >= 0 ? "✅ In the green!" : myNet === 0 ? "⚖️ Break even!" : `Need $${Math.abs(myNet)} more`}</span>
              <span>🏆 +${maxPossible - BUY_IN}</span>
            </div>
            <div style={{ height: 12, background: "rgba(0,0,0,0.4)", borderRadius: 99, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
              <div style={{ position: "absolute", left: `${(BUY_IN / (BUY_IN + maxPossible)) * 100}%`, top: 0, bottom: 0, width: 2, background: "#fbbf24", zIndex: 2, opacity: 0.8 }} />
              <div style={{ height: "100%", width: `${progressPct}%`, background: myNet >= 0 ? "linear-gradient(90deg,#16a34a,#4ade80)" : "linear-gradient(90deg,#dc2626,#f87171)", borderRadius: 99, transition: "width 0.8s ease", zIndex: 1, position: "relative" }} />
            </div>
            <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2, textAlign: "center" }}>🟡 break-even mark</div>
          </div>
        </div>
      </div>

{/* TABS */}
      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid #1f2937", background: "#0d1f14", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "11px 14px", border: "none", background: "transparent", color: activeTab === t.id ? "#4ade80" : "#6b7280", borderBottom: activeTab === t.id ? "2px solid #4ade80" : "2px solid transparent", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px", maxWidth: activeTab === "bracket" ? 9999 : 960, margin: "0 auto" }}>

        {/* ══ LEADERBOARD ══ */}
        {activeTab === "leaderboard" && (
          <div>
            <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>POOL STANDINGS</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {leaderboard.map((p, i) => (
                <div key={p.name} style={{ ...card(), border: p.isYou ? "1px solid #22c55e" : undefined, background: p.isYou ? "linear-gradient(135deg,rgba(20,83,45,0.6),rgba(21,128,61,0.3))" : "rgba(17,24,19,0.8)", padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "#d97706" : i === 1 ? "#9ca3af" : i === 2 ? "#b45309" : "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: p.isYou ? "#4ade80" : "#e5e7eb" }}>{p.name}{p.isYou && <span style={{ fontSize: 10, color: "#86efac", marginLeft: 6 }}>← YOU</span>}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{p.teams.map((t, ti) => <span key={ti} style={{ marginRight: 5 }}><Flag country={t} /> {t}</span>)}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 900, fontSize: 17, color: p.net >= 0 ? "#4ade80" : "#f87171" }}>{p.net >= 0 ? "+" : ""}{p.net < 0 ? `-$${Math.abs(p.net)}` : `$${p.net}`}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>${p.earnings}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ GROUP STAGE ══ */}
        {activeTab === "groupstage" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, margin: 0 }}>GROUP STAGE</h2>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Last update: {lastRefresh} <DataSourceBadge /></div>
              </div>
              <button 
                disabled={isLoading}
                onClick={requestScoreUpdate} 
                style={{ 
                  background: "#14532d", 
                  border: "1px solid #22c55e", 
                  borderRadius: 8, 
                  color: "#4ade80", 
                  padding: "8px 14px", 
                  cursor: isLoading ? "not-allowed" : "pointer", 
                  fontSize: 13, 
                  fontWeight: 600, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 6,
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? <Spinner /> : "⚡"} {isLoading ? "Updating..." : "Update Scores"}
              </button>
            </div>
            {showUpdatePrompt && (
              <div style={{ background: "rgba(20,83,45,0.5)", border: "1px solid #22c55e", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#86efac", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>📋</span>
                <span><strong>Message copied!</strong> Paste it in the chat below and send — Claude will fetch the latest scores and push a fresh artifact.</span>
              </div>
            )}
            <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap", fontSize: 11, color: "#9ca3af" }}>
              <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#16a34a", marginRight: 4 }} />Auto advance</span>
              <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#d97706", marginRight: 4 }} />Best 3rd</span>
              <span style={{ color: "#4ade80" }}>■ Your team</span>
              <span style={{ color: "#a5b4fc" }}>■ Pool team</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
              {groups.map(g => (
                <button key={g.name} onClick={() => setSG(g.name)} style={pill(selectedGroup === g.name)}>
                  {g.name}{g.teams.filter(t => yourTeams.has(t)).map(t => <Flag key={t} country={t} />)}
                </button>
              ))}
              <button onClick={() => setSG("ALL")} style={pill(selectedGroup === "ALL")}>All</button>
            </div>
            {groups.filter(g => selectedGroup === "ALL" || g.name === selectedGroup).map(group => {
              const st = groupStandings[group.name] || [];
              const gm = (matchesByGroup[group.name] || []).sort((a, b) => new Date(a.date) - new Date(b.date));
              return (
                <div key={group.name} style={{ ...card(), overflow: "hidden", marginBottom: 20 }}>
                  <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, color: "#86efac", fontSize: 14 }}>{group.name}</span>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{group.teams.filter(t => yourTeams.has(t)).map((t, i) => <span key={t}>{i > 0 ? " · " : ""}<Flag country={t} /> {t}</span>)}</span>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead><tr style={{ borderBottom: "1px solid #1f2937" }}>
                        {["", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map((h, hi) => (
                          <th key={hi} style={{ padding: "6px 8px", color: "#6b7280", fontWeight: 700, fontSize: 10, textAlign: hi <= 1 ? "left" : "center", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {st.map((tm, idx) => {
                          const isYours = yourTeams.has(tm.team), isPool = poolTeams.has(tm.team);
                          const dotColor = idx <= 1 ? "#16a34a" : idx === 2 ? "#d97706" : "transparent";
                          return (
                            <tr key={tm.team} style={{ borderBottom: "1px solid rgba(31,41,55,0.4)", background: isYours ? "rgba(20,83,45,0.3)" : isPool ? "rgba(79,70,229,0.07)" : "transparent" }}>
                              <td style={{ padding: "7px 8px", textAlign: "center" }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor, margin: "0 auto" }} /></td>
                              <td style={{ padding: "7px 8px", fontWeight: isYours ? 800 : 500, color: isYours ? "#4ade80" : isPool ? "#a5b4fc" : "#e5e7eb" }}>
                                <span style={{ marginRight: 4 }}><Flag country={tm.team} /></span>{tm.team}
                                {isYours && <span style={{ marginLeft: 5, fontSize: 9, color: "#4ade80", background: "rgba(20,83,45,0.5)", padding: "1px 4px", borderRadius: 3 }}>YOU</span>}
                                {!isYours && isPool && <span style={{ marginLeft: 5, fontSize: 9, color: "#a5b4fc", background: "rgba(79,70,229,0.2)", padding: "1px 4px", borderRadius: 3 }}>POOL</span>}
                              </td>
                              {[tm.played, tm.won, tm.drawn, tm.lost, tm.gf, tm.ga].map((v, vi) => (
                                <td key={vi} style={{ padding: "7px 8px", textAlign: "center", color: "#d1d5db" }}>{v}</td>
                              ))}
                              <td style={{ padding: "7px 8px", textAlign: "center", color: tm.gd > 0 ? "#4ade80" : tm.gd < 0 ? "#f87171" : "#d1d5db", fontWeight: 600 }}>{tm.gd > 0 ? "+" : ""}{tm.gd}</td>
                              <td style={{ padding: "7px 8px", textAlign: "center", fontWeight: 900, fontSize: 14, color: tm.pts > 0 ? "#fbbf24" : "#6b7280" }}>{tm.pts}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ borderTop: "1px solid #1f2937", padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#4b5563", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Fixtures & Results</div>
                    {gm.map((m, mi) => {
                      const played = m.score1 !== undefined;
                      const t1y = yourTeams.has(m.team1), t2y = yourTeams.has(m.team2);
                      const t1p = poolTeams.has(m.team1), t2p = poolTeams.has(m.team2);
                      return (
                        <div key={mi} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 6px", borderRadius: 5, fontSize: 12, background: (t1y || t2y) ? "rgba(20,83,45,0.2)" : (t1p || t2p) ? "rgba(79,70,229,0.05)" : "transparent", marginBottom: 2 }}>
                          <span style={{ fontSize: 10, color: "#6b7280", width: 64, flexShrink: 0 }}>{new Date(m.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span style={{ flex: 1, textAlign: "right", fontWeight: t1y ? 800 : 400, color: t1y ? "#4ade80" : t1p ? "#a5b4fc" : "#d1d5db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><Flag country={m.team1} /> {m.team1}</span>
                          <span style={{ width: 52, textAlign: "center", fontWeight: 800, fontSize: played ? 14 : 11, color: played ? "#fbbf24" : "#374151", background: played ? "rgba(217,119,6,0.12)" : "rgba(255,255,255,0.03)", borderRadius: 5, padding: "2px 4px", flexShrink: 0 }}>{played ? `${m.score1}–${m.score2}` : "vs"}</span>
                          <span style={{ flex: 1, textAlign: "left", fontWeight: t2y ? 800 : 400, color: t2y ? "#4ade80" : t2p ? "#a5b4fc" : "#d1d5db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.team2} <Flag country={m.team2} /></span>
                          <span style={{ fontSize: 10, color: "#374151", width: 70, textAlign: "right", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.ground}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div style={{ fontSize: 10, color: "#374151", textAlign: "center", marginTop: 4 }}>📡 openfootball/worldcup.json · Refreshed via Claude</div>
          </div>
        )}

        {/* ══ BRACKET ══ */}
        {activeTab === "bracket" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, margin: 0 }}>KNOCKOUT BRACKET</h2>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Last update: {lastRefresh} <DataSourceBadge /></div>
              </div>
              <button 
                disabled={isLoading}
                onClick={requestScoreUpdate} 
                style={{ 
                  background: "#14532d", 
                  border: "1px solid #22c55e", 
                  borderRadius: 8, 
                  color: "#4ade80", 
                  padding: "8px 14px", 
                  cursor: isLoading ? "not-allowed" : "pointer", 
                  fontSize: 13, 
                  fontWeight: 600, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 6,
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? <Spinner /> : "⚡"} {isLoading ? "Updating..." : "Update Scores"}
              </button>
            </div>
            {showUpdatePrompt && (
              <div style={{ background: "rgba(20,83,45,0.5)", border: "1px solid #22c55e", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#86efac", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>📋</span>
                <span><strong>Message copied!</strong> Paste it in the chat below and send — Claude will fetch the latest scores and push a fresh artifact.</span>
              </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginBottom: 14, fontSize: 11, color: "#9ca3af", flexWrap: "wrap" }}>
              <span style={{ color: "#4ade80" }}>▌ Your team</span>
              <span style={{ color: "#a5b4fc" }}>▌ Pool team</span>
              <span><span style={{ color: "#fbbf24", fontWeight: 700 }}>bold score</span> = winner</span>
              <span style={{ color: "#6b7280" }}>italic = TBD slot</span>
            </div>

            {/* BRACKET LAYOUT — horizontally scrollable */}
            <div style={{ overflowX: "auto", paddingBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", minWidth: "max-content", padding: "4px 2px" }}>

                {/* LEFT SIDE: R32 matches 73-80, R16 89-92, QF 97+99, SF 101 */}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  {/* R32 Left */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#1d4ed8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Round of 32</div>
                    {r32.slice(0, 8).map(m => (
                      <BracketMatch key={m.num} match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                    ))}
                  </div>

                  {/* R16 Left */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 30 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#0891b2", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Round of 16</div>
                    {r16.slice(0, 4).map((m, i) => (
                      <div key={m.num} style={{ marginTop: i === 0 ? 0 : i === 1 ? 6 : i === 2 ? 32 : 6 }}>
                        <BracketMatch match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                      </div>
                    ))}
                  </div>

                  {/* QF Left */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 68 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Quarter-finals</div>
                    {qf.slice(0, 2).map((m, i) => (
                      <div key={m.num} style={{ marginTop: i === 0 ? 0 : 72 }}>
                        <BracketMatch match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                      </div>
                    ))}
                  </div>

                  {/* SF Left */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 120 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#b45309", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Semi-final</div>
                    {sf.slice(0, 1).map(m => (
                      <BracketMatch key={m.num} match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                    ))}
                  </div>
                </div>

                {/* CENTER: Final + 3rd place */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 160, flexShrink: 0 }}>
                  {/* Final */}
                  {final && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#fbbf24", letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", background: "rgba(217,119,6,0.2)", borderRadius: 6 }}>🏆 FINAL</div>
                      <BracketMatch match={final} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} isChampion={true} />
                      <div style={{ fontSize: 10, color: "#6b7280" }}>Jul 19 · New York/NJ</div>
                    </div>
                  )}
                  {/* 3rd place */}
                  {third && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase" }}>3rd Place</div>
                      <BracketMatch match={third} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} isThird={true} />
                      <div style={{ fontSize: 10, color: "#6b7280" }}>Jul 18 · Miami</div>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE: SF 102, QF 98+100, R16 93-96, R32 81-88 */}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  {/* SF Right */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 120 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#b45309", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Semi-final</div>
                    {sf.slice(1, 2).map(m => (
                      <BracketMatch key={m.num} match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                    ))}
                  </div>

                  {/* QF Right */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 68 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Quarter-finals</div>
                    {qf.slice(2, 4).map((m, i) => (
                      <div key={m.num} style={{ marginTop: i === 0 ? 0 : 72 }}>
                        <BracketMatch match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                      </div>
                    ))}
                  </div>

                  {/* R16 Right */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 30 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#0891b2", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Round of 16</div>
                    {r16.slice(4, 8).map((m, i) => (
                      <div key={m.num} style={{ marginTop: i === 0 ? 0 : i === 1 ? 6 : i === 2 ? 32 : 6 }}>
                        <BracketMatch match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                      </div>
                    ))}
                  </div>

                  {/* R32 Right */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#1d4ed8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, textAlign: "center", padding: "4px 8px", background: "rgba(0,0,0,0.3)", borderRadius: 6 }}>Round of 32</div>
                    {r32.slice(8, 16).map(m => (
                      <BracketMatch key={m.num} match={m} groupStandings={groupStandings} knockoutResults={knockoutResults} yourTeams={yourTeams} poolTeams={poolTeams} />
                    ))}
                  </div>
                </div>

              </div>
            </div>
            <div style={{ fontSize: 10, color: "#374151", textAlign: "center", marginTop: 8 }}>📡 Bracket updates via Claude + openfootball/worldcup.json · Scroll horizontally to see full bracket</div>
          </div>
        )}

        {/* ══ SCHEDULE ══ */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: 1 }}>MATCH SCHEDULE</h2>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Based on your current local time <DataSourceBadge /></div>
              </div>
              <button 
                disabled={isLoading}
                onClick={requestScoreUpdate}
                style={{ background: "#14532d", border: "1px solid #22c55e", borderRadius: 8, color: "#4ade80", padding: "8px 14px", cursor: isLoading ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
              >
                {isLoading ? <Spinner /> : "⚡"} {isLoading ? "Updating..." : "Update Scores"}
              </button>
            </div>

            {/* TODAY */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ height: 2, background: "#fbbf24", flex: 1 }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fbbf24", textTransform: "uppercase", letterSpacing: 2 }}>Today's Matches</span>
                <div style={{ height: 2, background: "#fbbf24", flex: 1 }} />
              </div>
              {todayGames.length === 0 ? (
                <div style={{ ...card(), padding: 20, textAlign: "center", color: "#6b7280", fontSize: 13 }}>No matches scheduled for today</div>
              ) : (
                todayGames.map((m, i) => <ScheduleMatchItem key={i} m={m} />)
              )}
            </div>

            {/* UPCOMING */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 12, fontWeight: 800, color: "#4ade80", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, paddingLeft: 4, borderLeft: "3px solid #4ade80" }}>Upcoming Games</h3>
              {upcomingGames.length === 0 ? (
                <div style={{ ...card(), padding: 20, textAlign: "center", color: "#6b7280", fontSize: 13 }}>No upcoming games found</div>
              ) : (
                upcomingGames.slice(0, 15).map((m, i) => (
                  <div key={i}>
                    {(i === 0 || upcomingGames[i - 1].date !== m.date) && (
                      <div style={{ fontSize: 10, color: "#4b5563", fontWeight: 800, margin: "14px 0 8px 4px", textTransform: "uppercase" }}>{new Date(m.date + "T12:00:00").toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                    )}
                    <ScheduleMatchItem m={m} />
                  </div>
                ))
              )}
              {upcomingGames.length > 15 && <div style={{ textAlign: "center", fontSize: 11, color: "#4b5563", marginTop: 10 }}>View Group Stage tab for full schedule</div>}
            </div>

            {/* FINAL RESULTS */}
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 800, color: "#6b7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, paddingLeft: 4, borderLeft: "3px solid #6b7280" }}>Final Results</h3>
              {resultsMatches.length === 0 ? (
                <div style={{ ...card(), padding: 20, textAlign: "center", color: "#6b7280", fontSize: 13 }}>No results recorded yet</div>
              ) : (
                resultsMatches.slice(0, 12).map((m, i) => <ScheduleMatchItem key={i} m={m} />)
              )}
              {resultsMatches.length > 12 && <div style={{ textAlign: "center", fontSize: 11, color: "#4b5563", marginTop: 10 }}>Older results available in history</div>}
            </div>
          </div>
        )}

        {/* ══ MY TEAMS ══ */}
        {activeTab === "myteams" && myPlayer && (
          <div>
            <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>YOUR ROSTER</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 10, marginBottom: 16 }}>
              {myPlayer.teams.map((team, i) => {
                const prog = teamProgress[team] || { currentRound: "Group Stage" };
                const earned = ROUNDS_ORDER.filter(r => r !== "Group Stage").reduce((a, r) => ROUNDS_ORDER.indexOf(prog.currentRound) >= ROUNDS_ORDER.indexOf(r) ? a + PAYOUT_STRUCTURE[r].perTeam : a, 0);
                let groupInfo = null;
                groups.forEach(g => {
                  if (g.teams.includes(team)) {
                    const st = groupStandings[g.name] || [];
                    const row = st.find(r => r.team === team);
                    const pos = st.findIndex(r => r.team === team);
                    groupInfo = { group: g.name, row, pos };
                  }
                });
                return (
                  <div key={i} style={{ ...card(), border: `1px solid ${getRoundColor(prog.currentRound)}`, padding: 14 }}>
                    <div style={{ fontSize: 26, marginBottom: 3 }}><Flag country={team} /></div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#e5e7eb" }}>{team}</div>
                    {groupInfo && (
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
                        {groupInfo.group}
                        {groupInfo.row && <span style={{ marginLeft: 6, padding: "1px 5px", borderRadius: 3, fontSize: 10, background: groupInfo.pos <= 1 ? "rgba(22,163,74,0.2)" : groupInfo.pos === 2 ? "rgba(217,119,6,0.2)" : "rgba(185,28,28,0.15)", color: groupInfo.pos <= 1 ? "#4ade80" : groupInfo.pos === 2 ? "#fbbf24" : "#f87171" }}>
                          {groupInfo.row.pts}pts {groupInfo.pos <= 1 ? "▲" : groupInfo.pos === 2 ? "?" : "▼"}
                        </span>}
                      </div>
                    )}
                    <div style={{ display: "inline-block", marginTop: 7, padding: "2px 7px", background: getRoundColor(prog.currentRound), borderRadius: 99, fontSize: 10, fontWeight: 700, color: "#fff" }}>{prog.currentRound}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>Earned:</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: earned > 0 ? "#4ade80" : "#6b7280" }}>${earned}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ ...card(), overflow: "hidden" }}>
              <div style={{ padding: "9px 14px", background: "rgba(0,0,0,0.3)", fontWeight: 700, color: "#86efac", fontSize: 12 }}>PAYOUT BREAKDOWN</div>
              {ROUNDS_ORDER.filter(r => r !== "Group Stage").map(r => {
                const pay = PAYOUT_STRUCTURE[r];
                const q = myPlayer.teams.filter(t => ROUNDS_ORDER.indexOf((teamProgress[t] || { currentRound: "Group Stage" }).currentRound) >= ROUNDS_ORDER.indexOf(r));
                const earned = q.length * pay.perTeam;
                return (
                  <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", borderBottom: "1px solid #111" }}>
                    <span style={{ fontSize: 12, color: "#d1d5db" }}>{r}</span>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{q.length} × ${pay.perTeam}</span>
                    <span style={{ fontWeight: 700, color: earned > 0 ? "#4ade80" : "#4b5563" }}>${earned}</span>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", background: "rgba(74,222,128,0.08)" }}>
                <span style={{ fontWeight: 800, color: "#86efac" }}>TOTAL EARNED</span>
                <span style={{ fontWeight: 900, fontSize: 17, color: "#4ade80" }}>${myEarnings}</span>
              </div>
            </div>
          </div>
        )}

        {/* ══ ALL TEAMS ══ */}
        {activeTab === "allteams" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, margin: 0 }}>KNOCKOUT PROGRESS TRACKER</h2>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Click a round to update</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {getAllTeams(players).map(team => {
                const prog = teamProgress[team] || { currentRound: "Group Stage" };
                const owners = players.filter(p => p.teams.includes(team));
                return (
                  <div key={team} style={{ ...card(), padding: "11px 13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, flexWrap: "wrap" }}>
                      <Flag country={team} />
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{team}</span>
                      <span style={{ fontSize: 11, color: "#6b7280" }}>— {owners.map((o, i) => <span key={i}>{o.isYou ? <strong style={{ color: "#4ade80" }}>You</strong> : o.name}{i < owners.length - 1 ? ", " : ""}</span>)}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {ROUNDS_ORDER.map(r => {
                        const isActive = prog.currentRound === r;
                        const isPast = ROUNDS_ORDER.indexOf(r) < ROUNDS_ORDER.indexOf(prog.currentRound);
                        return (
                          <button key={r} onClick={() => setTP(prev => ({ ...prev, [team]: { currentRound: r } }))} style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: "pointer", border: "1px solid", background: isActive ? getRoundColor(r) : isPast ? "rgba(74,222,128,0.08)" : "transparent", borderColor: isActive ? getRoundColor(r) : isPast ? "#22c55e44" : "#374151", color: isActive ? "#fff" : isPast ? "#4ade80" : "#6b7280" }}>
                            {r === "Group Stage" ? "⚽ Group" : r === "Champion" ? "🏆 Champ" : r}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ PAYOUTS ══ */}
        {activeTab === "payouts" && (
          <div>
            <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>PAYOUT STRUCTURE</h2>
            <div style={{ ...card(), overflow: "hidden", marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "9px 14px", background: "#1f2937", fontSize: 10, fontWeight: 700, color: "#86efac", letterSpacing: 1, textTransform: "uppercase" }}>
                <span>Round</span><span style={{ textAlign: "center" }}>Teams Advance</span><span style={{ textAlign: "right" }}>$ Per Team</span>
              </div>
              {[{ r: "Group Stage (no payout)", a: "—", p: "$0" }, { r: "Round of 32", a: "16", p: "$5" }, { r: "Round of 16", a: "8", p: "$10" }, { r: "Quarterfinals", a: "4", p: "$15" }, { r: "Semifinals", a: "2", p: "$25" }, { r: "Runner-Up", a: "1", p: "$60" }, { r: "Champion", a: "1", p: "$150" }].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 14px", borderBottom: "1px solid #111", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <span style={{ fontSize: 12, color: "#d1d5db" }}>{row.r}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af", textAlign: "center" }}>{row.a}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", textAlign: "right" }}>{row.p}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "11px 14px", background: "rgba(74,222,128,0.08)" }}>
                <span style={{ fontWeight: 800, color: "#86efac", fontSize: 13 }}>TOTAL POT</span><span />
                <span style={{ fontWeight: 900, fontSize: 17, color: "#4ade80", textAlign: "right" }}>$480</span>
              </div>
            </div>
            <div style={{ ...card(), border: "1px solid #22c55e", padding: 14 }}>
              <div style={{ color: "#86efac", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🇹🇷🇪🇬🇸🇦🇵🇹 YOUR MAX POSSIBLE</div>
              {ROUNDS_ORDER.filter(r => r !== "Group Stage").map(r => {
                const pay = PAYOUT_STRUCTURE[r];
                return (
                  <div key={r} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1f2937", fontSize: 12 }}>
                    <span style={{ color: "#d1d5db" }}>{r}</span>
                    <span style={{ color: "#9ca3af" }}>4 × ${pay.perTeam}</span>
                    <span style={{ fontWeight: 700, color: "#4ade80" }}>${4 * pay.perTeam}</span>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0 3px" }}>
                <span style={{ fontWeight: 800, color: "#86efac" }}>MAX GROSS</span>
                <span style={{ fontWeight: 900, fontSize: 17, color: "#4ade80" }}>${maxPossible}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#9ca3af", fontSize: 12 }}>Max Net</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#4ade80" }}>+${maxPossible - BUY_IN}</span>
              </div>
            </div>
          </div>
        )}

        {/* ══ EDIT DRAFT ══ */}
        {activeTab === "edit" && (
          <div>
            <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>EDIT DRAFT PICKS</h2>
            <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>Tap any placeholder to enter the real country name after your draft.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {players.map(player => (
                <div key={player.name} style={{ ...card(), border: player.isYou ? "1px solid #22c55e" : undefined, background: player.isYou ? "rgba(20,83,45,0.35)" : "rgba(17,24,19,0.9)", padding: "11px 13px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: player.isYou ? "#4ade80" : "#e5e7eb", marginBottom: 7 }}>{player.name}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {player.teams.map((team, ti) => (
                      <div key={ti}>
                        {editingPlayer === player.name && editingSlot === ti ? (
                          <div style={{ display: "flex", gap: 5 }}>
                            <input autoFocus value={newTeamName} onChange={e => setNTN(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  const v = newTeamName.trim() || team;
                                  setPlayers(prev => prev.map(p => p.name !== player.name ? p : { ...p, teams: p.teams.map((t, i) => i === ti ? v : t) }));
                                  setEP(null); setES(null); setNTN("");
                                }
                                if (e.key === "Escape") { setEP(null); setES(null); }
                              }}
                              placeholder={team}
                              style={{ background: "#0d1f14", border: "1px solid #22c55e", borderRadius: 6, color: "#e5e7eb", padding: "4px 8px", fontSize: 12, width: 130, outline: "none" }} />
                            <button onClick={() => {
                              const v = newTeamName.trim() || team;
                              setPlayers(prev => prev.map(p => p.name !== player.name ? p : { ...p, teams: p.teams.map((t, i) => i === ti ? v : t) }));
                              setEP(null); setES(null); setNTN("");
                            }} style={{ background: "#16a34a", border: "none", borderRadius: 6, color: "#fff", padding: "4px 9px", cursor: "pointer", fontSize: 12 }}>✓</button>
                          </div>
                        ) : (
                          <button onClick={() => { setEP(player.name); setES(ti); setNTN(team); }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #374151", borderRadius: 7, color: "#d1d5db", padding: "4px 9px", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                            <Flag country={team} /> {team} <span style={{ color: "#6b7280", fontSize: 9 }}>✏️</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ STATS ══ */}
        {activeTab === "stats" && (
          <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, margin: 0 }}>TOURNAMENT STATS</h2>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Last updated: {statsData.lastUpdate}</div>
              </div>
              {/* <button onClick={requestStatsUpdate} style={{ background: "#14532d", border: "1px solid #22c55e", borderRadius: 8, color: "#4ade80", padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                ⚡ Update St
                {isLoadingStats ? <Spinner /> : "⚡"} {isLoadingStats ? "Updating..." : "Update Stats"}
              </button> */}
            </div>

            {showStatsPrompt && (
              <div style={{ background: "rgba(20,83,45,0.5)", border: "1px solid #22c55e", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#86efac", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>📋</span>
                <span><strong>Copied!</strong> Paste "Update my World Cup stats" in the chat — Claude will refresh everything.</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* YOUR TEAM STATS */}
              <div style={{ ...card(), overflow: "hidden" }}>
                <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", fontWeight: 800, color: "#4ade80", fontSize: 13, letterSpacing: 0.5 }}>
                  🇹🇷🇪🇬🇸🇦🇵🇹 YOUR TEAM STATS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: 1, background: "#1f2937" }}>
                  {statsData.yourTeamStats.map((t, i) => (
                    <div key={i} style={{ background: "rgba(17,24,19,0.95)", padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <Flag country={t.team} />
                        <span style={{ fontWeight: 800, color: "#e5e7eb", fontSize: 14 }}>{t.team}</span>
                        <span style={{ fontSize: 10, color: "#6b7280", marginLeft: "auto" }}>{t.group}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12 }}>
                        <div style={{ color: "#6b7280" }}>Played</div><div style={{ color: "#e5e7eb", fontWeight: 600 }}>{t.played}</div>
                        <div style={{ color: "#6b7280" }}>Goals</div><div style={{ color: "#4ade80", fontWeight: 700 }}>{t.goals}</div>
                        <div style={{ color: "#6b7280" }}>Against</div><div style={{ color: t.goalsAgainst > 0 ? "#f87171" : "#6b7280", fontWeight: 600 }}>{t.goalsAgainst}</div>
                        <div style={{ color: "#6b7280" }}>Clean sheets</div><div style={{ color: "#4ade80", fontWeight: 600 }}>{t.cleanSheets}</div>
                      </div>
                      {t.keyPlayer && <div style={{ marginTop: 8, fontSize: 11, color: "#fbbf24" }}>⭐ {t.keyPlayer}</div>}
                      {t.form && t.form.length > 0 && (
                        <div style={{ marginTop: 6, display: "flex", gap: 3 }}>
                          {t.form.split("").map((r, ri) => (
                            <span key={ri} style={{ width: 18, height: 18, borderRadius: 4, background: r === "W" ? "#16a34a" : r === "D" ? "#d97706" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff" }}>{r}</span>
                          ))}
                        </div>
                      )}
                      {(!t.form || t.form.length === 0) && <div style={{ marginTop: 6, fontSize: 10, color: "#374151" }}>No matches yet</div>}
                    </div>
                  ))}
                </div>
              </div>
              {/* TOP SCORERS */}
              <div style={{ ...card(), overflow: "hidden" }}>
                <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", fontWeight: 800, color: "#fbbf24", fontSize: 13, letterSpacing: 0.5 }}>
                  👟 TOP SCORERS
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1f2937" }}>
                      {["#", "Player", "Team", "⚽", "🅰️"].map((h, i) => (
                        <th key={i} style={{ padding: "7px 12px", color: "#6b7280", fontWeight: 700, fontSize: 11, textAlign: i <= 2 ? "left" : "center" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {statsData.topScorers.map((s, i) => {
                      const isYourTeam = yourTeams.has(s.team);
                      const owner = players.find(p => p.teams.includes(s.team));
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(31,41,55,0.4)", background: isYourTeam ? "rgba(20,83,45,0.25)" : poolTeams.has(s.team) ? "rgba(79,70,229,0.07)" : "transparent" }}>
                          <td style={{ padding: "8px 12px", color: "#6b7280", fontWeight: 700, width: 32 }}>{i + 1}</td>
                          <td style={{ padding: "8px 12px", fontWeight: isYourTeam ? 800 : 500, color: isYourTeam ? "#4ade80" : "#e5e7eb" }}>
                            {s.player}
                            {isYourTeam && <span style={{ fontSize: 9, color: "#4ade80", background: "rgba(20,83,45,0.5)", padding: "1px 4px", borderRadius: 3, marginLeft: 5 }}>YOURS</span>}
                          </td>
                          <td style={{ padding: "8px 12px", color: "#9ca3af", fontSize: 12, whiteSpace: "nowrap" }}><Flag country={s.team} /> {s.team}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: 900, color: "#fbbf24", fontSize: 15 }}>{s.goals}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", color: "#9ca3af" }}>{s.assists ?? 0}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* POOL STANDINGS BY TEAM PERFORMANCE */}
              <div style={{ ...card(), overflow: "hidden" }}>
                <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", fontWeight: 800, color: "#86efac", fontSize: 13, letterSpacing: 0.5 }}>
                  🏅 POOL PLAYER PERFORMANCE
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #1f2937" }}>
                        {["Player", "W", "D", "L", "GF", "GA", "GD", "Best Team"].map((h, i) => (
                          <th key={i} style={{ padding: "6px 10px", color: "#6b7280", fontWeight: 700, fontSize: 10, textAlign: i === 0 ? "left" : "center", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...statsData.poolLeaderStats].sort((a, b) => b.wins - a.wins || b.totalGoals - a.totalGoals || a.totalGoalsAgainst - b.totalGoalsAgainst).map((p, i) => {
                        const isYou = p.poolPlayer === "Aric (You)" || p.poolPlayer === "Aric";
                        const gd = (p.totalGoals || 0) - (p.totalGoalsAgainst || 0);
                        return (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(31,41,55,0.4)", background: isYou ? "rgba(20,83,45,0.3)" : "transparent" }}>
                            <td style={{ padding: "7px 10px", fontWeight: isYou ? 800 : 500, color: isYou ? "#4ade80" : "#e5e7eb", whiteSpace: "nowrap" }}>
                              {p.poolPlayer}{isYou && <span style={{ fontSize: 9, color: "#4ade80", marginLeft: 4 }}>← YOU</span>}
                            </td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: "#4ade80", fontWeight: 700 }}>{p.wins || 0}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: "#fbbf24" }}>{p.draws || 0}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: "#f87171" }}>{p.losses || 0}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: "#4ade80", fontWeight: 600 }}>{p.totalGoals || 0}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: "#f87171" }}>{p.totalGoalsAgainst || 0}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", color: gd > 0 ? "#4ade80" : gd < 0 ? "#f87171" : "#9ca3af", fontWeight: 600 }}>{gd > 0 ? "+" : ""}{gd}</td>
                            <td style={{ padding: "7px 10px", textAlign: "center", fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.bestTeam || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* POOL RIVALRIES */}
              {statsData.poolRivalries && statsData.poolRivalries.length > 0 && (
                <div style={{ ...card(), overflow: "hidden" }}>
                  <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", fontWeight: 800, color: "#f87171", fontSize: 13, letterSpacing: 0.5 }}>
                    ⚔️ POOL HEAD-TO-HEAD
                  </div>
                  <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {statsData.poolRivalries.map((r, i) => {
                      const p1you = r.player1 === "Aric (You)" || r.player1 === "Aric";
                      const p2you = r.player2 === "Aric (You)" || r.player2 === "Aric";
                      return (
                        <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "10px 12px", border: "1px solid #1f2937" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, fontWeight: 700 }}>
                            <span style={{ color: p1you ? "#4ade80" : "#e5e7eb" }}>{r.player1}</span>
                            <span style={{ color: "#4b5563", fontSize: 10 }}>vs</span>
                            <span style={{ color: p2you ? "#4ade80" : "#e5e7eb" }}>{r.player2}</span>
                          </div>
                          {(r.matchups || []).map((m, mi) => (
                            <div key={mi} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 0", borderTop: "1px solid rgba(31,41,55,0.5)" }}>
                              <span style={{ flex: 1, textAlign: "right", color: yourTeams.has(m.team1) ? "#4ade80" : "#d1d5db" }}><Flag country={m.team1} /> {m.team1}</span>
                              <span style={{ fontWeight: 800, color: "#fbbf24", padding: "1px 6px", background: "rgba(217,119,6,0.12)", borderRadius: 4, whiteSpace: "nowrap" }}>{m.score}</span>
                              <span style={{ flex: 1, color: yourTeams.has(m.team2) ? "#4ade80" : "#d1d5db" }}>{m.team2} <Flag country={m.team2} /></span>
                              {m.winner && <span style={{ fontSize: 10, color: "#4ade80", fontWeight: 700, whiteSpace: "nowrap" }}>✓ {m.winner}</span>}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FUN FACTS */}
              <div style={{ ...card(), overflow: "hidden" }}>
                <div style={{ background: "rgba(0,0,0,0.35)", padding: "9px 14px", fontWeight: 800, color: "#c4b5fd", fontSize: 13, letterSpacing: 0.5 }}>
                  🎲 FUN FACTS & STORYLINES
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {statsData.funFacts.map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "8px 10px", background: "rgba(0,0,0,0.15)", borderRadius: 6, fontSize: 13, color: "#d1d5db", lineHeight: 1.5 }}>
                      <span style={{ color: "#c4b5fd", flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BIGGEST UPSET + MOST DANGEROUS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
                {statsData.biggestUpset && statsData.biggestUpset.winner && (
                  <div style={{ ...card(), border: "1px solid #dc2626", overflow: "hidden" }}>
                    <div style={{ background: "rgba(185,28,28,0.2)", padding: "9px 14px", fontWeight: 800, color: "#f87171", fontSize: 13 }}>💥 BIGGEST UPSET</div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                        <Flag country={statsData.biggestUpset.winner} />
                        <span style={{ fontWeight: 800, color: "#4ade80", fontSize: 14 }}>{statsData.biggestUpset.winner}</span>
                        <span style={{ fontWeight: 900, color: "#fbbf24", fontSize: 14 }}>{statsData.biggestUpset.score}</span>
                        <Flag country={statsData.biggestUpset.loser} />
                        <span style={{ color: "#f87171", fontSize: 13 }}>{statsData.biggestUpset.loser}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{statsData.biggestUpset.description}</div>
                    </div>
                  </div>
                )}
                {statsData.mostDangerous && statsData.mostDangerous.team && (
                  <div style={{ ...card(), border: "1px solid #d97706", overflow: "hidden" }}>
                    <div style={{ background: "rgba(217,119,6,0.2)", padding: "9px 14px", fontWeight: 800, color: "#fbbf24", fontSize: 13 }}>🔥 MOST DANGEROUS TEAM</div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Flag country={statsData.mostDangerous.team} />
                        <span style={{ fontWeight: 800, color: "#e5e7eb", fontSize: 15 }}>{statsData.mostDangerous.team}</span>
                        {yourTeams.has(statsData.mostDangerous.team) && <span style={{ fontSize: 10, color: "#4ade80", background: "rgba(20,83,45,0.5)", padding: "2px 6px", borderRadius: 4 }}>YOUR TEAM 🎉</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{statsData.mostDangerous.reason}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ ICONS ══ */}
        {activeTab === "icons" && (
          <div>
            <h2 style={{ color: "#86efac", fontSize: 15, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>UI & ASSET INVENTORY</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ ...card(), padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#4ade80", marginBottom: 12, textTransform: "uppercase" }}>Global UI Icons</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", gap: 10 }}>
                  {["✨", "🏆", "⚽", "🗂", "📅", "📊", "🔧", "💰", "✏️", "⚡", "📋", "🥇", "🥈", "🥉", "←", "✓", "▌", "■", "▲", "▼", "?", "👟", "⭐", "⚔️", "🎲", "💥", "🔥", "💀", "📡", "📉"].map((icon, idx) => (
                    <div key={idx} style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", borderRadius: 8, fontSize: 20 }}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...card(), padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fbbf24", marginBottom: 12, textTransform: "uppercase" }}>Team Flag Library</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
                  {Object.entries(FLAG_MAP).sort((a, b) => a[0].localeCompare(b[0])).map(([name, emoji]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
                      <span style={{ fontSize: 22 }}>{emoji}</span>
                      <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20, textAlign: "center", color: "#4b5563", fontSize: 11 }}>
              Total Assets: {Object.keys(FLAG_MAP).length} flags + 30 UI icons
            </div>
          </div>
        )}
      </div>

      {/* USER SELECTION MODAL */}
      {showUserModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0d2318', padding: '32px', borderRadius: '16px',
            border: '1px solid #22c55e', textAlign: 'center', width: '340px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏆</div>
            <h2 style={{ color: '#fff', marginTop: 0, letterSpacing: -1 }}>Who are you?</h2>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: 20 }}>Select your name to personalize your stats and dashboard view.</p>
            <select
              onChange={(e) => handleUserSelect(e.target.value)}
              defaultValue=""
              style={{
                width: '100%', padding: '12px', background: '#0a1a0f',
                color: '#e5e7eb', border: '1px solid #1f2937', borderRadius: '8px',
                fontSize: '15px', fontWeight: 600, outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="" disabled>Choose your name...</option>
              {players.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
            <div style={{ marginTop: 24, fontSize: 11, color: '#374151' }}>Selection is saved to this browser.</div>
          </div>
        </div>
      )}
    </div>
  );
}