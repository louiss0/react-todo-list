import React, {
	FunctionComponent,
	useState,
	KeyboardEvent,
	useEffect,
	useMemo,
} from "react"
import BaseContainer from "../components/base/BaseContainer"
import TaskItem from "../components/TaskItem"
import useInput from "../hooks/useInput"
import Task from "../models/Task"

const TodoList: FunctionComponent = () => {
	const [tasks, setTasks] = useState<Array<Task>>([])

	const [previousTitle, setPreviousTitle] = useState("")
	const [previousDescription, setPreviousDescription] = useState("")

	const {
		value: taskTitle,
		handleChange: handleChangeTaskTitle,
		reset: resetTaskTitle,
	} = useInput()

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks")

		if (storedTasks) {
			const parsedTasks: Array<Task> = JSON.parse(storedTasks)
			setTasks(
				parsedTasks.map(
					parsedTask =>
						new Task(
							parsedTask.title,
							parsedTask.description,
							parsedTask.complete
						)
				)
			)
		}

		return () => {
			tasks.forEach(task => {
				delete task?.seeingDescription
				delete task?.editingDescription
				delete task?.editingTitle
			})
			localStorage.setItem("tasks", JSON.stringify(tasks))
		}
	}, [])

	const numOfTasks = useMemo(() => tasks.length, [tasks])

	const numOfCompletedTasks = useMemo(
		() => tasks.filter(task => task.complete === true).length,
		[tasks]
	)

	const numOfIncompleteTasks = useMemo(
		() => tasks.filter(task => task.complete !== true).length,
		[tasks]
	)

	function handleTaskChange(
		event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string
	) {
		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					const { name, value } = event.currentTarget
					if (name === "description" || name === "title") {
						task[name] = value

						return task
					}
				}
				return task
			})
		)
	}

	function handleEditingTitle(id: string) {
		setTasks(
			tasks.map(task => {
				task.id === id
					? (task.editingTitle = true)
					: (task.editingTitle = false)

				setPreviousTitle(task.title)
				return task
			})
		)
	}

	function handleCancelEditing(id: string) {
		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					if (!task.title) {
						task.title = previousTitle
					}

					if (!task.description) {
						task.description = previousDescription
					}

					setPreviousDescription("")
					setPreviousTitle("")
					task.editingTitle = false
				}

				return task
			})
		)
	}

	function handleEditingDescription(id: string) {
		setTasks(
			tasks.map(task => {
				task.id === id
					? (task.editingDescription = true)
					: (task.editingDescription = false)
				setPreviousDescription(task.description)
				return task
			})
		)
	}

	function addNewTask(event: KeyboardEvent<HTMLInputElement>): void {
		if (event.key === "Enter") {
			if (!taskTitle) return

			const answer = confirm("Would you like to add a description")

			if (!answer) {
				setTasks(tasks => [...tasks, new Task(taskTitle, "")])
				return resetTaskTitle()
			}

			const description = prompt("What is the task description")

			if (!description) {
				setTasks(tasks => [...tasks, new Task(taskTitle, "")])
				return resetTaskTitle()
			}

			setTasks(tasks => [...tasks, new Task(taskTitle, description as string)])
			resetTaskTitle()
		}
	}

	function handleToggleComplete(id: string): void {
		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					task.complete = !task.complete
				}
				return task
			})
		)
	}
	function handleToggleDescription(id: string): void {
		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					task.seeingDescription = !task.seeingDescription
				}

				return task
			})
		)
	}
	function handleDeleteTask(id: string): void {
		setTasks(tasks => tasks.filter(task => task.id !== id))
	}

	function clearTasks() {
		setTasks([])
	}

	function finishEditingTitle(
		event: KeyboardEvent<HTMLInputElement>,
		id: string
	): void {
		if (event.key === "Enter") {
			setTasks(
				tasks.map(task => {
					if (task.id === id) {
						if (!task.title) {
							task.title = previousTitle
						}

						setPreviousTitle("")
						task.editingTitle = false
					}

					return task
				})
			)
		}
	}

	function finishEditingDescription(
		event: KeyboardEvent<HTMLTextAreaElement>,
		id: string
	): void {
		if (event.key === "Enter") {
			setTasks(
				tasks.map(task => {
					if (task.id === id) {
						if (!task.description) {
							task.description = previousDescription
						}

						setPreviousDescription("")
						task.seeingDescription = false
					}

					return task
				})
			)
		}
	}

	return (
		<div className="p-10">
			<BaseContainer extraClasses="min-h-lg flex flex-col border-gray-500 border-solid border-2 lg:w-3/5 ">
				<div className="h-40 flex flex-col justify-around items-center ">
					<h1 className="font-bold text-2xl">
						What are your tasks for today ?
					</h1>
					<input
						type="text"
						className="w-3/5 rounded-sm text-sm py-2 px-6 focus:outline-none"
						onKeyDown={addNewTask}
						value={taskTitle}
						onChange={handleChangeTaskTitle}
					/>
				</div>
				<ul className="flex flex-col gap-6 flex-1">
					{tasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							handleCancelEditing={handleCancelEditing}
							handleEditingDescription={handleEditingDescription}
							handleEditingTitle={handleEditingTitle}
							handleTaskChange={handleTaskChange}
							handleToggleDescription={handleToggleDescription}
							handleDeleteTask={handleDeleteTask}
							handleToggleComplete={handleToggleComplete}
							finishEditingTitle={finishEditingTitle}
							finishEditingDescription={finishEditingDescription}
						/>
					))}
				</ul>

				<div className="p-4 flex justify-around items-center text-sm md:text-lg">
					<div className="flex flex-col gap-2 sm:(flex-row gap-5)">
						<span>Amount of tasks {numOfTasks} </span>
						<span>Completed tasks {numOfCompletedTasks} </span>
						<span>Incomplete tasks {numOfIncompleteTasks} </span>
					</div>
					<button
						className="py-3 px-6 rounded-sm bg-gray-900 text-gray-100 
						transition-transform transform duration-200
						border-current border-1 border-solid
						hover:(shadow-sm shadow-gray-900) 
						active:(text-gray-900 bg-gray-100  scale-90)
					"
						onClick={clearTasks}
					>
						Clear Tasks
					</button>
				</div>
			</BaseContainer>
		</div>
	)
}

export default TodoList
