import { v4 as uuidv4 } from "uuid"

export default class Task {
	public readonly id: string
	constructor(
		public title: string,
		public description: string,
		public complete = false,
		public editingTitle: boolean | undefined = false,
		public editingDescription: boolean | undefined = false,
		public seeingDescription: boolean | undefined = false
	) {
		this.id = uuidv4()
	}
}
