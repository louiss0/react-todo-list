import {
	type ComponentProps,
	useState,
	useRef,
	useEffect,
	type Reducer,
	useReducer,
	type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const combineStingsWithSpacesInBetween = (...args: Array<string>) =>
	args.join(" ");

class Todo {
	public readonly id: string;
	constructor(
		public readonly title: string,
		public readonly details = "",
		public readonly complete = false,
	) {
		this.id = Math.random().toString(16);
	}
}

type TodoListActionMap = {
	create: Omit<Todo, "complete">;
	check: Omit<Todo, "title" | "details">;
	delete: string;
	edit_title: Omit<Todo, "complete" | "details">;
	edit_details: Omit<Todo, "complete" | "title">;
	clear_completed: undefined;
	clear: undefined;
};
type TodoListActions = {
	[K in keyof TodoListActionMap]: {
		type: K;
		payload: TodoListActionMap[K];
	};
}[keyof TodoListActionMap];

class TodoListAction<T extends keyof TodoListActionMap> {
	constructor(
		public readonly type: T,
		public readonly payload: TodoListActionMap[T],
	) {}
}

const todoListReducer: Reducer<Array<Todo>, TodoListActions> = (
	state,
	action,
) => {
	switch (action.type) {
		case "create": {
			return [new Todo(action.payload.title), ...state];
		}

		case "check": {
			const todoListItemWithIdenticalIdInTodoListIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);

			return state.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;

				if (foundIndexIsSameAsIndex) {
					return new Todo(
						prevItem.title,
						prevItem.details,
						action.payload.complete,
					);
				}

				return prevItem;
			});
		}

		case "edit_title": {
			const todoListItemWithIdenticalIdInTodoListIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);
			return state.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;
				if (foundIndexIsSameAsIndex) {
					return new Todo(
						action.payload.title,
						prevItem.details,
						prevItem.complete,
					);
				}

				return prevItem;
			});
		}
		case "edit_details": {
			const todoListItemWithIdenticalIdInTodoListIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);
			return state.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;
				if (foundIndexIsSameAsIndex) {
					return new Todo(
						prevItem.title,
						action.payload.details,
						prevItem.complete,
					);
				}

				return prevItem;
			});
		}

		case "delete": {
			return state.filter((todo) => todo.id !== action.payload);
		}

		case "clear_completed": {
			return state.filter((todo) => !todo.complete);
		}

		case "clear": {
			return [];
		}
	}
};

const getTodoListFromLocalStorage = () => {
	const storedTodoList = localStorage.getItem("todoList");

	return storedTodoList ? (JSON.parse(storedTodoList) as Array<Todo>) : [];
};

