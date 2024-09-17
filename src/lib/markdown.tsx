import React, { ComponentPropsWithoutRef } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkProps {
  children: string
  components?: Record<string, React.ElementType> // Bileşenleri geçersiz kılmak için prop
}

const CustomH1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 style={{ color: 'blue' }}>{children}</h1>
)

const CustomH2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ color: 'green' }}>{children}</h2>
)

const CustomParagraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-base font-normal leading-6 text-neutral-600 md:text-lg md:leading-7">
    {children}
  </p>
)

const CustomLink: React.FC<ComponentPropsWithoutRef<'a'>> = ({
  children,
  href = '#',
  ...props
}) => (
  <a
    href={href}
    style={{ color: 'orange' }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
)

export default function Mark({ children, components }: MarkProps) {
  const defaultComponents = {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomParagraph,
    a: CustomLink,
  }

  const mergedComponents = { ...defaultComponents, ...components }

  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      // @ts-expect-error: This is a known issue due to type mismatch.
      components={mergedComponents}
    >
      {children}
    </Markdown>
  )
}
