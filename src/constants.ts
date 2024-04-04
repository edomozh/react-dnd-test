import styled from 'styled-components';

export const Div = styled.div`padding: 5px; margin: 5px; border: 1px solid black; border-radius: 5px; background-color: white`;

export interface TTask {
    id: string;
    content: string;
};

export interface TColumn {
    id: string;
    title: string;
    taskIds: number[];
};

export const initialData = {
    tasks: {
        "task-1": { id: 'task-1', content: 'task-1 content' },
        "task-2": { id: 'task-2', content: 'task-2 content' },
        "task-3": { id: 'task-3', content: 'task-3 content' },
    },
    columns: {
        "column-1": {
            id: 'column-1',
            title: 'column-1 title',
            taskIds: ['task-1', 'task-2', 'task-3']
        }
    },
    columnOrders: ['column-1']
};