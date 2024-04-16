import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
    ColumnDiv, FlexDiv, TColumn, TitleDiv, TTask
} from "./constants";
import { Task } from "./Task";

type Props = {
    column: TColumn;
    tasks: TTask[];
    index: number;
};

const Column_: React.FC<Props> = ({
    column,
    tasks,
    index,
}) => {
    return (
        <Draggable
            draggableId={column.id}
            index={index}
        >   
            {(provided) => (
                <FlexDiv
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <TitleDiv
                        {...provided.dragHandleProps}
                    >
                        {column.title}
                    </TitleDiv>
                    <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                            <ColumnDiv
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                $isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
                                {provided.placeholder}
                            </ColumnDiv>
                        )}
                    </Droppable>
                </FlexDiv>
            )}
        </Draggable >
    );
}

export const Column = React.memo(Column_);
