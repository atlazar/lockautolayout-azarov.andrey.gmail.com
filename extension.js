const Keyboard = imports.ui.status.keyboard;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

function callback(connection, senderName, objectPath, interfaceName, signalName, parameters, userData) {
    let new_value = parameters.get_child_value(0).get_boolean();
    if (new_value) {
        Keyboard.getInputSourceManager().inputSources[0].activate();
    }
}

let subsciptionId;

function init() {
}

function enable() {
    log("[lockautolayout] enabling");
    subsciptionId = Gio.DBus.session.signal_subscribe(
        null,
        "org.gnome.ScreenSaver",
        "ActiveChanged",
        "/org/gnome/ScreenSaver",
        null,
        0,
        callback
    );
    log("[lockautolayout] enabled");
}

function disable() {
    log("[lockautolayout] disabling");
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 3000, () => {
        Gio.DBus.session.signal_unsubscribe(subsciptionId);
        log("[lockautolayout] unsubscribed");
        return false;
    });
    log("[lockautolayout] disabled");
}
