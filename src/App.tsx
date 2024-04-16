import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { TInitialData, initialData, BoardDiv } from "./constants";
import { Column } from './Column'

interface Props {
  title: string;
};

const App_: React.FC<Props> = ({
  title,
}) => {
  const [data, setData] = useState<TInitialData>(initialData);

  const onDragEnd: OnDragEndResponder = useCallback((result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'column') {
      const newColumnOrder = [...data.columnOrders];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = { ...data, columnOrders: newColumnOrder };
      setData(newData);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      if (source.index === destination.index) return;
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      const newData = { ...data, columns: { ...data.columns, [newColumn.id]: newColumn } }
      setData(newData);
      return;
    }

    if (start !== finish) {
      const startTasks = Array.from(start.taskIds);
      startTasks.splice(source.index, 1);
      const finishTasks = Array.from(finish.taskIds);
      finishTasks.splice(destination.index, 0, draggableId);
      const newStartColumn = { ...start, taskIds: startTasks };
      const newFinishColumn = { ...finish, taskIds: finishTasks };

      const newData = {
        ...data, columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        }
      }
      setData(newData);
      return;
    }

  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <BoardDiv
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrders.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column key={column.id} column={column} tasks={tasks} index={index} />
              )
            })}
            {provided.placeholder}
          </BoardDiv>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export const App = React.memo(App_);
