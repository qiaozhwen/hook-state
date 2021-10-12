export function to<T, U=Error> (
  promise: Promise<T>,
  errorText?: object
):Promise<[U, undefined] | [T, null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[U, undefined]>((err: U)=> {
      if(errorText){
        Object.assign(err, errorText)
      }
      return [err, undefined]
    })
}
