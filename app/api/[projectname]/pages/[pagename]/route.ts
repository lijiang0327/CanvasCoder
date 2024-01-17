import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

type ParamsType = {params: {projectname: string, pagename: string}};

export const GET = async (req: NextRequest, {params: {projectname, pagename}}: ParamsType) => {
  const dirPath = process.env.PAGE_SAVE_PATH ?? './';
  const pagePath = path.join(dirPath, projectname, pagename)

  if (!fs.existsSync(pagePath)) {
    return Response.json({
      success: false,
      reason: 'project name or page name is invalid'
    })
  }

  const result = fs.readFileSync((pagePath), 'utf-8') ?? '{}';

  return Response.json({
    success: true,
    data: JSON.parse(result)
  })
}

export const DELETE = async (_: NextRequest, {params: {projectname, pagename}}: ParamsType) => {
  const dirPath = process.env.PAGE_SAVE_PATH ?? './';
  const pagePath = path.join(dirPath, projectname, pagename)

  if (!fs.existsSync(pagePath)) {
    return Response.json({
      success: false,
      reason: 'project name or page name is invalid'
    })
  }

  fs.rmSync(pagePath);

  return Response.json({
    success: true
  })
}
