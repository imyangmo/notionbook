import {
    pageBlockFetcher,
    pageInfoFetcher,
} from '../../components/Fetchers'
import { pageParser } from "../../components/Parsers.js";
import { dateFormatter, iconMaker } from "../../components/Utils.js";
const pid = import.meta.env.DATABASE_ID

export async function get({ params }) {
    // const body = [
    //     {
    //         'title': 'introduction',
    //         'children': null
    //     },
    //     {
    //         'title': 'step 1',
    //         'children': [
    //             {
    //                 'title': 'step 1.1',
    //                 'children': null
    //             }
    //         ]
    //     }
    // ]

    async function contentFetcher(pid) {
        //-----fetch full page content
        let next_cursor = null;
        let pageContentRawResults = []
        while (true) {
            const pageContentRaw = await pageBlockFetcher(pid, next_cursor);
            pageContentRawResults.push(...pageContentRaw.results)
            if (pageContentRaw.has_more) {
                console.log("This page has more content, fetching...");
                next_cursor = pageContentRaw.next_cursor;
            } else {
                break;
            }
        }
        return pageContentRawResults
    }

    function tocHandler(content) {
        let body = []
        content.map(each => {
            if (each.type === 'child_page') {
                body.push({
                    'title': each.child_page.title,
                    'id': each.id,
                    'children': null
                })
            }
        })

        return body.length === 0 ? null : body
    }
    let body = []

    const level1 = tocHandler(await contentFetcher(pid))
    body.push(...level1)

    for (let i = 0; i < body.length; i++) {
        const level2 = tocHandler(await contentFetcher(body[i].id))
        body[i].children = level2

        if (body[i].children) {
            for (let j = 0; j < body[i].children.length; j++) {
                const level3 = tocHandler(await contentFetcher(body[i].children[j].id))
                body[i].children[j].children = level3
            }
        }
    }

    if (body.length === 0) {
        console.log("No pages found.")
    }

    return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "s-maxage=60"
        }
    })
}