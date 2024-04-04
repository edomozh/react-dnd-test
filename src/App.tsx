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

  const onDragEnd = useCallback(() => {
    debugger;
    //
  }, []);

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
