import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as game} from "./game/game.js";
import {reducer as user} from "./user/user.js";

const combinedReducer = combineReducers({data, game, user});

export default combinedReducer;
