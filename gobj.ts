import { Arrays, Compounds, Primitives } from "jsr:@denosaurs/byte-type";
import { cString } from "./utils.ts";

export const gobject = Deno.dlopen("/opt/homebrew/lib/libgobject-2.0.dylib", {
    g_signal_connect_data: {
        parameters: [
            "pointer", // instance pointer
            "buffer",  // signal name
            "function", // callback
            "pointer"  // user data
        ],
        result: "pointer", // actually returns a handler id, a pointer-sized integer
    },
    g_object_set_property: {
        parameters: [
            "pointer", // instance pointer
            "buffer",  // property name
            "pointer"  // property value
        ],
        result: "void" // no return value
    },
    g_object_get_property: {
        parameters: [
            "pointer", // instance pointer
            "buffer",  // property name
            "pointer"  // GValue pointer to store the property value
        ],
        result: "void" // no return value
    },
    g_value_set_string: {
        parameters: [
            "pointer", // GValue pointer
            "buffer"   // string value
        ],
        result: "void" // no return value
    },
    g_value_get_string: {
        parameters: [
            "pointer" // GValue pointer
        ],
        result: "pointer" // returns a string value
    },
    g_value_set_object: {
        parameters: [
            "pointer", // GValue pointer
            "pointer"  // GObject pointer
        ],
        result: "void" // no return value
    },
    g_value_unset: {
        parameters: [
            "pointer" // GValue pointer
        ],
        result: "void" // no return value
    },
    g_value_init: {
        parameters: [
            "pointer", // GValue pointer
            "u64"   // GType
        ],
        result: "pointer" // no return value
    },

    g_value_get_int: {
        parameters: [
            "pointer" // GValue pointer
        ],
        result: "i32" // returns an integer value
    },
    g_value_set_int: {
        parameters: [
            "pointer", // GValue pointer
            "i32"      // integer value
        ],
        result: "void" // no return value
    },

    g_value_get_boolean: {
        parameters: [
            "pointer" // GValue pointer
        ],
        result: "bool" // returns a boolean value
    },
    g_value_set_boolean: {
        parameters: [
            "pointer", // GValue pointer
            "bool"     // boolean value
        ],
        result: "void" // no return value
    },
});

export class GCallback<const Definition extends Deno.UnsafeCallbackDefinition = Deno.UnsafeCallbackDefinition> extends Deno.UnsafeCallback<Definition> {

}

export class DefaultHandler extends GCallback {
    constructor(callback: () => void) {
        super({
            parameters: [],
            result: "void",
        }, callback);
    }
}


// deno-lint-ignore no-explicit-any
export type AnyGCallback = GCallback<any>;

const gpointer = Primitives.u64;

const gvalue = new Compounds.SizedStruct({
    type: Primitives.u64,
    data: new Arrays.SizedArrayType(gpointer, 2)
});

export enum GType {
    Invalid = 0 << 2,
    Boolean = 5 << 2,
    Int = 6 << 2,
    UInt = 7 << 2,
    Float = 8 << 2,
    Double = 9 << 2,
    String = 16 << 2,
    Object = 20 << 2,
}
export type AnyGValue = GValue<GType> | boolean | string | number | GObject;

type GTypeValue<Type extends GType> =
    | Type extends GType.String ? string : never
    | Type extends GType.Int ? number : never
    | Type extends GType.Boolean ? boolean : never
    | Type extends GType.Float ? number : never
    | Type extends GType.Double ? number : never
    | Type extends GType.UInt ? number : never
    | Type extends GType.Invalid ? never : never
    | Type extends GType.Object ? GObject : never;

export class GValue<Type extends GType> {
    public internalPointer: Deno.PointerValue;
    private buffer: Uint8Array;
    constructor(private type: Type) {
        this.buffer = new Uint8Array(gvalue.byteSize);
        this.internalPointer = Deno.UnsafePointer.of(this.buffer);
        gobject.symbols.g_value_init(this.internalPointer, BigInt(type));
    }

    set value(value: GTypeValue<Type>) {
        if (this.type === GType.String)
            gobject.symbols.g_value_set_string(this.internalPointer, cString(value as string));
        else if (this.type === GType.Int)
            gobject.symbols.g_value_set_int(this.internalPointer, value as number);
        else if (this.type === GType.Boolean)
            gobject.symbols.g_value_set_boolean(this.internalPointer, value as boolean);
        else if (this.type === GType.Object)
            gobject.symbols.g_value_set_object(this.internalPointer, (value as GObject).internalPointer);
        else
            throw new Error(`Unsupported GType for setting value: ${this.type}`);
    }

    static of<Type extends GType>(type: Type, value: GTypeValue<Type>): GValue<Type> {
        const gvalue = new GValue(type);
        gvalue.value = value;
        return gvalue;
    }

    static from(value: AnyGValue): GValue<GType> {
        if (value instanceof GValue) {
            return value;
        } else if (typeof value === "string") {
            return GValue.of(GType.String, value);
        } else if (typeof value === "number") {
            return GValue.of(GType.Int, value);
        } else if (typeof value === "boolean") {
            return GValue.of(GType.Boolean, value);
        } else if (value instanceof GObject) {
            return GValue.of(GType.Object, value);
        }
        throw new Error("Unsupported value type for GValue conversion");
    }
}

export class GObject {
    constructor(public internalPointer: Deno.PointerValue) {
        if (this.internalPointer === null) {
            throw new Error("Failed to create GtkWidget");
        }
    }

    connect(signal: string, callback: AnyGCallback, userData?: Deno.PointerValue): Deno.PointerValue {
        return gobject.symbols.g_signal_connect_data(this.internalPointer, cString(signal), callback.pointer, userData ?? null);
    }

    setProperty(propertyName: string, value: AnyGValue) {
        gobject.symbols.g_object_set_property(this.internalPointer, cString(propertyName), GValue.from(value).internalPointer);
        return this;
    }

    // getProperty<Type extends GType>(propertyName: string, type: Type): GTypeValue<Type> {
    //     const value = gvalue.init(type);
    //     gobject.symbols.g_object_get_property(this.internalPointer, cString(propertyName), value.internalPointer);
    //     return value;
    // }
}

export class GInitiallyUnowned extends GObject {

}