function App() {
	const [todoList, dispatch] = useReducer(
		todoListReducer,
		getTodoListFromLocalStorage(),
	);

	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}, [todoList]);

	const [title, setTitle] = useState("");

	const [openModal, setOpenModal] = useState<"yes" | "no">("no");

	const [openPrompt, setOpenPrompt] = useState<"yes" | "no">("no");

	const addTitleInputRef = useRef<HTMLInputElement>(null);

	const BUTTON_CONTROL_PROPS = Object.freeze([
		{
			title: "Clear Completed",
			colorClass: "bg-blue-500",
			handler: () => dispatch(new TodoListAction("clear_completed", undefined)),
		},
		{
			title: "Clear All",
			colorClass: "bg-red-500",
			handler: () => dispatch(new TodoListAction("clear", undefined)),
		},
	]);

	return (
		<div data-wrapper="bg-reset" className="text-gray-900 bg-gray-50 h-screen">
			{openPrompt === "yes" && (
				<TodoDetailPrompt
					handleClose={(answer) => {
						setOpenPrompt("no");
						if (!answer || answer === "no") {
							return dispatch(new TodoListAction("create", new Todo(title)));
						}

						setOpenModal("yes");
					}}
				/>
			)}

			{openModal === "yes" && (
				<TodoDetailsModal
					modalTitle="Add Details"
					details={""}
					handleClose={({ answer, details }) => {
						if (!answer) {
							return;
						}
						dispatch(new TodoListAction("create", new Todo(title, details)));
						setTitle("");
						setOpenModal("no");
						addTitleInputRef.current?.focus();
					}}
				/>
			)}
			<div
				data-element="todo-list-app"
				className="mx-auto px-3 py-9 md:w-4/5 lg:w-3/5"
			>
				<div data-content className="flex flex-col items-center gap-6">
					<h1 className="text-5xl">To Do List App</h1>

					<div
						data-element="todo-list-container"
						className="sm:w-4/5 p-4 rounded-md border-2 border-current"
					>
						<div data-content className="flex flex-col gap-4">
							<form
								data-element="todo-list-form"
								onSubmit={(e) => {
									e.preventDefault();
									setOpenPrompt("yes");
								}}
							>
								<div
									data-content
									className="flex justify-between lg:justify-evenly items-center"
								>
									<input
										value={title}
										ref={addTitleInputRef}
										onChange={(e) => setTitle(e.target.value)}
										type="title"
										minLength={1}
										maxLength={25}
										className="rounded-sm px-3 py-1"
									/>
									<Button
										type="submit"
										className="bg-blue-300 rounded-sm px-6 py-2"
									>
										Submit
									</Button>
								</div>
							</form>
							<div data-element="todo-list ">
								{todoList.map((todo) => (
									<TodoItem
										key={todo.id}
										todo={todo}
										handleChangeTitle={(payload) =>
											dispatch(new TodoListAction("edit_title", payload))
										}
										handleChangeDetails={(payload) =>
											dispatch(new TodoListAction("edit_details", payload))
										}
										handleCheckTodo={(payload) =>
											dispatch(new TodoListAction("check", payload))
										}
										handleDeleteTodo={(payload) =>
											dispatch(new TodoListAction("delete", payload))
										}
									/>
								))}
							</div>
							<div data-element="control-buttons" className="px-6 py-2">
								<div className="flex justify-evenly items-center">
									{BUTTON_CONTROL_PROPS.map((btnProps) => (
										<Button
											key={btnProps.title}
											className={`rounded-sm px-3 py-1 ${btnProps.colorClass}`}
											onClick={btnProps.handler}
										>
											{btnProps.title}
										</Button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

type TodoItemProps = {
	todo: Todo;
	handleChangeTitle: (payload: TodoListActionMap["edit_title"]) => void;
	handleChangeDetails: (payload: TodoListActionMap["edit_details"]) => void;
	handleCheckTodo: (payload: TodoListActionMap["check"]) => void;
	handleDeleteTodo: (payload: string) => void;
};

const TodoItem = (props: TodoItemProps) => {
	const {
		todo,
		handleChangeTitle,
		handleCheckTodo,
		handleDeleteTodo,
		handleChangeDetails,
	} = props;

	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(todo.title);

	const handleBlur = () => {
		setEditing(false);

		if (!title) {
			return setTitle(todo.title);
		}

		handleChangeTitle({ id: todo.id, title });
	};
	const handleBlurWhenEnterKeyIsPressed = (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		const keyPressedIsEnter = e.key === "Enter";

		if (keyPressedIsEnter) return handleBlur();
	};
	return (
		<div data-element="todo-item" className="py-3 px-6">
			<TodoDetailsModal
				modalTitle="Edit Details"
				details={todo.details}
				handleClose={({ answer, details }) => {
					if (answer) {
						handleChangeDetails({ id: todo.id, details });
					}
				}}
			/>
			<div
				data-content
				className="flex justify-between lg:justify-evenly items-center"
			>
				<Button
					className="size-8 border rounded-full"
					type="button"
					onClick={() =>
						handleCheckTodo({ id: todo.id, complete: !todo.complete })
					}
				>
					<i className="inline-block i-mdi:check" />

					<div className="sr-only">Check Todo</div>
				</Button>
				{!editing && (
					<button
						type="button"
						disabled={todo.complete}
						className={`${todo.complete ? "text-red-600/50 line-through" : ""}`}
						onClick={() => setEditing(true)}
					>
						{title}
					</button>
				)}
				{editing && (
					<input
						value={title}
						ref={(el) => el?.focus()}
						onBlur={handleBlur}
						onKeyDown={handleBlurWhenEnterKeyIsPressed}
						onChange={(e) => setTitle(e.target.value)}
						type="title"
						className="rounded-sm px-2"
					/>
				)}
				<Button
					onClick={() => handleDeleteTodo(todo.id)}
					className="size-8 border rounded-full"
				>
					<i className="inline-block i-mdi:close" />

					<div className="sr-only">Close</div>
				</Button>
			</div>
		</div>
	);
};

type ButtonProps = ComponentProps<"button">;

const Button = ({ children, className, ...restProps }: ButtonProps) => {
	return (
		<button
			className={combineStingsWithSpacesInBetween(
				"p-1",
				"transition-transform duration-300 ease-in",
				"hover:(brightness-150 scale-120)",
				"focus:outline-current active:scale-90",
				className ? className : "",
			)}
			{...restProps}
		>
			{children}
		</button>
	);
};

type BodyPortalProps = {
	children: ReactNode;
	key?: string | null;
};

const BodyPortal = ({ children }: BodyPortalProps) => {
	return createPortal(children, document.body);
};

type TodoDetailsModalProps = {
	modalTitle: string;
	details: string;
	handleClose: (payload: {
		answer: "finished" | undefined;
		details: string;
	}) => void;
};

function TodoDetailsModal({
	modalTitle,
	details: $details,
	handleClose,
}: TodoDetailsModalProps) {
	const [details, setDetails] = useState($details);

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (dialogRef) {
			dialogRef.current?.showModal();
		}
	}, []);

	return (
		<BodyPortal>
			<dialog
				onClose={(event) =>
					handleClose({
						answer: event.currentTarget.returnValue as Parameters<
							typeof handleClose
						>[0]["answer"],
						details,
					})
				}
				ref={dialogRef}
				className="inset-0 w-3/5 max-w-xl max-w-lg rounded-md  backdrop:bg-gray-900/50"
			>
				<form method="dialog">
					<header className="text-2xl text-center px-12 py-6">
						<h2>{modalTitle}</h2>
					</header>
					<div className="grid place-items-center">
						<textarea
							required
							minLength={2}
							rows={10}
							cols={20}
							className="border-3 rounded-sm"
							value={details}
							onChange={(event) => setDetails(event.target.value)}
							name="details"
							id="details"
						/>
					</div>
					<footer className="flex justify-end items-center px-6 py-4">
						<Button
							type="submit"
							value="finished"
							className="focus:ring-1 bg-green-400 rounded-full px-6 py-2"
						>
							Finish
						</Button>
					</footer>
				</form>
			</dialog>
		</BodyPortal>
	);
}

type TodoDetailPromptProps = {
	handleClose: (answer: "yes" | "no" | undefined) => void;
};

function TodoDetailPrompt({ handleClose }: TodoDetailPromptProps) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (dialogRef) {
			dialogRef.current?.showModal();
		}
	}, []);

	return (
		<BodyPortal>
			<dialog
				onClose={(event) =>
					handleClose(
						event.currentTarget.returnValue as Parameters<
							typeof handleClose
						>[0],
					)
				}
				className="m-0 px-6 py-3 absolute z-10 top-6 left-1/2 -translate-x-1/2  rounded-md backdrop:bg-gray-900/50"
				ref={dialogRef}
			>
				<form method="dialog" className="space-y-6">
					<header className="text-xl font-bold">
						Do you want to add details?
					</header>
					<footer className="flex justify-center items-center gap-6">
						<Button
							value="yes"
							type="submit"
							className="rounded-full px-6 py-2 bg-green-400"
						>
							Yes
						</Button>
						<Button
							value="no"
							type="submit"
							className="rounded-full px-6 py-2 bg-red-400"
						>
							No
						</Button>
					</footer>
				</form>
			</dialog>
		</BodyPortal>
	);
}

export default App;
