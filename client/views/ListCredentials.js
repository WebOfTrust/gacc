let m = require("mithril");
const persist = require("../helpers/local_storage");

let Credential = {
    view: function (vnode) {
        let cred = JSON.parse(vnode.attrs.cred)
        return m("div", {"class": "w3-card w3-padding w3-margin"}, [
            m("button", {
                "class": "w3-button w3-right w3-red",
                onclick: function () {
                    // noinspection JSUnresolvedVariable
                    m.request({
                        "method": "POST",
                        "url": GACC_SERVER_URL + "/revoke/credential",
                        "body": {
                            "id": cred["data"]["i"],
                        },
                    }).then(res => {
                        persist.removeCredential(cred["data"]["i"])
                        // noinspection JSUnresolvedVariable
                        m.request({
                            "method": "POST",
                            "url": CONTROLLER_URL + "/exn/cmd/credential/revoke",
                            "headers": {
                                "CESR-DATE": res['date'],
                                "CESR-ATTACHMENT": res['attachment'],
                                "Content-Type": "application/cesr+json"
                            },
                            "body": JSON.parse(res['d'])
                        }).catch(e => {
                            console.log(e);
                        })
                    }).catch(e => {
                        console.log(e)
                    })
                }
            }, "Revoke"),
            m("div", [m("span", m("b", "To: ")), m("span", cred["recipient"])]),
            m("div", [m("span", m("b", "Credential: ")), m("span", cred["data"]["i"])]),
            m("br"),
            m("div", [m("span", m("b", "LEI: ")), m("span", cred["data"]["LEI"])]),
            m("div", [m("span", m("b", "Type: ")), m("span", cred["data"]["type"][1])]),
        ])
    }
}

let creds = []
let ListCredentials = {
    oninit: function () {
        Object.keys(localStorage).filter(function (key) {
            return key.indexOf("credential.") >= 0;
        }).map(function (key) {
            creds.unshift(localStorage.getItem(key));
        });
    },
    view: function () {
        return m("main", {"class": "w3-container w3-margin"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "Issued Credentials")
            ]),
            m("div", {"class": "w3-container"}, creds.map(cred => {
                return m(Credential, {"cred": cred})
            }))
        ])
    }
};

module.exports = ListCredentials;