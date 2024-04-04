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
        <Div>
            <TitleDiv>{column.title}</TitleDiv>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <ColumnDiv
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        <TitleDiv>task list</TitleDiv>
                        {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
                        {provided.placeholder}
                    </ColumnDiv>
                )}
            </Droppable>
        </Div>
    );
}

export const Column = React.memo(Column_);
