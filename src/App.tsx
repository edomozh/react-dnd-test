import React, { useCallback, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { TInitialData, initialData, BoardDiv, FlexDiv, InputText, InputButton, TTask } from "./constants";
import { Column } from './Column'

interface Props {
  title: string;
};

const App_: React.FC<Props> = ({
  title,
}) => {
  const [data, setData] = useState<TInitialData>(initialData);
  const [task, setTask] = useState<string | null>('');

  const inputRef = useRef<HTMLInputElement>(null);

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

  const onAddTask = useCallback(() => {
    const newTaskId = String(Object.keys(data.tasks).length + 1);
    const newTask: TTask = { id: `${newTaskId}`, title: task ?? '' };
    const newTasks = { ...data.tasks, [newTaskId]: newTask };

    const columnId = data.columnOrders[0];
    const columnTaskIds = [...data.columns[columnId].taskIds, newTaskId];
    const newColumns = {
      ...data.columns,
      [columnId]: {
        ...data.columns[columnId],
        taskIds: columnTaskIds,
      },
    };

    if (inputRef.current)
      inputRef.current.focus();

    setData({ ...data, tasks: newTasks, columns: newColumns });
    setTask('');
  }, [data, task]);

  const onTaskChange = useCallback((e: any) => {
    setTask(e.target.value);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') onAddTask();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => { document.removeEventListener('keydown', handleKeyPress); };
  }, [onAddTask]);

  return (
    <FlexDiv>
      <InputText value={task ?? ''} onChange={onTaskChange} ref={inputRef} />
      <InputButton onClick={onAddTask}>Create</InputButton>
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
    </FlexDiv>
  );
}

export const App = React.memo(App_);
