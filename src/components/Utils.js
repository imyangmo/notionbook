import url from 'node:url';

export const dateFormatter = (input) => {
    let result = {
        date: '',
        time: ''
    };
    const timePattern = /(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d/g;
    const datePattern = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/g;

    const time = input.match(timePattern);
    const date = input.match(datePattern);

    if (time != null) {
        result.time = time[0]
    };

    if (date != null) {
        result.date = date[0]
    };

    return result;

};

export function youtubeParser(addr) {
    // modified from: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = addr.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
}

export function fileExtNameParser(addr) {
    const thisurl = new URL(addr);
    const urlPath = thisurl.pathname;

    const regExp = /\.[0-9a-z]+$/i;
    const match = urlPath.match(regExp);
    return match == null ? '' : match[0]
}

export function iconMaker(data) {
    if (data.icon !== null) {
        switch (data.icon.type) {
            case 'emoji':
                return 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>' + data.icon.emoji + '</text></svg>'
                break;
            case 'file':
                return data.icon.file.url;
                break;
            case 'external':
                return data.icon.external.url;
                break;
            default:
                break;
        }
    }
}

function listMerger(pageContents) {
    console.log("Merging list items...");
    let tmp = [];

    let index = 0;
    while (index < pageContents.length) {
        if (
            pageContents[index].type != "numbered_list_item" &&
            pageContents[index].type != "bulleted_list_item"
        ) {
            // current item is not a list block, copy and skip
            tmp.push(pageContents[index]);
            index += 1;
        } else {
            // current item is a list block
            try {
                tmp.at(-1).type;
            } catch (error) {
                // if there is no item in the new list, means it is the first item from the old list, append it anyways
                tmp.push({
                    type: pageContents[index].type + "_group",
                    origin_type: pageContents[index].type,
                    items: [pageContents[index]],
                    children: false,
                    // list gourp should not have children, only list item has children
                });
                index += 1;
                continue;
            }
            // if the new list not empty
            if (tmp.at(-1).type == pageContents[index].type + "_group") {
                // if the last item from the new list is as same as the current item from the old list
                tmp.at(-1).items.push(pageContents[index]);
                index += 1;
            } else {
                // means current item is a new list type
                tmp.push({
                    type: pageContents[index].type + "_group",
                    origin_type: pageContents[index].type,
                    items: [pageContents[index]],
                    children: false,
                });
                index += 1;
            }
        }
    }
    return tmp;
}

export function listMergerHandler(pageContents) {
    const mergedContent = listMerger(pageContents);
    mergedContent.forEach((block) => {
        if (
            block.type == "numbered_list_item_group" ||
            block.type == "bulleted_list_item_group"
        ) {
            block.items.forEach((item) => {
                if (item.children != false) {
                    const result = listMergerHandler(item.children);
                    item.children = result;
                }
            });
        }
    });
    return mergedContent;
}

export function tocGenerator(pageContents) {
    console.log("Generating table of contents...");
    const headingTypes = ["heading_1", "heading_2", "heading_3"];
    const headingLevel = {
        heading_1: 1,
        heading_2: 2,
        heading_3: 3,
    };

    let listItems = [];
    pageContents.forEach((item) => {
        if (headingTypes.includes(item.type)) {
            const text = item.text.map((span) => span.content);
            listItems.push({
                level: headingLevel[item.type],
                id: item.id,
                text: text.join(""),
            });
        }
    });
    return listItems;
}