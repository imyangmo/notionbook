import {
    pageBlockFetcher,
    pageInfoFetcher,
} from '../../../components/Fetchers'
import { pageParser } from "../../../components/Parsers.js";
import { dateFormatter, iconMaker, listMergerHandler, tocGenerator } from "../../../components/Utils.js";



export async function get({ params }) {
    // console.log(params)
    const pid = params.pid;

    const pageMetaData = await pageInfoFetcher(pid);
    // ------
    let pageCover = "";
    if (pageMetaData.cover) {
        if (pageMetaData.cover.type === 'external') {
            pageCover = pageMetaData.cover.external.url;
        } else if (pageMetaData.cover.type === 'file') {
            pageCover = pageMetaData.cover.file.url;
        }
    }
    // ------
    const { date: createdDate, time: createdTime } = dateFormatter(
        pageMetaData.created_time
    )
    // ------
    let next_cursor = null;
    let fullPageContents = [];
    while (true) {
        const pageContentData = await pageBlockFetcher(pid, next_cursor);
        const pageParsedData = await pageParser(pageContentData);
        fullPageContents.push(...pageParsedData);
        if (pageContentData.has_more) {
            console.log("This page has more content, fetching...");
            next_cursor = pageContentData.next_cursor;
        } else {
            break;
        }
    }
    fullPageContents = listMergerHandler(fullPageContents);
    // ------
    fullPageContents.forEach((item) => {
        if (item.type == "table_of_contents") {
            item.listItems = tocGenerator(fullPageContents);
        }
    });

    // ------
    const body = {
        pageCover: pageCover,
        pageIcon: iconMaker(pageMetaData),
        pageTitle: pageMetaData.properties.title.title.length === 0 ? 'untitled' : pageMetaData.properties.title.title[0].plain_text,
        createdDate: createdDate,
        createdTime: createdTime,
        pageContent: fullPageContents
    }

    return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "s-maxage=60"
        }
    })
}