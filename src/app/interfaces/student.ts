export interface Student {
	id: number;
	name: string;
	surname?: string;
	fullName: string;
	avatar?: string;
	type?: string;
	phones?: any[];
	subjects?: any;
	emit?: any; 
}