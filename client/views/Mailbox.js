let m = require("mithril");

let msgs = [];
let source;

let Mailbox = {
    oninit: function () {
        // noinspection JSUnresolvedVariable
        source = new EventSource(GACC_MAILBOX_URL);
    },
    displayData: e => {
        msgs.push("new event " + e)
        m.redraw()
    },
    oncreate: function () {
        source.addEventListener('data', this.displayData, false);

        // noinspection JSUnresolvedVariable
        m.request({
            "method": "POST",
            "url": GACC_SERVER_URL + "/mailbox/request",
        }).then(resp => {
            console.log(resp)
        }).catch(e => {
            console.log(e)
        })
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