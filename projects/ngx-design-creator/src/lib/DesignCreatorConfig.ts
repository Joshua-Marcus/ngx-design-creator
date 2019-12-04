import { Observable } from "rxjs";

export interface DesignCreatorConfig<T> {
  active: boolean;
  // data$: Observable<T[]>;
  // onDataUpdated?: (rows: T[]) => void;
  // debug?: boolean;
  // cacheId?: string;
  // // Actions
  // actions?: ActionDefinition<T>[];
  // actionsBulk?: ActionDefinitionBulk<T>[];
  // bulkSelectMaxCount?: number;
  // // Sorting and pagination
  // initialSort?: string;
  // initialSortDir?: "asc" | "desc";
  // pageSize?: number;
  // // Top bar configuration
  // hideFields?: string[];
  // hideFilter?: boolean;
  // hideHeader?: boolean;
  // hidePaginator?: boolean;
  // hideChooseColumns?: boolean;
  // filterText?: string;
  // // Export configuration
  // exportFilename?: string;
  // exportRowFormat?: (row: T) => void;
  // // Selection callbacks
  // onSelectItem?: (row: T) => void;
  // onSelectItemDoubleClick?: (row: T) => void;
  // onSelectedBulk?: (row: T[]) => void;
  // // Triggers
  // disableSelect?: boolean;
  // disableHoverEffect?: boolean;
  // selectFirstOnInit?: boolean;
  // $triggerClearSelected?: Observable<void>;
  // $triggerSelectItem?: Observable<T>;
}
