import path from 'path';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const GET = async () => {
  const saveDir = process.env.PAGE_SAVE_PATH ?? './';
  
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir);
  }

  const dirs = fs.readdirSync(saveDir);


  const projects = dirs.filter((dir) => {
    const stats = fs.statSync(path.join(saveDir, dir));

    return stats.isDirectory();
  })

  return Response.json({
    success: true,
    data: projects
  })
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const projectName = body.projectName;
  const saveDir = process.env.PAGE_SAVE_PATH ?? './';

  const dirs = fs.readdirSync(saveDir);

  const projectPaths = dirs.filter((dir) => {
    const stats = fs.lstatSync(path.join(saveDir, dir));

    return stats.isDirectory();
  });

  if (projectPaths.includes(projectName)) {
    return Response.json({
      success: false,
      reason: 'The project name has already been used'
    })
  }

  fs.mkdirSync(path.join(saveDir, projectName));

  return Response.json({
    success: true,
  })
}

export const DELETE = async (request: NextRequest) => {
  const projectName = request.nextUrl.searchParams.get('projectName');
  const saveDir = process.env.PAGE_SAVE_PATH ?? './';

  if (!projectName) {
    return Response.json({
      success: false,
      reason: 'projectName is required'
    })
  }

  const projectPath = path.join(saveDir, projectName);

  if (!fs.existsSync(projectPath)) {
    return Response.json({
      success: false,
      reason: 'project not exist'
    })
  }

  fs.rmdirSync(projectPath, {recursive: true});

  return Response.json({
    success: true,
  })
}
