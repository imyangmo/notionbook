import {
    pageBlockFetcher,
    pageInfoFetcher,
} from '../../components/Fetchers'
import { pageParser } from "../../components/Parsers.js";
import { dateFormatter, iconMaker } from "../../components/Utils.js";
const DATABASE_ID = import.meta.env.DATABASE_ID


export async function get({ params }) {
    // console.log(params)
    const pid = DATABASE_ID
    const pageMetaData = await pageInfoFetcher(pid);

    // ------



    // ------
    const body = {
        siteIcon: iconMaker(pageMetaData),
        siteTitle: pageMetaData.properties.title.title[0].plain_text,
    }

    return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "s-maxage=60"
        }
    })
}