import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, {params}: {params: {projectname: string}}) => {
  const projectName = params.projectname;
  const pageSavePath = process.env.PAGE_SAVE_PATH ?? './';

  if (!projectName) {
    return Response.json({
      success: false,
      reason: 'project name is invalid'
    })
  }

  try {
    const filePaths = fs.readdirSync(path.join(pageSavePath, projectName), 'utf-8');
    return Response.json({
      success: true,
      data: filePaths.filter((path) => path.endsWith('.json'))
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      reason: (error as Error).message
    });
  }
}

export const POST = async (req: NextRequest, {params}: {params: {projectname: string}}) => {
  const data = await req.json();
  const projectName = params.projectname;
  const pageSavePath = process.env.PAGE_SAVE_PATH ?? './';

  if (!projectName) {
    return Response.json({
      success: false,
      reason: 'project name is invalid'
    })
  }

  if (!data.title) {
    return Response.json({
      success: false,
      reason: 'page name is required'
    })
  }

  const fullFileName = `${data.title}.json`;

  const projectPath = path.join(pageSavePath, projectName);

  if (!fs.existsSync(projectPath)) {
    return Response.json({
      success: false,
      reason: 'project is not exist'
    })
  }

  fs.writeFileSync(path.join(projectPath, fullFileName), JSON.stringify(data, null, 4), 'utf-8');

  return Response.json({
    success: true,
  })
}
