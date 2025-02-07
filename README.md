# Next.js Blog with TypeScript and Markdown

A statically generated blog using Next.js, TypeScript, and Markdown files as the data source. To start the development server, run:

```bash
npm run dev
```

## Features

- Static Generation using Next.js
- Posts written in Markdown
- TypeScript support
- Uses [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) for Markdown processing
- Post metadata handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter)
- Styling with [Tailwind CSS](https://tailwindcss.com) (v3.0)

## Writing Posts

The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will automatically create a new blog post.
