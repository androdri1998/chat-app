import { io } from "socket.io-client";

import config from "../config";

const URL = config.serverUrl;

export const socket = io(URL as string);
