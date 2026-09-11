import { DataModel } from './DataModel'
import { Instance } from './Instance'

export function createDefaultDataModel(): DataModel {
  const dataModel = new DataModel()
  const workspace = dataModel.getWorkspace()
  workspace.addChild(new Instance('SpawnLocation', { x: 0, y: 0, z: 0 }))
  workspace.addChild(new Instance('Baseplate', { size: 28, material: 'plastic' }))
  return dataModel
}
