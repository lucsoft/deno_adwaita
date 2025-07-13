export const gio = Deno.dlopen("/opt/homebrew/lib/libgio-2.0.dylib", {
    g_application_run: {
        parameters: [
            "pointer", // instance pointer
            "i32",     // argc
            "pointer"  // argv
        ],
        result: "i32" // return code
    }
});