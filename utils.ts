const encoder = new TextEncoder();
export function cString(str: string): Uint8Array {
  return encoder.encode(`${str}\0`);
}

export const os: "darwin" | "linux" = (() => {
  const v = Deno.build.os;
  if (!(v === "darwin" || v === "linux")) {
    throw new Error(`Unsupported os: ${v}`);
  }

  return v;
})();
