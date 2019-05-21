export interface Student {
	id: number;
	name: string;
	surname?: string;
	fullName: string;
	avatar?: string;
	tag?: string;
	phones?: any[];
	subjects?: any;
	emit?: any; 
}