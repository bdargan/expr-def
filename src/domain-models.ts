import { Dictionary } from './figma/apply-evaluator';
import { FieldName, FilePermission, Resource, Value } from './figma/model';
export interface Item {
	id: string
}

export type File = Item & Resource & {
	name: string
	url: string
	owner_id: string
	team_id: string //check
	org_id: string //check
	//shared?: [{ user_id: string, permission: FilePermission[] }]
}

export type Team = Item & {
	name: string
}

export type TeamRole = Item & {
	permission: string
}

export type Org = Item & {
	public_link_permission: string
}

export type Document = Item & {
	title: string
	text: string
}

export type User = Item & Resource & {
	email: string
	team_id: string
	deleted_at?: Date
}


export const userContextPath = (user: User| undefined): Dictionary<Value> => {
	return {
		user: user ? user.id : null,
	}
}

export const fileContextPath = (file: File): Dictionary<Value> => {
	return {
		file: file.id,
		team: file.team_id,
		org: file.org_id,
		owner: file.owner_id
	}
}

export const getContextPath = (fieldOrValue: FieldName|Value, data: Dictionary<Dictionary<Value>>): Dictionary<Value> | Value => {
	switch (fieldOrValue as FieldName) {
		case 'file':
			return fileContextPath(data['file'] as unknown as File)
		case 'user':
			return userContextPath(data['user'] as unknown as User)
		default:
			return fieldOrValue as Value
	}
}