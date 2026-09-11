import { Instance } from './Instance'

export class DataModel extends Instance {
  constructor() {
    super('Game')
  }

  getWorkspace(): Instance {
    return this.findFirstChild('Workspace') ?? this.createWorkspace()
  }

  private createWorkspace(): Instance {
    const workspace = new Instance('Workspace', { gravity: 28 })
    this.addChild(workspace)
    return workspace
  }
}
