import path from 'path';
import fs from 'fs/promises';
import {NextRequest, NextResponse} from 'next/server';

type ParamsType = {
  imageName: string
}

export const GET = async (req: NextRequest, {params}: {params: ParamsType}) => {
  const {imageName} = params;
  const imagesPath = process.env.IMAGE_SAVE_PATH as string;

  try {
    const image = fs.readFile(path.join(imagesPath, imageName));

    const response = new NextResponse((await image).buffer);
    response.headers.set('content-type', 'image/png');

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      reason: (error as Error).message
    })
  }
}

export const DELETE = async (req: NextRequest, {params}: {params: ParamsType}) => {
  const {imageName} = params;
  const imagesPath = process.env.IMAGE_SAVE_PATH as string;

  try {
    await fs.rm(path.join(imagesPath, imageName));

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
