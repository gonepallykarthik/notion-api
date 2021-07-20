//env
const dotenv = require("dotenv").config();
//notion sdk
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.API_KEY,
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getcontent() {
  const requested = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };

  const { results } = await notion.request(requested);

  const loadedres = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      tags: page.properties.Tags.rich_text[0].text.content,
      date: page.properties.Date.date.start,
      completed: page.properties.Completed.checkbox,
    };
  });

  return loadedres;
};
