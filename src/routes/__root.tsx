import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import appCss from '../styles.css?url'
import { ThemeProvider } from '@/components/Global/ThemeProvider'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'KAUBuddy',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: 'https://fav.farm/🔥',
        type: 'image/x-icon'
      }
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen w-full bg-black bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px]">
        {/* <body className='bg-black'>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <DotGrid
            dotSize={5}
            gap={20}
            baseColor="#ffffff11"
            activeColor="#4C763B"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            className='absolute'
          />
        </div> */}
        {/* The app currently only supports light mode */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
