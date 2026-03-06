export type Category = {
  _id: string
  title: string
  parent: string | null
  image?: string
  children?: Category[]
}