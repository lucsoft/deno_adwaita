import { AnyGValue, DefaultHandler } from "./gobj.ts";
import { gtk4, GtkAdjustment, GtkApplication, GtkApplicationWindow, GtkWidget } from "./gtk4.ts";
import { gio } from "./libs.ts";
import { cString } from "./utils.ts";

export const adwaita = Deno.dlopen("/opt/homebrew/lib/libadwaita-1.dylib", {
    adw_init: {
        parameters: [],
        result: "void" // no return value
    },
    adw_get_major_version: {
        parameters: [],
        result: "u32" // returns the major version of Adwaita
    },
    adw_get_minor_version: {
        parameters: [],
        result: "u32" // returns the minor version of Adwaita
    },
    adw_get_micro_version: {
        parameters: [],
        result: "u32" // returns the micro version of Adwaita
    },

    adw_application_new: {
        parameters: [
            "buffer",
            "u32"
        ],
        result: "pointer" // instance of AdwApplication
    },

    adw_application_window_new: {
        parameters: [
            "pointer" // instance pointer of GtkApplication
        ],
        result: "pointer" // returns a pointer to a new AdwApplicationWindow
    },
    adw_application_window_set_content: {
        parameters: [
            "pointer", // instance pointer of AdwApplicationWindow
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_preferences_page_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwPreferencesPage
    },
    adw_preferences_page_add: {
        parameters: [
            "pointer", // instance pointer of AdwPreferencesPage
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_page_remove: {
        parameters: [
            "pointer", // instance pointer of AdwPreferencesPage
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_page_scroll_to_top: {
        parameters: [
            "pointer" // instance pointer of AdwPreferencesPage
        ],
        result: "void" // no return value
    },
    adw_preferences_page_set_banner: {
        parameters: [
            "pointer", // instance pointer of AdwPreferencesPage
            "pointer"  // banner widget pointer
        ],
        result: "void" // no return value
    },

    adw_preferences_group_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwPreferencesGroup
    },
    adw_preferences_group_add: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_group_remove: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_group_set_header_suffix: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_preferences_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwPreferencesRow
    },

    adw_action_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwActionRow
    },
    adw_action_row_add_prefix: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_action_row_add_suffix: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_action_row_remove: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_button_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwButtonRow
    },

    adw_clamp_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwClamp
    },
    adw_clamp_set_child: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_switch_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwSwitchRow
    },
    adw_switch_row_set_active: {
        parameters: [
            "pointer", // instance pointer
            "bool"  // active state
        ],
        result: "void" // no return value
    },
    adw_switch_row_get_active: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "bool" // returns the active state
    },

    adw_expander_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwExpanderRow
    },
    adw_expander_row_add_suffix: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_expander_row_add_prefix: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_expander_row_remove: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_expander_row_add_row: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_toolbar_view_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwToolbarView
    },
    adw_toolbar_view_add_top_bar: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_toolbar_view_add_bottom_bar: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_toolbar_view_set_content: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },

    adw_header_bar_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwHeaderBar
    },

    adw_combo_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwComboRow
    },
    adw_combo_row_get_selected: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "u32" // returns the selected index
    },
    adw_combo_row_set_selected: {
        parameters: [
            "pointer", // instance pointer
            "u32"      // selected index
        ],
        result: "void" // no return value
    },

    adw_entry_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwEntryRow
    },

    adw_password_entry_row_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwPasswordEntryRow
    },

    adw_spin_row_new: {
        parameters: [
            "pointer", // gtk adjustment pointer
            "f64",
            "i32", // minimum value
        ],
        result: "pointer" // returns a pointer to a new AdwSpinRow
    },
    adw_spin_row_new_with_range: {
        parameters: [
            "f64", // minimum value
            "f64", // maximum value
            "f64", // step increment
        ],
        result: "pointer" // returns a pointer to a new AdwSpinRow
    },
    adw_spin_row_get_value: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "f64" // returns the current value of the spin row
    },

    adw_dialog_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwDialog
    },
    adw_dialog_close: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "void" // no return value
    },
    adw_dialog_set_child: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_dialog_present: {
        parameters: [
            "pointer", // instance pointer
            "pointer" // parent window pointer
        ],
        result: "void" // no return value
    },

    adw_preferences_dialog_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwPreferencesDialog
    },
    adw_preferences_dialog_add: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_dialog_remove: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_dialog_push_subpage: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // child widget pointer
        ],
        result: "void" // no return value
    },
    adw_preferences_dialog_pop_subpage: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "void" // no return value
    },

    adw_toggle_group_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwToggleGroup
    },
    adw_toggle_group_add: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // toggle pointer
        ],
        result: "void" // no return value
    },
    adw_toggle_group_remove: {
        parameters: [
            "pointer", // instance pointer
            "pointer"  // toggle pointer
        ],
        result: "void" // no return value
    },
    adw_toggle_group_remove_all: {
        parameters: [
            "pointer" // instance pointer
        ],
        result: "void" // no return value
    },

    adw_toggle_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwToggle
    },

    adw_status_page_new: {
        parameters: [],
        result: "pointer" // returns a pointer to a new AdwStatusPage
    },

    adw_banner_new: {
        parameters: [
            "buffer" // title
        ],
        result: "pointer" // returns a pointer to a new AdwBanner
    },
});

