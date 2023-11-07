import { Client } from '@notionhq/client';
import NotionPost from '@/components/NotionPost';

export default function Notion({ dbQueryData, page_id }) {
  return (
    <>
      {dbQueryData.results.map((data, index) => (
        <NotionPost data={data} index={index} page_id={page_id[index]} key={index} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const notion = await new Client({
    auth: process.env.NOTION_ACCESS_TOKEN,
    notionVersion: process.env.NOTION_VERSION,
  });
  const databaseId = process.env.NOTION_DATABASE_ID;
  // proterties들을 불러온다.
  // 각 요소의 result.id를 markdown으로 변환
  // 목록(/notion)에 제목,설명,date 표시 클릭-> 상세페이지 이동 (page_id와 함께)
  const dbQueryData = await notion.databases.query({ database_id: databaseId });

  const page_id = dbQueryData.results.map((id) => id.id);
  //const blockData = await notion.blocks.retrieve({ block_id: page_id[0] });

  return {
    props: {
      page_id: page_id,
      dbQueryData: dbQueryData,
    },
  };
}

// https://github.com/remarkjs/remark/blob/main/packages/remark/index.js

// const dbf = async () => {
//   const notion = await new Client({
//     auth: 'secret_5n7IfP0tPpa6SWRaBP5UlAzoAHIML4h8X055EzJn7AB',
//     notionVersion: '2022-06-28',
//   });

//   const databaseId = '3c1b9961a5cf4961aec7855584d51d97';
//   const dbObjects = await notion.databases.retrieve({ database_id: databaseId });
//   const dbQueryData = await notion.databases.query({ database_id: databaseId });
//   console.log(dbObjects);
// };
