// Interface for defining a table filter
export interface ITableFilter {
  label: string; // Label for the filter option
  value: string; // Value used to filter the data
  options: string[] | IOption[]; // Array of options for the filter
}

// Interface for defining an option used in a filter
export interface IOption {
  label: string; // Label for the option
  value: string | number; // Value associated with the option
}

// Interface for defining an action that can be triggered from the table
export interface IAction {
  label: string; // Label for the action
  event: "click" | "hover"; // Event type to trigger the action
  icon: string; // Icon to represent the action
  value: string; // Value associated with the action
}

// Base interface for defining common properties for table column options
export interface IBaseTableColumnOptions {
  label: string; // Label for the column header
  type: "text" | "number" | "actions"; // Type of the column - text, number, or actions
  align?: "flex-start" | "center" | "flex-end" | "space-between"; // Alignment of column content horizontally
  verticalAlign?: "flex-start" | "center" | "flex-end"; // Alignment of column content vertically
  contentPadding?: string; // Padding for the content of the column
  headerAlign?: "left" | "center" | "right" | "justify"; // Alignment of the column header
  width?: string | number; // Width of the column
  minWidth?: string | number; // Minimum width of the column
  sort?: boolean; // Whether the column is sortable or not
  accessor?: never; // Property used to access data for the column (used only for text columns)
  default?: never; // Default value for the column (used only for text columns)
  actions?: never; // Actions associated with the column (used only for actions columns)
  formatter?: never; // Formatter options for the column (used only for text columns)
}

// Interface for defining column options for a text column
export interface ITextColumnOptions
  extends Omit<IBaseTableColumnOptions, "default" | "accessor" | "formatter"> {
  default?: string | number | boolean | null; // Default value for the column
  accessor: string; // Property used to access data for the column
  formatter?: IDateFormatterOptions; // Formatter options for the column (used for date formatting)
}

// Interface for defining date formatter options for a text column
export interface IDateFormatterOptions {
  type: "date"; // Type of the formatter (only supports date for now)
  format?: string; // Date format (e.g., "YYYY-MM-DD")
}

// Interface for defining column options for an actions column
export interface IActionsColumnOptions
  extends Omit<IBaseTableColumnOptions, "actions"> {
  actions: IAction[]; // Actions associated with the column
}

// Union type for all possible column options - text, number, or actions
export type ITableColumnOptions =
  | IBaseTableColumnOptions
  | IActionsColumnOptions
  | ITextColumnOptions;
