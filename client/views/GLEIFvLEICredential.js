let m = require("mithril");

let GLEIFvLEICredential = {
    view: function () {
        return m("main", {"class": "w3-margin w3-card"}, [
            m("div", {"class": "w3-container w3-teal"}, [
                m("h5", "GLEIF vLEI Credential")
            ]),
            m("div", {"class": "w3-panel w3-leftbar w3-light-grey w3-margin"}, [
                m("p", {"class": "w3-serif"}, "The vLEI Credential issued to GLEIF")
            ]),
            m("div",
                [
                    m("form", {"class": "w3-container w3-margin-top"},
                        [m("p"),
                            m("label", "Legal Entity Identifier"),
                            m("input[readonly=true][value=506700GE1G29325QX363]", {
                                "class": "w3-input w3-border w3-light-grey w3-text-blue-grey",
                                "type": "text"
                            }),
                            m("button", {
                                "class": "w3-btn w3-blue-grey w3-margin-top w3-margin-bottom",
                                onclick: function () {
                                    // noinspection JSUnresolvedVariable
                                    m.request({
                                        "method": "POST",
                                        "url": GACC_SERVER_URL + "/issue/credential",
                                        "body": {
                                            "LEI": "506700GE1G29325QX363",
                                            "schema": "E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4",
                                            "type": "GLEIFvLEICredential"
                                        },
                                    }).then(res => {
                                        // noinspection JSUnresolvedVariable
                                        console.log(JSON.parse(res['d']))
                                        m.request({
                                            "method": "POST",
                                            "url": CONTROLLER_URL + "/exn/cmd/credential/issue",
                                            "headers": {
                                                "CESR-DATE": res['date'],
                                                "CESR-ATTACHMENT": res['attachment'],
                                                "Content-Type": "application/cesr+json"
                                            },
                                            "body": JSON.parse(res['d'])
                                        }).catch(e => {
                                            console.log(e)
                                        })
                                    }).catch(e => {
                                        console.log(e)
                                    })
                                }
                            }, "Issue")
                        ]
                    )
                ]
            ),
        ])
    }
};

module.exports = GLEIFvLEICredential;