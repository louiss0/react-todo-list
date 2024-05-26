import { type ComponentProps, useState } from "react";

const combineStingsWithSpacesInBetween = (...args: Array<string>) =>
	args.join(" ");

class Todo {
	public readonly id: string;
	constructor(public readonly text: string) {
		this.id = new Date().toString();
	}
}

function App() {
	const [todoList, setTodoList] = useState(() => [
		new Todo("Clean my room"),
		new Todo("Take out the garbage"),
		new Todo("Sweep the office"),
		new Todo("Hangout with friends"),
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
						className="w-full sm:w-4/5 p-4 rounded-md border-2 border-current"
					>
						<div data-content className="flex flex-col gap-4">
							<form data-element="todo-list-form">
								<div
									data-content
									className="flex justify-between lg:justify-evenly items-center"
								>
									<input type="text" className="rounded-sm px-3 py-1" />
									<Button className="bg-blue-300 rounded-sm px-6 py-2">
										Submit
									</Button>
								</div>
							</form>
							<div data-element="todo-list ">
								{todoList.map((todo) => (
									<TodoItem id={todo.id} key={todo.id} text={todo.text} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

type TodoItemProps = Todo & {};

const TodoItem = (props: TodoItemProps) => {
	const { text } = props;

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
				{text}
				{/* <input type="text" className="rounded-sm px-2" /> */}
				<Button className="size-8 border rounded-full">
					<i className="inline-block i-mdi:close" />

					<div className="sr-only">Close</div>
				</Button>
			</div>
		</div>
	);
};

type ButtonProps = Omit<ComponentProps<"button">, "onClick"> & {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	handleClick?: (...args: Array<any>) => void;
};

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
