let m = require("mithril");

let msgs = [];
let source;

let Mailbox = {
    displayData: e => {
        size = sniff(e.data)

        let evt = e.data.slice(0, size)
        let ked = JSON.parse(evt)
        let d = ked["d"]

        console.log(d["vc"])
        msgs.unshift(d["vc"])
        m.redraw()
    },
    oncreate: function () {
        // noinspection JSUnresolvedVariable
        source.addEventListener('data', this.displayData, false);
    },
    oninit: function () {
        // noinspection JSUnresolvedVariable
        source = new EventSource(CONTROLLER_URL + "/req/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM");
    },
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Mailbox")
            ]),
            m("div", {"class": "w3-container"}, msgs.map(msg => {
                if (msg.d.type[1] === "LegalEntityEngagementContextRolevLEICredential") {
                    return m("div", {"class": "w3-card w3-padding w3-margin"}, [
                        m("div", [m("span", m("h3", "Proof Received"))]),
                        m("div", [m("span", m("b", "From: ")), m("span", msg.ti)]),
                        m("div", [m("span", m("b", "To: ")), m("span", msg.d.si)]),
                        m("div", [m("span", m("b", "Credential: ")), m("span", msg.i)]),
                        m("br"),
                        m("div", [m("span", m("b", "LEI: ")), m("span", msg.d.LEI)]),
                        m("div", [m("span", m("b", "Legal Name: ")), m("span", msg.d.personLegalName)]),
                        m("div", [m("span", m("b", "Context Role: ")), m("span", msg.d.engagementContextRole)]),
                        m("div", [m("span", m("b", "Type: ")), m("span", msg.d.type[1])]),
                    ])

                } else if (msg.d.type[1] === "LegalEntityOfficialOrganizationalRolevLEICredential") {
                    return m("div", {"class": "w3-card w3-padding w3-margin"}, [
                        m("div", [m("span", m("h3", "Proof Received"))]),
                        m("div", [m("span", m("b", "From: ")), m("span", msg.ti)]),
                        m("div", [m("span", m("b", "To: ")), m("span", msg.d.si)]),
                        m("div", [m("span", m("b", "Credential: ")), m("span", msg.i)]),
                        m("br"),
                        m("div", [m("span", m("b", "LEI: ")), m("span", msg.d.LEI)]),
                        m("div", [m("span", m("b", "Legal Name: ")), m("span", msg.d.personLegalName)]),
                        m("div", [m("span", m("b", "Official Role: ")), m("span", msg.d.officialRole)]),
                        m("div", [m("span", m("b", "Type: ")), m("span", msg.d.type[1])]),
                    ])

                } else {
                    return m("div", {"class": "w3-card w3-padding w3-margin"}, [
                        m("div", [m("span", m("h3", "Proof Received"))]),
                        m("div", [m("span", m("b", "From: ")), m("span", msg.ti)]),
                        m("div", [m("span", m("b", "To: ")), m("span", msg.d.si)]),
                        m("div", [m("span", m("b", "Credential: ")), m("span", msg.i)]),
                        m("br"),
                        m("div", [m("span", m("b", "LEI: ")), m("span", msg.d.LEI)]),
                        m("div", [m("span", m("b", "Type: ")), m("span", msg.d.type[1])]),
                    ])
                }
            }))
        ])
    }
};

let MINSNIFFSIZE = 30;

let sniff = (raw) => {
    let size = '';
    if (raw.length < MINSNIFFSIZE) {
        throw new Error('"Need more bytes."');
    }

    const versionPattern = Buffer.from(
        'KERI(?<major>[0-9a-f])(?<minor>[0-9a-f])(?<kind>[A-Z]{4})(?<size>[0-9a-f]{6})_',
        'binary',
    );
    const regex = RegExp(versionPattern);
    const response = regex.exec(raw);

    if (!response || response.kind > 12) throw new Error(`Invalid version string in raw = ${raw}`);
    size = response.groups.size;

    return parseInt(size, 16);
}

module.exports = Mailbox;