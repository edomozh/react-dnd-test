import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Div, TColumn, TTask } from "./constants.ts";
import { Task } from "./Task.tsx";

type Props = {
    key: string;
    column: TColumn;
    tasks: TTask[];
};

const Column_: React.FC<Props> = ({
    key,
    column,
    tasks,
}) => {
    return (
        <Div>
            <Div>{column.title}</Div>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <Div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <p>task list</p>
                        {tasks.map((task, index) => <Task index={index} task={task} />)}
                        {provided.placeholder}
                    </Div>
                )}
            </Droppable>
        </Div>
    );
}

export const Column = React.memo(Column_);
