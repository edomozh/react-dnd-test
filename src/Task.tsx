import React from "react";
import { Div, TTask } from "./constants";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    task: TTask;
};

const Task_: React.FC<Props> = ({
    index,
    task
}) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {task.title}
                </Div>
            )}
        </Draggable>
    );
}

export const Task = React.memo(Task_);
