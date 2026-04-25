import React from "react"
import {
  AgilityPic,
  ImageField,
  URLField,
  UnloadedModuleProps,
} from "@agility/nextjs"
import Link from "next/link"
import { getContentItem } from "lib/cms/getContentItem"

interface IHeroBanner {
  heading: string
  subHeading: string
  image: ImageField
  primaryButton: URLField
  
}

const HeroBanner = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<IHeroBanner>({
    contentID: module.contentid,
    languageCode,
  })

  // check if URL is absolute
  const isUrlAbsolute = (url: string) =>
    url.indexOf("://") > 0 || url.indexOf("//") === 0

  // generate proper link
  const generateLink = (url: string, target: string, text: string) => {
    if (!isUrlAbsolute(url)) {
      return (
        <Link
          data-agility-field="primaryButton"
          href={url}
          title={text}
          target={target}
          className="inline-block mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 transition ease-in-out duration-150"
        >
          {text}
        </Link>
      )
    } else {
      return (
        <a
          data-agility-field="primaryButton"
          href={url}
          title={text}
          target={target}
          className="inline-block mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 transition ease-in-out duration-150"
        >
          {text}
        </a>
      )
    }
  }

  

  return (
    <section
      className="relative px-8 py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors duration-300"
      data-agility-component={contentID}
    >
      <div className="max-w-(--breakpoint-xl) mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT: TEXT */}
        <div className="text-center md:text-left">
          <h1
            data-agility-field="heading"
            className="font-display text-4xl md:text-5xl font-black text-secondary-500 dark:text-secondary-200 tracking-wide"
          >
            {fields.heading}
          </h1>

          <p
            data-agility-field="subHeading"
            className="mt-4 text-base md:text-lg font-medium leading-relaxed text-secondary-200 dark:text-gray-300"
          >
            {fields.subHeading}
          </p>

          {fields.primaryButton &&
            generateLink(
              fields.primaryButton.href,
              fields.primaryButton.target,
              fields.primaryButton.text
            )}
        </div>

        {/* RIGHT: IMAGE */}
        <div data-agility-field="image" className="relative">
          <AgilityPic
            image={fields.image}
            className="rounded-lg object-cover object-center shadow-lg"            
            fallbackWidth={900}
            sources={[
              { media: "(min-width: 1280px)", width: 1200 },
              { media: "(min-width: 640px)", width: 900 },
              { media: "(max-width: 639px)", width: 640 },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
