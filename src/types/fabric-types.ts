import { Object as FabricObject, IObjectOptions, Pattern, Gradient } from 'fabric/fabric-impl';

export interface CustomFabricObject extends FabricObject {
  radius?: number;
  fontSize?: number;
  text?: string;
  stroke: string | undefined;
}

export type UpdateableProperties = Partial<IObjectOptions> & {
  radius?: number;
  fontSize?: number;
  text?: string;
};