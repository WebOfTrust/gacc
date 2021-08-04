let m = require("mithril");

let Recipient = {
    view: function () {
        return m("div", {"class": "w3-container w3-margin-bottom"}, [
            m("label", "Recipient: (Han)"),
            m("input[readonly=true][value=EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8]", {
                "class": "w3-input w3-border w3-light-grey",
                "type": "text"
            })
        ])
    }
}

module.exports = Recipient;