console.log("Adwaita version:", `${adwaita.symbols.adw_get_major_version()}.` + adwaita.symbols.adw_get_minor_version() + "." + adwaita.symbols.adw_get_micro_version());

const GApplicationFlags = {
    FLAGS_NONE: 0
};

export class Application extends GtkApplication {
    #activePromise = Promise.withResolvers<GtkApplication>();
    constructor(applicationId: string, flags: number = GApplicationFlags.FLAGS_NONE) {
        super(adwaita.symbols.adw_application_new(cString(applicationId), flags));
    }

    get activated(): Promise<GtkApplication> {
        return this.#activePromise.promise;
    }

    signalActivate(callback: (self: this) => void) {
        this.connect("activate", new DefaultHandler(() => {
            try {
                callback(this);
            } catch (error) {
                console.error("Error during activation:", error);
                Deno.exit(1);
            }
        }));
        return this;
    }

    run() {
        gio.symbols.g_application_run(this.internalPointer, 0, null);
    }
}

export class ApplicationWindow extends GtkApplicationWindow {
    protected constructor(internalPointer: Deno.PointerValue) {
        super(internalPointer);
    }

    static override create(application: GtkApplication) {
        return new ApplicationWindow(adwaita.symbols.adw_application_window_new(application.internalPointer));
    }

    override setChild(child: GtkWidget) {
        adwaita.symbols.adw_application_window_set_content(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class ToolbarView extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_toolbar_view_new()) {
        super(internalPointer);
    }

    addTopBar(child: HeaderBar): this;
    addTopBar(child: GtkWidget) {
        adwaita.symbols.adw_toolbar_view_add_top_bar(this.internalPointer, child.internalPointer);
        return this;
    }

    addBottomBar(child: GtkWidget) {
        adwaita.symbols.adw_toolbar_view_add_bottom_bar(this.internalPointer, child.internalPointer);
        return this;
    }

    setContent(child: GtkWidget) {
        adwaita.symbols.adw_toolbar_view_set_content(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class HeaderBar extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_header_bar_new()) {
        super(internalPointer);
    }
}

export class Clamp extends GtkWidget {
    constructor() {
        super(adwaita.symbols.adw_clamp_new());
    }

    setChild(child: GtkWidget) {
        adwaita.symbols.adw_clamp_set_child(this.internalPointer, child.internalPointer);
        return this;
    }
}
export class PreferencesPage extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_preferences_page_new()) {
        super(internalPointer);
    }

    add(child: PreferencesGroup) {
        adwaita.symbols.adw_preferences_page_add(this.internalPointer, child.internalPointer);
        return this;
    }

    remove(child: PreferencesGroup) {
        adwaita.symbols.adw_preferences_page_remove(this.internalPointer, child.internalPointer);
        return this;
    }

    scrollToTop() {
        adwaita.symbols.adw_preferences_page_scroll_to_top(this.internalPointer);
        return this;
    }

    setBanner(banner: Banner) {
        adwaita.symbols.adw_preferences_page_set_banner(this.internalPointer, banner.internalPointer);
        return this;
    }
}

export class PreferencesGroup extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_preferences_group_new()) {
        super(internalPointer);
    }

    add(child: GtkWidget) {
        adwaita.symbols.adw_preferences_group_add(this.internalPointer, child.internalPointer);
        return this;
    }

    remove(child: GtkWidget) {
        adwaita.symbols.adw_preferences_group_remove(this.internalPointer, child.internalPointer);
        return this;
    }

    setHeaderSuffix(child: GtkWidget) {
        adwaita.symbols.adw_preferences_group_set_header_suffix(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class PreferencesRow extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_preferences_row_new()) {
        super(internalPointer);
    }

    override setProperty(propertyName: string, value: AnyGValue): this {
        super.setProperty(propertyName, value);
        return this;
    }
}

export class ActionRow extends PreferencesRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_action_row_new()) {
        super(internalPointer);
    }

    signalActivate(callback: (self: this) => void) {
        this.connect("activate", new DefaultHandler(() => callback(this)));
        return this;
    }

    addSuffix(child: GtkWidget) {
        adwaita.symbols.adw_action_row_add_suffix(this.internalPointer, child.internalPointer);
        return this;
    }

    addPrefix(child: GtkWidget) {
        adwaita.symbols.adw_action_row_add_prefix(this.internalPointer, child.internalPointer);
        return this;
    }

    remove(child: GtkWidget) {
        adwaita.symbols.adw_action_row_remove(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class ButtonRow extends PreferencesRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_button_row_new()) {
        super(internalPointer);
    }

    signalActivated(callback: (self: this) => void) {
        this.connect("activated", new DefaultHandler(() => callback(this)));
        return this;
    }
}

export class SwitchRow extends ActionRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_switch_row_new()) {
        super(internalPointer);
    }

    set active(active: boolean) {
        adwaita.symbols.adw_switch_row_set_active(this.internalPointer, active);
    }

    get active(): boolean {
        return adwaita.symbols.adw_switch_row_get_active(this.internalPointer);
    }

    onActive(callback: (self: this) => void) {
        this.connect("notify::active", new DefaultHandler(() => callback(this)));
        return this;
    }
}

