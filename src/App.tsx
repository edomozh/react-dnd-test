import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TInitialData, initialData, TitleDiv, BoardDiv } from "./constants";
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
      <BoardDiv>
        {
          data.columnOrders.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Column key={column.id} column={column} tasks={tasks} />
            )
          })
        }
      </BoardDiv>
    </DragDropContext>
  );
}

export const App = React.memo(App_);
