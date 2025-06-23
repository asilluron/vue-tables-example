export enum SourceTypeEnum {
  SYSTEM_REQUEST = "System Request",
  PATENT = "Patent",
  PUBLICATION = "Publication",
  PLANT = "Plant",
  MODEL = "Model",
  CUSTOMER = "Customer",
}

export enum MaterialCategoryEnum {
  GLASS = "cmot:Glass",
  CERAMIC = "cot: Ceramic",
  GLASSCERAMIC = " cmot: GlassCeramic",
}

export enum DAVISStatusEnum {
  DRAFT = "Draft",
  SUBMITTED = "Submitted",
  APPROVED = "Approved",
  NEEDS_FURTHER_REFINEMENT = "Needs Further Refinement",
}

export enum DAVISRoleEnum {
  IP = "IP Department Approver",
  RDM = "Research & Development Manager (RDM) ",
  COMMERCIAL = "Commercial Approver",
  EDITOR = "Editor",
  COMMENTER = "Commenter",
}

export interface DAVIS {
  id: number;
  DAVISCode: string;
  requester?: string;
  detailedDescription?: string;
  productTypeId?: number;
  compositionTypeId?: number;
  trademarkName?: string;
  status?: DAVISStatusEnum;
  prodTrialDate?: Date;
  manufactPlantPlatform?: string;
  finishingPlant?: string;
  process?: string;
  essentialProcessing?: string;
  propertyControl?: string;
  materialCoveredBy?: string;
  reportReferences?: string;
  restrictionSale?: boolean;
  uniqueProperties?: string;
  requestDate?: Date;
  modifiedDate?: Date;
  dataReviewConfirm?: boolean;
  seekingApprovalConfirm?: boolean;
  artifactUri?: string;
  loadDttm: Date;
}
