export type ResembleResult = {
  compare: string;
  path: string;
  from: string | null;
  to: string | null;
  data: Data | null;
};

export type Data = {
  isSameDimensions: boolean;
  dimensionDifference: DimensionDifference;
  rawMisMatchPercentage: number;
  misMatchPercentage: string;
  diffBounds: DiffBounds;
  analysisTime: number;
};

export type DiffBounds = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type DimensionDifference = {
  width: number;
  height: number;
};
