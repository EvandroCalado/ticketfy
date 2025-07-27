import Link from 'next/link';
import { Fragment } from 'react';

import { SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbProps = {
  title: string;
  href?: string;
};

type PageTitleProps = {
  title: string;
  breadcrumbs: BreadcrumbProps[];
};

export const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
  return (
    <div className='mx-auto w-full max-w-7xl space-y-2'>
      <h1 className='text-4xl font-semibold tracking-tighter'>{title}</h1>

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            let breadcrumbItem = (
              <BreadcrumbItem>{breadcrumb.title}</BreadcrumbItem>
            );

            if (breadcrumb.href) {
              breadcrumbItem = (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              );
            }

            return (
              <Fragment key={breadcrumb.title}>
                {breadcrumbItem}

                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
