type Variable = {
  name: string;
  value: string;
};

export class TaskDto {
  id: string;
  name: string;
  processName: string;
  creationTime: string;
  completionTime: string | null;
  assignee: string | null;
  variables: Variable[];
  taskState: 'CREATED' | 'COMPLETED' | 'CANCELED';
  sortValues: [string, string];
  isFirst: boolean | null;
  formKey: string | null;
  processDefinitionId: string;
  taskDefinitionId: string;
}
