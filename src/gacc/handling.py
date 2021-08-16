import json

import falcon
from keri.app import keeping, habbing
from keri.core import scheming, coring
from keri.core.coring import Serder
from keri.db import basing
from keri.help import helping
from keri.peer import exchanging
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
                si="EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8",
                dt=helping.nowIso8601()
            )

            d |= {"personLegalName": req.media.get("personLegalName")} \
                if req.media.get("personLegalName") is not None else {}
            d |= {"officialRole": req.media.get("officialRole")} \
                if req.media.get("officialRole") is not None else {}
            d |= {"engagementContextRole": req.media.get("engagementContextRole")} \
                if req.media.get("engagementContextRole") is not None else {}

            saider = scheming.Saider(sed=d, code=coring.MtrDex.Blake3_256, idder=scheming.Ids.i)
            d["i"] = saider.qb64

            ref = scheming.jsonSchemaCache.resolve(schema)
            schemer = scheming.Schemer(raw=ref)
            jsonSchema = scheming.JSONSchema(resolver=scheming.jsonSchemaCache)

            cred = proving.credential(issuer="EUX0_NKihYcmvuTOSFnLcIf4xhAn0MaAI2FJoCN-gspc",
                                      schema=schemer.said,
                                      subject=d,
                                      typ=jsonSchema,
                                      source=source,
                                      status="ETQoH02zJRCTNz-Wl3nnkUD_RVSzSwcoNvmfa18AWt3M",)

            print(cred.pretty())

            serder = exchanging.exchange(route="/cmd/credential/issue", payload=dict(
                recipient="EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8",
                data=d,
                schema=schema
            ))

            msg = hab.sanction(serder=serder)
            ser = Serder(raw=msg)

            resp.status = falcon.HTTP_200
            resp.media = {
                "said": cred.said,
                "d": serder.ked['d'],
                "date": serder.ked['dt'],
                "attachment": msg[ser.size:].decode("utf-8"),
            }


class RevokeCredential:
    @staticmethod
    def on_post(req, resp):
        name = "controller"

        with basing.openDB(name=name, temp=False, reload=True) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

            print(req.media)
            print(req.media.get("said"))

            serder = exchanging.exchange(route="/cmd/credential/revoke", payload=dict(
                said=req.media.get("said"),
                regk="ETQoH02zJRCTNz-Wl3nnkUD_RVSzSwcoNvmfa18AWt3M",
            ))

            msg = hab.sanction(serder=serder)
            ser = Serder(raw=msg)

            resp.status = falcon.HTTP_200
            resp.media = {
                "d": serder.ked['d'],
                "date": serder.ked['dt'],
                "attachment": msg[ser.size:].decode("utf-8"),
            }


class PresentationRequest:

    @staticmethod
    def on_post(req, resp):
        name = "controller"

        with basing.openDB(name=name, temp=False) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

            ref = scheming.jsonSchemaCache.resolve(req.media.get("schema"))
            schemer = scheming.Schemer(raw=ref)

            pl = dict(
                schema=schemer.said,
                recipient="EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8"
            )

            excSrdr = exchanging.exchange(route="/cmd/presentation/request", payload=pl)
            excMsg = hab.sanction(excSrdr)

            ser = coring.Serder(raw=excMsg)

            resp.status = falcon.HTTP_200
            resp.media = {
                "data": json.dumps(ser.ked['d']),
                "date": excSrdr.ked['dt'],
                "attachment": excMsg[ser.size:].decode("utf-8"),
            }


class MailboxRequest:
    @staticmethod
    def on_post(req, resp):
        name = "controller"
        with basing.openDB(name=name, temp=False) as db, \
                keeping.openKS(name=name, temp=False) as ks:
            hab = habbing.Habitat(name=name, ks=ks, db=db, temp=False, create=False)

            msg = hab.query(pre=hab.pre, res="/mbx", sn=0)
            ser = coring.Serder(raw=msg)
            msg = hab.sanction(serder=ser)
            print(json.dumps(ser.ked))

            resp.status = falcon.HTTP_200
            resp.media = {
                "data": json.dumps(ser.ked),
                "date": helping.nowIso8601(),
                "attachment": msg[ser.size:].decode("utf-8"),
            }
