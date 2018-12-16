const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;


function callback(connection, senderName, objectPath, interfaceName, signalName, parameters, userData) {
    // log("connection: " + connection);
    // log("senderName: " + senderName);
    // log("objectPath: " + objectPath);
    // log("interfaceName: " + interfaceName);
    // log("signalName: " + signalName);
    // log("parameters: " + parameters);
    // log("userData: " + userData);
    let unpacked = parameters.get_child_value(0).get_boolean();
    if (unpacked) {
        log("unpacked value: " + unpacked);
        log("unpacked type: " + typeof unpacked);
    }
}

let id = Gio.DBus.session.signal_subscribe(
    null,
    "org.gnome.ScreenSaver",
    "ActiveChanged",
    "/org/gnome/ScreenSaver",
    null,
    0,
    callback
);

// Gio.DBus.session.signal_unsubscribe(id);

let loop = new GLib.MainLoop(null, false);
loop.run();