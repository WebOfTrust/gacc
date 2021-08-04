let m = require("mithril");

let msgs = [];
let source;

let Mailbox = {
    displayData: e => {
        msgs.push("new event " + e)
        m.redraw()
    },
    oncreate: function () {
        // noinspection JSUnresolvedVariable
        source = new EventSource(CONTROLLER_URL + "/req/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM");
        source.addEventListener('data', this.displayData, false);
    },
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Mailbox")
            ]),
            m("div", {"class": "w3-container"}, msgs.map(msg => {
                return m("div", {"class": "w3-panel w3-padding-bottom"}, msg)
            }))
        ])
    }
};

module.exports = Mailbox;