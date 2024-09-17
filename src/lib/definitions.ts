export interface CommentType {
  id: number
  by: string
  text: string
  time: number
  kids?: number[]
  type: string
}
