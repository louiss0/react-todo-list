export default interface TargetEventObject<T extends EventTarget>
	extends Event {
	target: T
	currentTarget: T
}
