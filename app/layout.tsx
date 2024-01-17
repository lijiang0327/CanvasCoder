import type { Metadata } from 'next'

import './globals.css'
import StyledComponentsRegistry from '@/components/AntdRegistry';

export const metadata: Metadata = {
  title: 'CanvasEditor',
  description: 'Canvas Editor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="p-0 m-0">
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
