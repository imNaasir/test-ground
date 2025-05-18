import Pusher, { Options } from "pusher-js/react-native";
import Echo from "laravel-echo";
import * as SecureStore from "expo-secure-store";
import axios from "./axios";
const key = "a269231b980d43225a2c";
const options = {
    broadcaster: "pusher",
    key,
    // disableStats: true,
    appId: "1560466",
    encrypted: true,
    cluster: "mt1",
    authorizer: (channel, options) => {
        return {
            authorize: async (socketId, callback) => {
                const token = await SecureStore.getItemAsync("token");
                const pushData = {
                    socket_id: socketId,
                    channel_name: channel.name,
                };

                axios
                    .post("/broadcasting/auth", pushData, {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(token as string)}`,
                        },
                    })
                    .then((response) => {
                        callback(null, response.data);
                    })
                    .catch((error) => {
                        callback(error, null);
                    });
            },
        };
    },
} as Options;

const client = new Pusher(key, options);
export default new Echo({
    client,
    ...options,
});
