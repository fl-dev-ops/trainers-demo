export type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

export const CONNECTION_STORAGE_KEY = "olga-twin-connection";

/**
 * Parses the cached connection details, returning null when they are missing or
 * when any of the four required fields is absent or blank.
 */
export function parseConnectionDetails(
  raw: string | null,
): ConnectionDetails | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const candidate = parsed as Record<string, unknown>;
    if (
      typeof candidate.serverUrl !== "string" ||
      !candidate.serverUrl ||
      typeof candidate.roomName !== "string" ||
      !candidate.roomName ||
      typeof candidate.participantName !== "string" ||
      !candidate.participantName ||
      typeof candidate.participantToken !== "string" ||
      !candidate.participantToken
    ) {
      return null;
    }
    return {
      serverUrl: candidate.serverUrl,
      roomName: candidate.roomName,
      participantName: candidate.participantName,
      participantToken: candidate.participantToken,
    };
  } catch {
    // ignore malformed storage
  }
  return null;
}
