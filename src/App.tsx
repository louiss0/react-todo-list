import { type ComponentProps, useState, useRef } from "react";

const combineStingsWithSpacesInBetween = (...args: Array<string>) =>
	args.join(" ");

class Todo {
	public readonly id: string;
	constructor(
		public readonly text: string,
		public readonly completed = false,
	) {
		this.id = Math.random().toString(16);
	}
}

function App() {
	const [todoList, setTodoList] = useState(() => [
		new Todo("Clean my room"),
		new Todo("Go to my Interview"),
	]);

	const [text, setText] = useState("");

	const addTextInputRef = useRef<HTMLInputElement>(null);

	const changeTextInTodoList = ({
		id,
		text,
	}: Omit<Todo, "completed">): void => {
		const todoListItemWithIdenticalIdInTodoListIndex = todoList.findIndex(
			(item) => item.id === id,
		);
		setTodoList((prevTodoList) =>
			prevTodoList.map((prevItem, index) => {
				const foundIndexIsSameAsIndex =
					todoListItemWithIdenticalIdInTodoListIndex === index;
				if (foundIndexIsSameAsIndex) {
					return new Todo(text, prevItem.completed);
				}

				return prevItem;
			}),
		);
	};
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
									setTodoList((prevTodoList) => [
										...prevTodoList,
										new Todo(text),
									]);
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
										handleChangeText={changeTextInTodoList}
									/>
								))}
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
	handleChangeText(payload: Omit<Todo, "completed">): void;
};

const TodoItem = (props: TodoItemProps) => {
	const { todo, handleChangeText } = props;

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
				<Button className="size-8 border rounded-full">
					<i className="inline-block i-mdi:check" />

					<div className="sr-only">Check</div>
				</Button>
				{!editing && (
					<button type="button" onClick={() => setEditing(true)}>
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
				<Button className="size-8 border rounded-full">
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
