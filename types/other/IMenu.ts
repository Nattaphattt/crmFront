export interface IMenuResponse {
  menuId: number;
  code?: string;
  icon?: string;
  permissionPath?: string;
  urlLink: string;
  parent?: number;
  flagHasChild?: string;
  flagActive?: string;
  createdBy?: string;
  createdDate?: Date | null;
  updatedBy?: string;
  updatedDate?: Date | null;
  child?: any;
  title?: string;
  flagNewTab?:string;
}
