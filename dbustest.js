const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ScreenSaverInterface =
    '<node> \
            <interface name="org.gnome.ScreenSaver"> \
                    <method name="Lock" /> \
                    <method name="GetActive"> \
                            <arg name="active" direction="out" type="b" /> \
                    </method> \
                    <method name="SetActive"> \
                            <arg name="value" direction="in" type="b" /> \
                    </method> \
                    <method name="GetActiveTime"> \
                            <arg name="value" direction="out" type="u" /> \
                    </method> \
                    <signal name="ActiveChanged"> \
                            <arg name="new_value" type="b" /> \
                    </signal> \
            </interface> \
    </node>';

const ScreenSaverProxy = Gio.DBusProxy.makeProxyWrapper(ScreenSaverInterface);

let screenSaverProxy = new ScreenSaverProxy(
    Gio.DBus.session,
    "org.gnome.ScreenSaver",
    "/org/gnome/ScreenSaver"
);

screenSaverProxy.connectSignal("ActiveChanged", function (proxy, sender, new_value) {
    print("Locked status: " + new_value);
});

let loop = new GLib.MainLoop(null, false);
loop.run();