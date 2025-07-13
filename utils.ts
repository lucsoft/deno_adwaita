const encoder = new TextEncoder();
export function cString(str: string): Uint8Array {
    return encoder.encode(`${str}\0`);
}