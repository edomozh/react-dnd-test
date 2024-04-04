import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Div, TInitialData, initialData } from "./constants";
import { Column } from './Column'

interface Props {
  title: string;
};

const App_: React.FC<Props> = ({
  title,
}) => {
  const [data, setData] = useState<TInitialData>(initialData);

  const onDragEnd = useCallback((result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.id === source.id && destination.index === source.index) return;

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, taskIds: newTaskIds };
    const newData = { ...data, columns: { ...data.columns, [newColumn.id]: newColumn } }

    setData(newData);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Div>{title}</Div>
      {
        data.columnOrders.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column key={column.id} column={column} tasks={tasks} />
          )
        })
      }
    </DragDropContext>
  );
}

export const App = React.memo(App_);
