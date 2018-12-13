const Keyboard = imports.ui.status.keyboard;
const Gio = imports.gi.Gio;

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

let screenSaverProxy;
let connectionId;

function lockScreenCallback(proxy, sender, new_value) {
    if (new_value) {
        Keyboard.getInputSourceManager().inputSources[0].activate();
    }
}

function init() {
    const ScreenSaverProxy = Gio.DBusProxy.makeProxyWrapper(ScreenSaverInterface);
    screenSaverProxy = new ScreenSaverProxy(
        Gio.DBus.session,
        "org.gnome.ScreenSaver",
        "/org/gnome/ScreenSaver"
    );
}

function enable() {
    connectionId = screenSaverProxy.connectSignal("ActiveChanged", lockScreenCallback);
}

function disable() {
    screenSaverProxy.disconnectSignal(connectionId);
    screenSaverProxy.run_dispose();
}
