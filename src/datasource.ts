export default class Datasource {
  public data: any
  public listeners: any
  constructor(initState) {
    this.data = initState
    this.listeners = Object.fromEntries(Object.entries(initState).map(([key, value])=>[key, new Set([])]))
  }
}
