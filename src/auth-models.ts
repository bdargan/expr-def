export type Token = {
  token: string
  expires: Date
  deniedFields:  string[]
  allowedQueries: string[]
  documents: string[] //documents accessible by token
}