export class ComboRow extends ActionRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_combo_row_new()) {
        super(internalPointer);
    }

    get selected(): number {
        return adwaita.symbols.adw_combo_row_get_selected(this.internalPointer);
    }

    set selected(index: number) {
        adwaita.symbols.adw_combo_row_set_selected(this.internalPointer, index);
    }

    onSelected(callback: (self: this) => void) {
        this.connect("notify::selected", new DefaultHandler(() => callback(this)));
        return this;
    }
}

export class ExpanderRow extends PreferencesRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_expander_row_new()) {
        super(internalPointer);
    }

    addSuffix(child: GtkWidget) {
        adwaita.symbols.adw_expander_row_add_suffix(this.internalPointer, child.internalPointer);
        return this;
    }
    addPrefix(child: GtkWidget) {
        adwaita.symbols.adw_expander_row_add_prefix(this.internalPointer, child.internalPointer);
        return this;
    }
    remove(child: GtkWidget) {
        adwaita.symbols.adw_expander_row_remove(this.internalPointer, child.internalPointer);
        return this;
    }
    addRow(child: GtkWidget) {
        adwaita.symbols.adw_expander_row_add_row(this.internalPointer, child.internalPointer);
        return this;
    }
}

export class EntryRow extends PreferencesRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_entry_row_new()) {
        super(internalPointer);
        gtk4.symbols.gtk_widget_init_template(this.internalPointer);
    }

    signalActivated(callback: (self: this) => void) {
        this.connect("activated", new DefaultHandler(() => callback(this)));
        return this;
    }
}

export class PasswordEntryRow extends EntryRow {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_password_entry_row_new()) {
        super(internalPointer);
        gtk4.symbols.gtk_widget_init_template(this.internalPointer);

    }
}

export class SpinRow extends ActionRow {
    constructor(options: { adjustment: GtkAdjustment, climbRate: number, digits: number; } | { min: number, max: number, step: number; }) {
        super(
            'adjustment' in options
                ? adwaita.symbols.adw_spin_row_new(options.adjustment.internalPointer, options.climbRate, options.digits)
                : adwaita.symbols.adw_spin_row_new_with_range(options.min, options.max, options.step)
        );
    }

    set value(value: number) {
        this.setProperty("value", value);
    }

    get value(): number {
        return adwaita.symbols.adw_spin_row_get_value(this.internalPointer);
    }

    onValue(callback: (self: this) => void) {
        this.connect("notify::value", new DefaultHandler(() => callback(this)));
        return this;
    }
}

export class Dialog extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_dialog_new()) {
        super(internalPointer);
    }

    close() {
        adwaita.symbols.adw_dialog_close(this.internalPointer);
        return this;
    }

    setChild(child: GtkWidget) {
        adwaita.symbols.adw_dialog_set_child(this.internalPointer, child.internalPointer);
        return this;
    }

    present(parent?: GtkWidget) {
        adwaita.symbols.adw_dialog_present(this.internalPointer, parent ? parent.internalPointer : null);
        return this;
    }
}

export class PreferencesDialog extends Dialog {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_preferences_dialog_new()) {
        super(internalPointer);
    }

    add(page: PreferencesPage) {
        adwaita.symbols.adw_preferences_dialog_add(this.internalPointer, page.internalPointer);
        return this;
    }

    remove(page: PreferencesPage) {
        adwaita.symbols.adw_preferences_dialog_remove(this.internalPointer, page.internalPointer);
        return this;
    }

    pushSubpage(page: PreferencesPage) {
        adwaita.symbols.adw_preferences_dialog_push_subpage(this.internalPointer, page.internalPointer);
        return this;
    }

    popSubpage() {
        adwaita.symbols.adw_preferences_dialog_pop_subpage(this.internalPointer);
        return this;
    }
}

export class Toggle extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_toggle_new()) {
        super(internalPointer);
    }
}

export class ToggleGroup extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_toggle_group_new()) {
        super(internalPointer);
    }

    add(toggle: Toggle) {
        adwaita.symbols.adw_toggle_group_add(this.internalPointer, toggle.internalPointer);
        return this;
    }

    remove(toggle: Toggle) {
        adwaita.symbols.adw_toggle_group_remove(this.internalPointer, toggle.internalPointer);
        return this;
    }

    removeAll() {
        adwaita.symbols.adw_toggle_group_remove_all(this.internalPointer);
        return this;
    }
}
export class StatusPage extends GtkWidget {
    constructor(internalPointer: Deno.PointerValue = adwaita.symbols.adw_status_page_new()) {
        super(internalPointer);
    }
}

export class Banner extends GtkWidget {
    constructor(title: string, internalPointer: Deno.PointerValue = adwaita.symbols.adw_banner_new(cString(title))) {
        super(internalPointer);
    }

    onButtonClicked(callback: (self: this) => void) {
        this.connect("button-clicked", new DefaultHandler(() => callback(this)));
        return this;
    }
}