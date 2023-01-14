import * as settings from "./settings";
import { HttpClient } from "./http_client";

export type Room = {
  room_id: number;
  name: string;
  type: string;
  role: string;
  sticky: boolean;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
  message_num: number;
  file_num: number;
  task_num: number;
  icon_path: string;
  last_update_time: number;
};

export type Member = {
  account_id: number;
  role: string;
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  avatar_image_url: string;
};

/**
 * Get array of Room
 * @return {Room[]}
 */
export const getRooms = (): Room[] => {
  const chatworkAPIToken = settings.getChatworkAPIToken();
  if (!chatworkAPIToken) {
    throw Error(`The value of chatworkAPIToken is null but it should not be.`);
  }
  const url = `https://api.chatwork.com/v2/rooms`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "x-chatworktoken": chatworkAPIToken,
  };
  const httpClient = new HttpClient();
  const results: Room[] = [];
  for (let retryCnt = 0; retryCnt < 10; retryCnt++) {
    try {
      const res = httpClient.get(url, null, headers);
      const json = res.getContentJson();
      if (!json || !Array.isArray(json) || json.length === 0) {
        return results;
      }
      for (const room of json) {
        results.push(room);
      }
      break;
    } catch (e) {
      console.log(e);
    }
  }
  return results;
};

/**
 * Get array of Member in a Room
 * @param {number} roomId
 * @return {Member[]}
 */
export const getMembersInRoom = (roomId: number): Member[] => {
  const chatworkAPIToken = settings.getChatworkAPIToken();
  if (!chatworkAPIToken) {
    throw Error(`The value of chatworkAPIToken is null but it should not be.`);
  }
  const url = `https://api.chatwork.com/v2/rooms/${roomId}/members`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "x-chatworktoken": chatworkAPIToken,
  };
  const httpClient = new HttpClient();
  const results: Member[] = [];
  for (let retryCnt = 0; retryCnt < 10; retryCnt++) {
    try {
      const res = httpClient.get(url, null, headers);
      const json = res.getContentJson();
      if (!json || !Array.isArray(json) || json.length === 0) {
        return results;
      }
      for (const room of json) {
        results.push(room);
      }
      break;
    } catch (e) {
      console.log(e);
    }
  }
  return results;
};