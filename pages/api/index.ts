// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {OEnum, OObjectType, OStandardType} from "@element-ts/oxygen";

type Res = {err: string} | {};

// https://api.zotero.org/<groups | users>/<id>/collections?limit=1000
// gets all folders recursively

// https://api.zotero.org/<groups | users>/<id>/collections/<collection-id>/collections?limit=1000
// gets all folders recursively after this folder

// https://api.zotero.org/users/8004307/collections/F3ESK9DV/items?format=bibtex
// https://api.zotero.org/users/<user-id>>/collections/<collection-id>/items?format=bibtex
// ask if json or bibtex

// groups
// https://api.zotero.org/groups/<group-id>/collections?limit=1000 this gets ALL folders
// ask if json or bibtex

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {

	const config = OObjectType.follow({
		ownerType: OEnum.any("user", "group"),
		format: OEnum.any("bibtex", "json"),
		mode: OEnum.any("single", "recursive"),
		ownerId: OStandardType.string,
		collectionId: OStandardType.string
	}).verify(req.query);

	if (!config) return res.status(400).json({err: "Invalid request, go to zotero.overleaf.xyz to build a API request."});


	res.status(200).json(config);
}
