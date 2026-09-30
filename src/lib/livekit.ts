import {
  AccessToken,
  AgentDispatchClient,
  RoomServiceClient,
} from "livekit-server-sdk";

type LiveKitCredentials = {
  url: string;
  apiKey: string;
  apiSecret: string;
  agentName: string;
};

/** Reads the LiveKit server credentials from the environment, failing fast when any is missing. */
export function getLiveKitCredentials(): LiveKitCredentials {
  const url = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const agentName = process.env.LIVEKIT_AGENT_NAME;

  if (!url || !apiKey || !apiSecret || !agentName) {
    throw new Error(
      "Missing LiveKit env vars: LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_AGENT_NAME",
    );
  }
  return { url, apiKey, apiSecret, agentName };
}

/** Builds the server-side client used to create and configure rooms. */
export function createRoomServiceClient(): RoomServiceClient {
  const { url, apiKey, apiSecret } = getLiveKitCredentials();
  return new RoomServiceClient(url, apiKey, apiSecret);
}

/** Builds the server-side client used to dispatch the voice agent into a room. */
export function createAgentDispatchClient(): AgentDispatchClient {
  const { url, apiKey, apiSecret } = getLiveKitCredentials();
  return new AgentDispatchClient(url, apiKey, apiSecret);
}

/** Mints a short-lived join token for the candidate (room join + publish/subscribe). */
export async function createParticipantToken(options: {
  identity: string;
  name: string;
  roomName: string;
}): Promise<string> {
  const { apiKey, apiSecret } = getLiveKitCredentials();
  const token = new AccessToken(apiKey, apiSecret, {
    identity: options.identity,
    name: options.name,
    ttl: "15m",
  });
  token.addGrant({
    roomJoin: true,
    room: options.roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });
  return token.toJwt();
}
