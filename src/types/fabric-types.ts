import { Object as FabricObject } from 'fabric/fabric-impl';

export interface CustomFabricObject extends FabricObject {
  radius?: number;
  fontSize?: number;
  text?: string;
}

export type UpdateableProperties = {
  angle?: number;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string | null;
  stroke?: string;
  fontSize?: number;
  text?: string;
};