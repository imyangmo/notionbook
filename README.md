<h1 align="center">NotionBook (Beta)</h1>
<p align="center">
  <i>NotionBook helps you transform a Notion page into a Gitbook-like wiki site.</i>
   <br/>
  <img width="120" src="./logo.png" />
  <br/>
  <b><a href="https://nb.dreambulare.com/">Showcase & Documentation</a></b> | <b><a href="https://github.com/imyangmo/notionbook">GitHub</a></b>
  <br/><br/>
</p>

## What is NotionBook and why NotionBook
Many of us have had needs to write some documents, maybe for a project, maybe even for yourself as some kind of knowleage management system.

There was plenty of good free and open-source projects, one of them is Gitbook. I've tried some, but I am not going explain why I don't use them anymore here.

NotionBook uses Notion as writing platform, and transforms a Notion page into a Gitbook-like wiki site. It:
 - Has better writing experience: Because it uses Notion, one of the best writing platform I've ever used;
 - Supports most of the styles: It can displays your documents more wiki-like;
 - Is Free & Open-source
 - Controls by You: You are one hosting your site.

Please take note: 
I am not a professional developer, this project was written as a hobby.
You are more than welcome to make this project better.

NotionBook is an variant of [NotionPaper](https://github.com/imyangmo/notionpaper_ssr).


## How to use
### Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimyangmo%2Fnotionbook&env=DATABASE_ID,NOTION_TOKEN,THEME)

Click button above to deploy on Vercel.

Currently there is only one theme to use, so put 'daisyui' on the `THEME` environment variable.

Tutorials can be found on [here](https://npdocs.dreambulare.com/post/fd7a3ccb-357f-4b21-ad07-c17a5dfd54af).

## Supported Features / Roadmap
<table>
    <tr>
        <th>Category</th>
        <th>Features</th>
        <th>Support Status</th>
        <th>Remarks</th>
    </tr>

<tr>
    <td rowspan="3">Site</td>
    <td>Site name</td>
    <td>✅</td>
    <td>Uses database title as site name</td>
</tr>
    <tr>
        <td>Site description</td>
        <td>✅</td>
        <td>Uses database description as site description</td>
    </tr>
    <tr>
        <td>Site favicon</td>
        <td>✅</td>
        <td>Uses database icon as site icon</td>
    </tr>

<tr>
    <td rowspan="3">Page</td>
    <td>Page cover</td>
    <td>✅</td>
    <td>Uses page cover. ** Please noted **, external images will not be hosted for security reasons</td>
</tr>
    <tr>
        <td>Page favicon</td>
        <td>✅</td>
        <td></td>
    </tr>
    <tr>
        <td>Page Tags</td>
        <td>✅</td>
        <td>Supported tag display on page, but need to improve.</td>
    </tr>

<tr>
    <td rowspan="22">Blocks</td>
    <td>Table of Contents</td>
    <td>✅</td>
    <td></td>
</tr>
    <tr>
        <td>Rich Texts</td>
        <td>✅</td>
        <td>Supports all anotations and text colors</td>
    </tr>
    <tr>
        <td>Divider</td>
        <td>✅</td>
        <td></td>
    </tr>
    <tr>
        <td>Paragraphs</td>
        <td>✅</td>
        <td></td>
    </tr>
    <tr>
        <td>Headings</td>
        <td>✅</td>
        <td></td>
    </tr>
    <tr>
        <td>Table</td>
        <td>✅</td>
        <td></td>
    </tr>
    <tr>
        <td>Images</td>
        <td>✅</td>
        <td>Supports uploads and externals. External images will not be hosted for security reasons</td>
    </tr>   
    <tr>
        <td>Videos</td>
        <td>✅</td>
        <td>Supports uploads, externals, and Youtube videos. External videos will not be hosted for security reasons</td>
    </tr> 
    <tr>
        <td>Code</td>
        <td>✅</td>
        <td></td>
    </tr> 
    <tr>
        <td>Bulleted and numbered lists</td>
        <td>✅</td>
        <td></td>
    </tr> 
    <tr>
        <td>Quote</td>
        <td>✅</td>
        <td></td>
    </tr> 
    <tr>
        <td>Callout</td>
        <td>✅</td>
        <td>Supported, but texts only, needs to improve.</td>
    </tr> 
    <tr>
        <td>Child pages</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Embed</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Mention</td>
        <td>📅 Planned</td>
        <td>Including mentioned page and person</td>
    </tr> 
    <tr>
        <td>File</td>
        <td>✅</td>
        <td>Uploaded files only</td>
    </tr> 
    <tr>
        <td>PDF</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Bookmark</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Equation</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Breadcrumb</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Columns</td>
        <td>📅 Planned</td>
        <td></td>
    </tr> 
    <tr>
        <td>Nested blocks</td>
        <td>✅</td>
        <td>Children blocks</td>
    </tr> 
<tr>
    <td rowspan="4">Expandability</td>
    <td>Custom styles / Themes</td>
    <td>✅</td>
    <td>You could design and apply your own or others' theme</td>
</tr>
    <tr>
        <td>Custom pages</td>
        <td>📅 Planned</td>
        <td></td>
    </tr>
    <tr>
        <td>Search</td>
        <td>📅 Planned</td>
        <td></td>
    </tr>
    <tr>
        <td>i18n</td>
        <td>📅 Planned</td>
        <td></td>
    </tr>
</table>



## Update Notes
**2023.8.22**
- ADD: Google Analytics 4 support
- OPTI: SEO optimization
- FIX: fixed vercel code display issue



Notes histories see [here](./UpdateNotes.md).
