import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const imagesPath = process.env.IMAGE_SAVE_PATH as string;

  const files = await fs.readdir(imagesPath);

  return Response.json({
    success: true,
    data: files.map((file) => {
      return path.join('/api/images/', file);
    }),
  })
}

export const POST = async (req: NextRequest) => {
  const imagesPath = process.env.IMAGE_SAVE_PATH as string;
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return Response.json({
      success: false,
      reason: 'file can not be empty'
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  try {
    await fs.writeFile(path.join(imagesPath, fileName), buffer);

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      reason: (error as Error).message
    })
  }
}
