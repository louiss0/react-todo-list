import React, { FormEvent, FunctionComponent } from "react"
import Task from "../models/Task"

type TaskItemProps = {
	task: Task
	handleTaskChange(
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string
	): void
	handleEditingTitle(id: string): void
	handleEditingDescription(id: string): void
	handleCancelEditing(id: string): void
	handleToggleComplete(id: string): void
	handleToggleDescription(id: string): void
	handleDeleteTask(id: string): void
	finishEditingTitle(event: FormEvent<HTMLInputElement>, id: string): void
	finishEditingDescription(
		event: FormEvent<HTMLTextAreaElement>,
		id: string
	): void
}

const TaskItem: FunctionComponent<TaskItemProps> = props => {
	const {
		task,
		handleCancelEditing,
		handleTaskChange,
		handleEditingTitle,
		handleEditingDescription,
		handleToggleComplete,
		finishEditingDescription,
		finishEditingTitle,
		handleToggleDescription,
		handleDeleteTask,
	} = props

	function CheckboxIcon() {
		return (
			<svg
				onClick={() => handleToggleComplete(task.id)}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-6 h-6 fill-current text-red-600 transition-transform duration-100 transform  hover:scale-125 active:scale-75 "
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" />
			</svg>
		)
	}

	function CheckIndeterminate() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-6 h-6 fill-current text-amber-600 transition-transform duration-100 transform  hover:scale-125 active:scale-75"
				onClick={() => handleToggleComplete(task.id)}
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 8v2h10v-2H7z" />
			</svg>
		)
	}

	function NoteIcon() {
		return (
			<svg
				onClick={() => handleToggleDescription(task.id)}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-6 h-6 fill-current transition-transform duration-100 transform hover:scale-125 active:scale-75 text-yellow-400"
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M15 14l-.117.007a1 1 0 0 0-.876.876L14 15v6H3.998A.996.996 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.447.993.999V14h-6zm6 2l-5 4.997V16h5z" />
			</svg>
		)
	}

	function TrashIcon() {
		return (
			<svg
				onClick={() => handleDeleteTask(task.id)}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-6 h-6 fill-current transition-transform duration-100 transform hover:scale-125 active:scale-75 text-amber-800"
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z" />
			</svg>
		)
	}

	return (
		<li>
			<div className="flex p-4 justify-evenly basis-8">
				{task.complete ? <CheckIndeterminate /> : <CheckboxIcon />}

				{task.editingTitle ? (
					<input
						type="text"
						value={task.title}
						name="title"
						id="title"
						className="w-2/5"
						onInput={event => handleTaskChange(event, task.id)}
						onKeyDown={event => finishEditingTitle(event, task.id)}
						onBlur={() => handleCancelEditing(task.id)}
					/>
				) : (
					<span
						className={`text-md basis-2/5 text ${
							task.complete ? "line-through text-red-400" : ""
						}`}
						onClick={() => handleEditingTitle(task.id)}
						onKeyDown={() => handleEditingTitle(task.id)}
						role="button"
						tabIndex={-1}
					>
						{task.title}
					</span>
				)}

				<NoteIcon />

				<TrashIcon />
			</div>
			{task.seeingDescription ? (
				<div className="p-6 flex justify-center ">
					{task.editingDescription ? (
						<textarea
							name="description"
							id="description"
							value={task.description}
							onChange={event => handleTaskChange(event, task.id)}
							className="w-full indent-xs 
							shadow-sm shadow-gray-400 
							focus:(border-none shadow-lg shadow-blue-300)"
							onKeyDown={event => finishEditingDescription(event, task.id)}
							onBlur={() => handleCancelEditing(task.id)}
						/>
					) : (
						<div
							onClick={() => handleEditingDescription(task.id)}
							onKeyDown={() => handleEditingDescription(task.id)}
							role="button"
							tabIndex={-1}
						>
							<p>{task.description || "No description"} </p>
						</div>
					)}
				</div>
			) : null}
		</li>
	)
}

export default TaskItem
