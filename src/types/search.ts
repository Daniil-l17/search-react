export interface Search {
  kind: string
  url: Url
  queries: Queries
  context: Context
  searchInformation: SearchInformation
  items: Item[]
}

export interface Url {
  type: string
  template: string
}

export interface Queries {
  request: Request[]
  nextPage: NextPage[]
}

export interface Request {
  title: string
  totalResults: string
  searchTerms: string
  count: number
  startIndex: number
  language: string
  inputEncoding: string
  outputEncoding: string
  safe: string
  cx: string
}

export interface NextPage {
  title: string
  totalResults: string
  searchTerms: string
  count: number
  startIndex: number
  language: string
  inputEncoding: string
  outputEncoding: string
  safe: string
  cx: string
}

export interface Context {
  title: string
}

export interface SearchInformation {
  searchTime: number
  formattedSearchTime: string
  totalResults: string
  formattedTotalResults: string
}

export interface Item {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  htmlSnippet: string
  formattedUrl: string
  htmlFormattedUrl: string
  pagemap: Pagemap
}

export interface Pagemap {
  metatags: Metatag[]
  cse_thumbnail?: CseThumbnail[]
  xfn?: Xfn[]
  webpage?: Webpage[]
  cse_image?: CseImage[]
  wpheader?: Wpheader[]
  sitenavigationelement?: Sitenavigationelement[]
  newsarticle?: Newsarticle[]
  wpsidebar?: Wpsidebar[]
  hcard?: Hcard[]
  imageobject?: Imageobject[]
  organization?: Organization[]
  postaladdress?: Postaladdress[]
  videoobject?: Videoobject[]
  itemlist?: Itemlist[]
  thing?: Thing[]
  article?: Article[]
}

export interface Metatag {
  referrer?: string
  "og:image"?: string
  "theme-color"?: string
  "og:image:width"?: string
  "og:type"?: string
  viewport: string
  "og:title"?: string
  "og:image:height"?: string
  "format-detection"?: string
  "msapplication-tilecolor"?: string
  "msapplication-starturl"?: string
  "application-name"?: string
  "og:site_name"?: string
  "apple-mobile-web-app-title"?: string
  "msapplication-tileimage"?: string
  "apple-mobile-web-app-status-bar-style"?: string
  "msapplication-allowdomainapicalls"?: string
  "twitter:site"?: string
  "apple-mobile-web-app-capable"?: string
  "twitter:card"?: string
  "article:published_time"?: string
  "og:description"?: string
  "twitter:creator"?: string
  "twitter:image:alt"?: string
  "article:modified_time"?: string
  "og:image:alt"?: string
  "twitter:title"?: string
  "article:author"?: string
  "facebook-domain-verification"?: string
  "twitter:image:src"?: string
  "article:tag"?: string
  "fb:app_id"?: string
  "twitter:description"?: string
  "mobile-web-app-capable"?: string
  "og:locale"?: string
  "og:url"?: string
  "twitter:url"?: string
  "og:keywords"?: string
  "fb:pages"?: string
  "twitter:image"?: string
  "relap:article"?: string
  timestamp?: string
  "article:section"?: string
  "twitter:creator:id"?: string
  google?: string
  "yandex-verification"?: string
}

export interface CseThumbnail {
  src: string
  width: string
  height: string
}

export interface Xfn {}

export interface Webpage {
  inlanguage: string
  maincontentofpage?: string
  name: string
}

export interface CseImage {
  src: string
}

export interface Wpheader {
  inlanguage: string
  name: string
  url: string
}

export interface Sitenavigationelement {
  name: string
  url: string
  inlanguage?: string
}

export interface Newsarticle {
  image?: string
  name: string
  url: string
  datepublished: string
}

export interface Wpsidebar {
  inlanguage: string
  url: string
}

export interface Hcard {
  url_text: string
  bday: string
  fn: string
  nickname: string
  label: string
  url: string
}

export interface Imageobject {
  width: string
  name?: string
  url: string
  height: string
  contenturl?: string
  position?: string
  datepublished?: string
}

export interface Organization {
  name: string
  url?: string
  founder?: string
  telephone?: string
  faxnumber?: string
  email?: string
  sameas?: string
}

export interface Postaladdress {
  addresslocality: string
  postalcode: string
  streetaddress: string
}

export interface Videoobject {
  duration: string
  thumbnail: string
  contenturl: string
  uploaddate: string
  name: string
  description: string
  position: string
  url: string
  datepublished: string
  thumbnailurl: string
}

export interface Itemlist {
  name: string
  url?: string
}

export interface Thing {
  name: string
  description: string
  mainentityofpage: string
}

export interface Article {
  image: string
  datemodified: string
  name: string
  description: string
  position: string
  headline: string
  url: string
  datepublished: string
  mainentityofpage: string
}
