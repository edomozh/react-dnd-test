import React from "react";
import { TaskDiv, TTask } from "./constants";
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
            {(provided, snapshot) => (
                <TaskDiv
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                    {task.title}
                </TaskDiv>
            )}
        </Draggable>
    );
}

export const Task = React.memo(Task_);
