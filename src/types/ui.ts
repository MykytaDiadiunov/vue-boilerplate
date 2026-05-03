export type ButtonType =
  | 'default'
  | 'tertiary'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export interface HeaderActionItem {
  title: string;
  color_type?: ButtonType;
  routing: () => void;
}
