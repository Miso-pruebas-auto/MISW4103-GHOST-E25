import Image from 'next/image';
import { SectionHeading } from '@/components';
import Link from 'next/link';

const reports = [
  {
    title: 'Kraken',
    href: '/frameworks/kraken',
    description:
      'Report of results after running resemblejs on Kraken applications',
  },
  {
    title: 'Playwright',
    href: '/frameworks/playwright',
    description:
      'Report of results after running resemblejs on Playwright applications',
  },
];

export default function Home() {
  return (
    <main className="flex text-foreground min-h-screen flex-col items-center justify-center p-24">
      <div className="w-1/2">
        <SectionHeading
          title="Results of ResembleJs"
          description="This is the result of running resemblejs on Kraken and Playwright applications"
        />
        <div className="overflow-hidden rounded-md bg-white shadow w-full">
          <ul role="list" className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <li key={index} className="px-6 py-4">
                <Link href={report.href}>
                  <span className="font-medium">{report.title}</span>
                </Link>
                <p className="text-foreground/70 text-sm">
                  {report.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
