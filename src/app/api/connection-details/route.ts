import {
  createAgentDispatchClient,
  createParticipantToken,
  createRoomServiceClient,
  getLiveKitCredentials,
} from "@/lib/livekit";

export const dynamic = "force-dynamic";

const LIVEKIT_LOG_PREFIX = "[EXT-API:livekit]";
const AGENT_ID = "olga";

/** Times a slow LiveKit server call and logs its outcome under one prefix. */
async function logLiveKitCall<T>(
  operation: "create_room" | "create_dispatch",
  roomName: string,
  call: () => Promise<T>,
): Promise<T> {
  const startedAt = Date.now();
  console.info(
    `${LIVEKIT_LOG_PREFIX} event=start operation=${operation} room_id=${roomName}`,
  );
  try {
    const result = await call();
    console.info(
      `${LIVEKIT_LOG_PREFIX} event=end operation=${operation} room_id=${roomName} elapsed_ms=${Date.now() - startedAt}`,
    );
    return result;
  } catch (error) {
    console.error(
      `${LIVEKIT_LOG_PREFIX} event=failure operation=${operation} room_id=${roomName} elapsed_ms=${Date.now() - startedAt} error_type=${getErrorType(error)}`,
    );
    throw error;
  }
}

function getErrorType(error: unknown): string {
  return error instanceof Error ? error.name : typeof error;
}

export async function POST(request: Request) {
  let name = "";
  try {
    const body = (await request.json()) as Record<string, unknown>;
    name = typeof body?.name === "string" ? body.name.trim() : "";
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  const metadata = JSON.stringify({
    agent_id: AGENT_ID,
    avatar: true,
    user_name: name,
    interaction_mode: "auto",
  });

  try {
    const { url, agentName } = getLiveKitCredentials();
    const roomName = `roleplay_${Date.now()}`;

    const roomClient = createRoomServiceClient();
    await logLiveKitCall("create_room", roomName, () =>
      roomClient.createRoom({
        name: roomName,
        metadata,
        emptyTimeout: 900,
        maxParticipants: 5,
      }),
    );

    const dispatchClient = createAgentDispatchClient();
    await logLiveKitCall("create_dispatch", roomName, () =>
      dispatchClient.createDispatch(roomName, agentName, { metadata }),
    );

    const participantToken = await createParticipantToken({
      identity: `candidate_${Date.now()}`,
      name,
      roomName,
    });

    return Response.json({
      serverUrl: url,
      roomName,
      participantName: name,
      participantToken,
    });
  } catch (error) {
    console.error(
      `[API:connection-details] event=failure error_type=${getErrorType(error)}`,
      error,
    );
    return Response.json(
      { error: "Failed to create role play session" },
      { status: 500 },
    );
  }
}
