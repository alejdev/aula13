
// User interface
export interface User {
	name: string
	avatar?: string
}

// Student interface
export interface Student {
	id: number
	name: string
	surname?: string
	fullName: string
	gender: string
	avatar?: string
	tag?: string
	phones?: any[]
	subjects?: any
	emit?: any
}
