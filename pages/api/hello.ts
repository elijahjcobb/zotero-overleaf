// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

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

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({ name: 'John Doe' })
}
