import {
	type ComponentProps,
	useState,
	useRef,
	useEffect,
	type Reducer,
	useReducer,
} from "react";

const combineStingsWithSpacesInBetween = (...args: Array<string>) =>
	args.join(" ");

class Todo {
	public readonly id: string;
	constructor(
		public readonly text: string,
		public readonly complete = false,
	) {
		this.id = Math.random().toString(16);
	}
}

type TodoListActionMap = {
	create: Omit<Todo, "complete">;
	check: Omit<Todo, "text">;
	delete: string;
	edit: Omit<Todo, "complete">;
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
			return [new Todo(action.payload.text), ...state];
		}

		case "check": {
			const todoListItemWithIdenticalIdInTodoListIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);

			return state.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;

				if (foundIndexIsSameAsIndex) {
					return new Todo(prevItem.text, action.payload.complete);
				}

				return prevItem;
			});
		}

		case "edit": {
			const todoListItemWithIdenticalIdInTodoListIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);
			return state.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;
				if (foundIndexIsSameAsIndex) {
					return new Todo(action.payload.text, prevItem.complete);
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

	const [text, setText] = useState("");

	const addTextInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}, [todoList]);

	const BUTTON_CONTROL_PROPS = Object.freeze([
		{
			text: "Clear Completed",
			colorClass: "bg-blue-500",
			handler: () => dispatch(new TodoListAction("clear_completed", undefined)),
		},
		{
			text: "Clear All",
			colorClass: "bg-red-500",
			handler: () => dispatch(new TodoListAction("clear", undefined)),
		},
	]);
	return (
		<div data-wrapper="bg-reset" className="text-gray-900 bg-gray-50 h-screen">
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
									if (!text) return;
									dispatch(new TodoListAction("create", new Todo(text)));
									setText("");
									addTextInputRef.current?.focus();
								}}
							>
								<div
									data-content
									className="flex justify-between lg:justify-evenly items-center"
								>
									<input
										value={text}
										ref={addTextInputRef}
										onChange={(e) => setText(e.target.value)}
										type="text"
										minLength={1}
										maxLength={25}
										className="rounded-sm px-3 py-1"
									/>
									<Button className="bg-blue-300 rounded-sm px-6 py-2">
										Submit
									</Button>
								</div>
							</form>
							<div data-element="todo-list ">
								{todoList.map((todo) => (
									<TodoItem
										key={todo.id}
										todo={todo}
										handleChangeText={(payload) =>
											dispatch(new TodoListAction("edit", payload))
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
											key={btnProps.text}
											className={`rounded-sm px-3 py-1 ${btnProps.colorClass}`}
											onClick={btnProps.handler}
										>
											{btnProps.text}
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
	handleChangeText: (payload: Omit<Todo, "complete">) => void;
	handleCheckTodo: (payload: Omit<Todo, "text">) => void;
	handleDeleteTodo: (payload: string) => void;
};

const TodoItem = (props: TodoItemProps) => {
	const { todo, handleChangeText, handleCheckTodo, handleDeleteTodo } = props;

	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(todo.text);

	const handleBlur = () => {
		setEditing(false);

		if (!text) {
			return setText(todo.text);
		}

		handleChangeText({ id: todo.id, text });
	};
	const handleBlurWhenEnterKeyIsPressed = (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		const keyPressedIsEnter = e.key === "Enter";

		if (keyPressedIsEnter) return handleBlur();
	};
	return (
		<div data-element="todo-item" className="py-3 px-6">
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
						{text}
					</button>
				)}
				{editing && (
					<input
						value={text}
						ref={(el) => el?.focus()}
						onBlur={handleBlur}
						onKeyDown={handleBlurWhenEnterKeyIsPressed}
						onChange={(e) => setText(e.target.value)}
						type="text"
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

export default App;
