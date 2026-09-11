export type InstanceProperties = Record<string, string | number | boolean>

type InstanceListener = (instance: Instance) => void

export class Instance {
  readonly children: Instance[] = []
  private readonly listeners = new Set<InstanceListener>()
  private _parent: Instance | null = null
  private _properties: InstanceProperties

  constructor(
    public readonly name: string,
    properties: InstanceProperties = {},
  ) {
    this._properties = { ...properties }
  }

  get parent(): Instance | null {
    return this._parent
  }

  get properties(): Readonly<InstanceProperties> {
    return this._properties
  }

  addChild(child: Instance): void {
    if (child === this || child.isAncestorOf(this)) {
      throw new Error('An Instance cannot become its own ancestor')
    }

    child._parent?.removeChild(child)
    child._parent = this
    this.children.push(child)
    this.notify()
  }

  removeChild(child: Instance): void {
    const childIndex = this.children.indexOf(child)
    if (childIndex === -1) return

    this.children.splice(childIndex, 1)
    child._parent = null
    this.notify()
  }

  findFirstChild(name: string): Instance | undefined {
    return this.children.find((child) => child.name === name)
  }

  setProperty(name: string, value: string | number | boolean): void {
    this._properties = { ...this._properties, [name]: value }
    this.notify()
  }

  subscribe(listener: InstanceListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private isAncestorOf(candidate: Instance): boolean {
    let current: Instance | null = candidate
    while (current) {
      if (current === this) return true
      current = current._parent
    }
    return false
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this))
  }
}
