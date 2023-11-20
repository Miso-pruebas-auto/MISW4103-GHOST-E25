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
import Link from 'next/link';

type PageProps = {
  params: {
    framework: Framework;
  };
};

const results = {
  kraken: krakenResults,
  playwright: playwrightResults,
};

const highlightScenarios = [
  'pages/create_a_new_page',
  'members/create_a_new_member_with_name_and_valid_mail',
  'posts/create_a_new_valid_post',
  'tags/create_a_new_valid_tag',
  'general_settings/change_site_name',

  'members/creación_de_miembro',
  'pages/Creación_página_y_publicarla',
  'post/Crear_un_nuevo_post_con_solo_título_y_descripción',
  'tags/Creación_de_tag_con_título_y_color',
  'settings/cambiar_el_site_title_con_otro_nombre',
];

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
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
        {images.map((image, index) => (
          <div className="text-center" key={index}>
            <span className="text-sm text-foreground/70">{image.title}</span>
            <div className="border rounded-md">
              <Image
                src={`/results/${framework}/${item.path}/${image.image}`}
                width={256}
                height={256}
                alt={image.title}
              />
            </div>
          </div>
        ))}
        <div className="relative lg:w-1/3 break-words">
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
      <AccordionTrigger>
        <span className="break-words w-80 text-left md:w-full">{title}</span>
      </AccordionTrigger>
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
  const [showAll, setShowAll] = useState(false);
  const items = results[params.framework];
  const grouped = groupBy(items, 'path');

  if (!results[params.framework]) {
    return notFound();
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between">
        <SectionHeading
          title={`Report of ${params.framework}`}
          description={`All related results after executing ResembleJs on ${params.framework}`}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" asChild>
            <Link href="/">Go Back</Link>
          </Button>
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show only selected' : 'Show all'}
          </Button>
        </div>
      </div>

      <Card className="px-6">
        <CardContent className="py-6 px-0">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(grouped)
              .filter(([key]) => showAll || highlightScenarios.includes(key))
              .map(([key, value], index) => (
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
