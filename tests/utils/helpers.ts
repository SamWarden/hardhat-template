type StructArgs = { [key: string]: any }

export function getStruct(args: StructArgs): any {
  const struct: any = Object.values(args)
  for (const key in args) {
    struct[key] = args[key]
  }
  return struct
}
