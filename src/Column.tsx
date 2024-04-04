import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnDiv, Div, TColumn, TitleDiv, TTask } from "./constants";
import { Task } from "./Task";

type Props = {
    column: TColumn;
    tasks: TTask[];
};

const Column_: React.FC<Props> = ({
    column,
    tasks,
}) => {
    return (
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <ColumnDiv
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                >
                    <TitleDiv>{column.title}</TitleDiv>
                    {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
                    {provided.placeholder}
                </ColumnDiv>
            )}
        </Droppable>
    );
}

export const Column = React.memo(Column_);
