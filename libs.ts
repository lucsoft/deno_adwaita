import { os } from "./utils.ts";

export const gio = Deno.dlopen(
  {
    darwin: "libgio-2.0.dylib",
    linux: "libgio-2.0.so",
  }[os],
  {
    g_application_run: {
      parameters: [
        "pointer", // instance pointer
        "i32", // argc
        "pointer", // argv
      ],
      result: "i32", // return code
    },
  },
);
