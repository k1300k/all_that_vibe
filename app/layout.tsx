import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Planner's Lego - AI 서비스 기획 플랫폼",
    description: '노드 기반 UI로 AI 프롬프트를 조립하여 기획 산출물을 자동 생성하는 플랫폼',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
