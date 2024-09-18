declare module 'papaparse' {
    interface ParseConfig<T = any> {
      delimiter?: string;
      newline?: string;
      quoteChar?: string;
      escapeChar?: string;
      header?: boolean;
      dynamicTyping?: boolean | Record<string, boolean>;
      preview?: number;
      encoding?: string;
      worker?: boolean;
      comments?: boolean | string;
      step?: (results: ParseResult<T>, parser: any) => void;
      complete?: (results: ParseResult<T>) => void;
      error?: (error: any, file?: File) => void;
      download?: boolean;
      skipEmptyLines?: boolean | 'greedy';
      chunk?: (results: ParseResult<T>, parser: any) => void;
      fastMode?: boolean;
      withCredentials?: boolean;
      transform?: (value: string, field: string | number) => any;
    }
  
    interface ParseResult<T = any> {
      data: T[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
        fields?: string[];
      };
    }
  
    export function parse<T = any>(input: string | File, config?: ParseConfig<T>): ParseResult<T>;
  }
  