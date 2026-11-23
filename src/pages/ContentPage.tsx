import { JSX } from 'solid-js';
import { usePageMeta } from '../seo/usePageMeta';

export function ContentPage(props: {
  title: string;
  description: string;
  canonicalPath: string;
  children: JSX.Element;
}) {
  usePageMeta({ title: props.title, description: props.description, path: props.canonicalPath });
  return (
    <article class="max-w-3xl mx-auto text-left prose-content py-8 px-2">
      {props.children}
    </article>
  );
}