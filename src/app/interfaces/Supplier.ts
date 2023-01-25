export interface Supplier{
	name: string,
	status: string,
	month: string,
	phase: string,
	internal_order:string,
	amount:number,
}

export interface Filter{
	status:string,
	month:string,
	phase:string,
}