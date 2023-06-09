import "../styles/globals.css";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const itemsFromBackend = [
	{
		id: uuidv4(),
		content: "First task",
	},
	{
		id: uuidv4(),
		content: "Second task",
	},
];

const columnsFromBackend = {
	[uuidv4()]: {
		name: "Todo",
		items: itemsFromBackend,
	},
};

function App() {
	const [columns, setColumns] = useState(columnsFromBackend);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<DragDropContext onDragEnd={(result) => console.log(result)}>
				{Object.entries(columns).map(([id, column]) => {
					return (
						<Droppable droppableId={id} key={id}>
							{(provided, snapshot) => {
								return (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											background: snapshot.isDraggingOver
												? "lighblue"
												: "lightgrey",
											padding: 4,
											width: 300,
											minHeight: 500,
										}}
									>
										{column.items.map((item, index) => {
											return (
												<Draggable
													key={item.id}
													draggableId={item.id}
													index={index}
												>
													{(provided, snapshot) => {
														return (
															<div
																ref={
																	provided.innerRef
																}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={{
																	userSelect:
																		"none",
																	padding: 16,
																	margin: "0 0 8px 0",
																	minHeight:
																		"50px",
																	backgroundColor:
																		snapshot.isDragging
																			? "#263B4A"
																			: "#456C86",
																	color: "white",
																	...provided
																		.draggableProps
																		.style,
																}}
															>
																{item.content}
															</div>
														);
													}}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</div>
								);
							}}
						</Droppable>
					);
				})}
			</DragDropContext>
		</div>
	);
}
export default App;
