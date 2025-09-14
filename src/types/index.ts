export interface NavItem {
  key: string;
  path: string;
  label: string;
  children?: NavItem[];
}