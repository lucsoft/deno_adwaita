import { GInitiallyUnowned, GObject } from "./gobj.ts";
import { cString } from "./utils.ts";

export const gtk4 = Deno.dlopen("/opt/homebrew/lib/libgtk-4.dylib", {
    gtk_application_window_new: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "pointer" // returns a pointer to a new GtkApplicationWindow
    },
    gtk_window_present: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "void" // no return value
    },
    gtk_list_box_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new GtkListBox
    },
    gtk_label_new: {
        parameters: [
            "buffer" // label text
        ],
        result: "pointer" // returns a pointer to a new GtkWidget
    },
    gtk_window_set_title: {
        parameters: [
            "pointer", // instance pointer
            "buffer"   // title text
        ],
        result: "void" // no return value
    },
    gtk_window_set_default_size: {
        parameters: [
            "pointer", // instance pointer
            "i32",     // width
            "i32"      // height
        ],
        result: "void" // no return value
    },
    gtk_window_set_child: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    gtk_box_new: {
        parameters: [
            "i32", // orientation (0 for vertical, 1 for horizontal)
            "i32"  // spacing
        ],
        result: "pointer" // returns a pointer to a new GtkBox
    },
    gtk_box_append: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    gtk_list_box_append: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    gtk_string_list_new: {
        parameters: [
            "pointer"
        ],
        result: "pointer" // returns a pointer to a new GtkStringList
    },
    gtk_string_list_append: {
        parameters: [
            "pointer", // instance pointer
            "buffer"   // string to append
        ],
        result: "void" // no return value
    },
    gtk_string_list_remove: {
        parameters: [
            "pointer", // instance pointer
            "buffer"   // string to remove
        ],
        result: "void" // no return value
    },

    gtk_adjustment_new: {
        parameters: [
            "f64", // value
            "f64", // lower
            "f64", // upper
            "f64", // step increment
            "f64", // page increment
            "f64"  // page size
        ],
        result: "pointer" // returns a pointer to a new GtkAdjustment
    },
    gtk_widget_init_template: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "void" // no return value
    }
});

export enum GtkOrientation {
    VERTICAL = 0,
    HORIZONTAL = 1,
}

export class GtkWidget extends GInitiallyUnowned { }

export class GtkApplication extends GtkWidget { }

export class GtkApplicationWindow extends GtkWidget {
    protected constructor(internalPointer: Deno.PointerValue) {
        super(internalPointer);
    }

    static create(application: GtkApplication) {
        return new GtkApplicationWindow(gtk4.symbols.gtk_application_window_new(application.internalPointer));
    }

    present() {
        gtk4.symbols.gtk_window_present(this.internalPointer);
        return this;
    }

    setTitle(title: string) {
        gtk4.symbols.gtk_window_set_title(this.internalPointer, cString(title));
        return this;
    }

    setDefaultSize(width: number, height: number) {
        gtk4.symbols.gtk_window_set_default_size(this.internalPointer, width, height);
        return this;
    }

    setChild(child: GtkWidget) {
        gtk4.symbols.gtk_window_set_child(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class GtkLabel extends GtkWidget {
    constructor(text: string) {
        super(gtk4.symbols.gtk_label_new(cString(text)));
    }
}
export class GtkBox extends GtkWidget {
    constructor(orientation: GtkOrientation, spacingInPixel: number = 0) {
        super(gtk4.symbols.gtk_box_new(orientation, spacingInPixel));
    }

    append(child: GtkWidget) {
        gtk4.symbols.gtk_box_append(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class GtkListBox extends GtkWidget {
    constructor() {
        super(gtk4.symbols.gtk_list_box_new());
    }

    append(child: GtkWidget) {
        gtk4.symbols.gtk_list_box_append(this.internalPointer, child.internalPointer);
    }
}

export class GtkStringList extends GObject {
    // TODO: Actually support the strings[]
    constructor(internalPointer: Deno.PointerValue = gtk4.symbols.gtk_string_list_new(null)) {
        super(internalPointer);
    }

    append(value: string) {
        gtk4.symbols.gtk_string_list_append(this.internalPointer, cString(value));
        return this;
    }

    remove(value: string) {
        gtk4.symbols.gtk_string_list_remove(this.internalPointer, cString(value));
        return this;
    }
}

export class GtkAdjustment extends GObject {
    constructor(value: number, lower: number, upper: number, stepIncrement: number, pageIncrement: number, pageSize: number) {
        super(gtk4.symbols.gtk_adjustment_new(value, lower, upper, stepIncrement, pageIncrement, pageSize));
    }
}