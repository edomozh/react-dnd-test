import styled from 'styled-components';


export const InputText = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Button = styled.button`
  padding: 5px;
  font-size: 16px;
  background-color: #ccc;
  color: #000;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`;

export const Div = styled.div`
padding: 5px; 
margin: 5px; 
border: 1px solid black; 
border-radius: 5px;`;

export const FlexDiv = styled.div`
flex: 1;`;

export const BoardDiv = styled(Div)`
display: flex;
flex-direction: row;
border: none;
height: 75vh`;

export const TitleDiv = styled(Div)`
text-align: center; 
user-select: none;
border: none;`;

export const TaskDiv = styled(Div) <{ $isDragging?: boolean }>`
background-color: ${props => (props.$isDragging ? 'lightGreen' : 'white')};`;

export const ColumnDiv = styled(Div) <{ $isDraggingOver?: boolean }>`
flex: 1;
background-color: ${props => (props.$isDraggingOver ? 'lightBlue' : 'white')};
height: 100%`;

export interface TTask {
    id: string;
    title: string;
};

export interface TColumn {
    id: string;
    title: string;
    taskIds: string[];
};

export interface TInitialData {
    tasks: { [taskId: string]: TTask };
    columns: { [columnId: string]: TColumn };
    columnOrders: string[];
}

export const initialData = {
    tasks: {
        "task-1": { id: 'task-1', title: 'task-1 content' },
        "task-2": { id: 'task-2', title: 'task-2 content' },
        "task-3": { id: 'task-3', title: 'task-3 content' },
    },
    columns: {
        "column-1": {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        "column-2": {
            id: 'column-2',
            title: 'In Progress',
            taskIds: []
        },
        "column-3": {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        },
    },
    columnOrders: ['column-1', 'column-2', 'column-3']
};
