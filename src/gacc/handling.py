import json

import falcon
import requests
from keri.app import keeping, habbing
from keri.core import scheming, coring
from keri.core.coring import Serder
from keri.db import basing
from keri.help import helping
from keri.peer import exchanging, httping
from keri.vc import proving


class IssueCredential:
    @staticmethod
    def on_post(req, resp):
        name = "controller"

        with basing.openDB(name=name, temp=False, reload=True) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

            schema = req.media.get("schema")
            source = req.media.get("source")

            types = ["VerifiableCredential", req.media.get("type")]

            d = dict(
                i="",
                type=types,
                LEI=req.media.get("LEI"),
            )

            d |= {"personLegalName": req.media.get("personLegalName")} \
                if req.media.get("personLegalName") is not None else {}
            d |= {"officialRole": req.media.get("officialRole")} \
                if req.media.get("officialRole") is not None else {}
            d |= {"engagementContextRole": req.media.get("engagementContextRole")} \
                if req.media.get("engagementContextRole") is not None else {}

            saider = scheming.Saider(sed=d, code=coring.MtrDex.Blake3_256, idder=scheming.Ids.i)
            d["i"] = saider.qb64

            cred = proving.credential(schema=schema,
                                      issuer="EYNHFK056fqNSG_MDE7d_Eqk0bazefvd4eeQLMPPNBnM",
                                      subject=d,
                                      source=source)

            print(cred.pretty())

            serder = exchanging.exchange(route="/cmd/credential/issue", payload=dict(
                recipient="EhYpYZSUAtiEurF7XngDB2mII2khY9ktlfqKHd1NHfNY",
                data=d,
                schema=schema
            ))
            msg = hab.sanction(serder=serder)
            ser = Serder(raw=msg)

            resp.status = falcon.HTTP_200
            resp.media = {
                "d": json.dumps(serder.ked['d']),
                "date": serder.ked['dt'],
                "attachment": msg[ser.size:].decode("utf-8"),
            }


class PresentationRequest:

    @staticmethod
    def on_post(req, resp):
        name = "controller"

        with basing.openDB(name=name, temp=False, reload=True) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

        pl = dict(
            recipient="EhYpYZSUAtiEurF7XngDB2mII2khY9ktlfqKHd1NHfNY",
            data=dict(
                input_descriptors=[
                    dict(x="Ek6vA-fVXDRbraVi7a9ydKStHiByUoF37Cgz4L58LWds")
                ]
            ),
            schema=req.media.get("schema")
        )

        serder = exchanging.exchange(route="/cmd/presentation/request", payload=pl)
        # noinspection DuplicatedCode
        msg = hab.sanction(serder=serder)
        ser = Serder(raw=msg)

        resp.status = falcon.HTTP_200
        resp.media = {
            "d": json.dumps(serder.ked['d']),
            "date": serder.ked['dt'],
            "attachment": msg[ser.size:].decode("utf-8"),
        }


class MailboxRequest:
    @staticmethod
    def on_post(req, resp):
        name = "controller"
        # with basing.openDB(name=name, temp=False) as db, \
        #         keeping.openKS(name=name, temp=False) as ks:
        #     hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)
        #
        #     msg = hab.query(pre=hab.pre, res="/mbx", sn=0)
        #
        #     ser = coring.Serder(raw=msg)
        #
        #     date = helping.nowIso8601()
        #     attachment = msg[ser.size:].decode("utf-8")
        #     response = requests.post("http://localhost:5623/req/mbx", data=json.dumps(ser.ked), headers={
        #         "CESR-DATE": date,
        #         "CESR-ATTACHMENT": attachment,
        #         "Content-Type": httping.CESR_CONTENT_TYPE
        #     })
        #     print(response)
        #     print(response.text)
