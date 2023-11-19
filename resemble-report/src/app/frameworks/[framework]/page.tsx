'use client';

import { SectionHeading } from '@/components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { krakenResults, playwrightResults } from '@/lib/utils';
import { Framework } from '@/types/common';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ResembleResult } from '@/types/resemble';
import { useState } from 'react';
import groupBy from 'lodash/groupBy';

type PageProps = {
  params: {
    framework: Framework;
  };
};

const results = {
  kraken: krakenResults,
  playwright: playwrightResults,
};

function ComparableItem({
  item,
  framework,
}: {
  item: ResembleResult;
  framework: Framework;
}) {
  const mainImage = item.compare.split('/').pop()?.split('.')[0];
  const fromImage = `${mainImage}-from.png`;
  const toImage = `${mainImage}-to.png`;
  const krakenVersionFrom = item.from.split('/')[1];
  const krakenVersionTo = item.to.split('/')[1];

  const images = [
    {
      title: krakenVersionFrom,
      image: fromImage,
    },
    {
      title: krakenVersionTo,
      image: toImage,
    },
    {
      title: 'Diff',
      image: item.compare,
    },
  ];

  return (
    <li className="py-4">
      <div className="flex flex-row space-x-4">
        {images.map((image, index) => (
          <div className="text-center" key={index}>
            <span className="text-sm text-foreground/70">{image.title}</span>
            <div className="border rounded-md">
              <Image
                src={`/results/${framework}/${item.path}/${image.image}`}
                width={256}
                height={256}
                alt="something"
              />
            </div>
          </div>
        ))}
        <div className="relative w-1/3 break-words">
          <span className="text-sm font-medium">Analysis</span>
          <p className="text-sm">
            The second image is{' '}
            <span className="font-medium">{item.data.misMatchPercentage}%</span>{' '}
            different compared to the first.
          </p>
        </div>
      </div>
    </li>
  );
}

type ScenarioItemProps = {
  framework: Framework;
  title: string;
  items: ResembleResult[];
};

function ScenarioItem({ title, items, framework }: ScenarioItemProps) {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const endOffset = offset + itemsPerPage;
  const currentItems = items.slice(offset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const onClickPrevious = () => {
    const newOffset = ((page - 1) * itemsPerPage) % items.length;
    setPage(page - 1);
    setOffset(newOffset);
  };

  const onClickNext = () => {
    const newOffset = ((page + 1) * itemsPerPage) % items.length;
    setPage(page + 1);
    setOffset(newOffset);
  };

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <ul role="list" className="divide-y">
          {currentItems.map((item, index) => (
            <ComparableItem item={item} framework={framework} key={index} />
          ))}
        </ul>

        <div className="flex w-full justify-between py-4">
          <Button onClick={onClickPrevious} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={onClickNext} disabled={page === pageCount}>
            Next
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function Page({ params }: PageProps) {
  const items = results[params.framework];
  const grouped = groupBy(items, 'path');

  if (!results[params.framework]) {
    return notFound();
  }

  return (
    <div className="container py-10">
      <SectionHeading
        title={`Report of ${params.framework}`}
        description={`All related results after executing ResembleJs on ${params.framework}`}
      />

      <Card className="px-6">
        <CardContent className="py-6 px-0">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(grouped).map(([key, value], index) => (
              <ScenarioItem
                title={key}
                items={value}
                framework={params.framework}
                key={index}
              />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
