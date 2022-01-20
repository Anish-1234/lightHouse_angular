export interface FilterModel {
  label: string;
  model: any;
  modelName: string;
  data: DropdownData[]
}

export interface DropdownData {
  displayName: string;
  value: any;
}

export interface ClientList {
  CEL: boolean;
  Issue: boolean;
  clientId: number;
  gfiId: string;
  iasoId: string;
  isActive: boolean;
  isContactUpdateReminder: boolean;
  isHavingCSTUsers: boolean;
  isHavingPrimarySiteContact: boolean;
  isInternalTicket: boolean;
  isInternalTicketEmail: boolean;
  name: string;
  nodeId: string;
  reviewDate?: any;
  tag: string;
  teamId: number;
  teamName: string;
  totalCount: number;
}
