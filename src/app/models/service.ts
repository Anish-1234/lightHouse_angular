export interface ClientServices{
    clientId: number;
    clientName: string;
    managerId: number;
    managerName: string;
    serviceTypes:ServiceTypes[]
}
export interface ServiceTypes {
    active: boolean;
    name: string;
    serviceTypeId: number;
}

export interface ServiceTop{
    active: boolean;
    clientServiceTypeId: number;
    description: string;
    name: string;
}