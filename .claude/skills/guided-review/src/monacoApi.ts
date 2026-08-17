/* Monaco arrives as a global from a cdn script rather than as a package, so the
 * parts of it this page touches are described here. Only what is actually
 * called is declared - this is a description of the page's use of monaco, not
 * an attempt at monaco's own d.ts.
 */

export type MonacoPosition = { lineNumber: number; column: number };

export type MonacoRange = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

export type MonacoUri = { toString: () => string };

export type MonacoDisposable = { dispose: () => void };

export type MonacoDecoration = {
  range: MonacoRange;
  options: {
    isWholeLine?: boolean;
    className?: string;
    glyphMarginClassName?: string;
    glyphMarginHoverMessage?: { value: string };
  };
};

export type MonacoDecorationsCollection = {
  set: (decorations: MonacoDecoration[]) => void;
};

export type MonacoViewZone = {
  afterLineNumber: number;
  heightInPx: number;
  suppressMouseDown: boolean;
  domNode: HTMLElement;
};

export type MonacoViewZoneAccessor = {
  addZone: (zone: MonacoViewZone) => string;
  removeZone: (id: string) => void;
};

export type MonacoMouseEvent = {
  target: { type: number; position: MonacoPosition | null };
};

export type MonacoTextModel = {
  onDidChangeContent: (listener: () => void) => MonacoDisposable;
  setValue: (value: string) => void;
  getValue: () => string;
  dispose: () => void;
};

export type MonacoCodeEditor = {
  createDecorationsCollection: (decorations: MonacoDecoration[]) => MonacoDecorationsCollection;
  changeViewZones: (callback: (accessor: MonacoViewZoneAccessor) => void) => void;
  addAction: (action: {
    id: string;
    label: string;
    contextMenuGroupId: string;
    keybindings: number[];
    run: (instance: MonacoCodeEditor) => void;
  }) => MonacoDisposable;
  onMouseMove: (listener: (event: MonacoMouseEvent) => void) => MonacoDisposable;
  onMouseLeave: (listener: () => void) => MonacoDisposable;
  onMouseDown: (listener: (event: MonacoMouseEvent) => void) => MonacoDisposable;
  getContentHeight: () => number;
  getPosition: () => MonacoPosition;
};

export type MonacoDiffEditor = {
  setModel: (models: { original: MonacoTextModel; modified: MonacoTextModel }) => void;
  getModifiedEditor: () => MonacoCodeEditor;
  onDidUpdateDiff: (listener: () => void) => MonacoDisposable;
  updateOptions: (options: Partial<MonacoDiffEditorOptions>) => void;
  layout: () => void;
  dispose: () => void;
};

export type MonacoDiffEditorOptions = {
  readOnly: boolean;
  originalEditable: boolean;
  renderSideBySide: boolean;
  /** monaco's own narrow-editor fallback to the inline view */
  useInlineViewWhenSpaceIsLimited: boolean;
  automaticLayout: boolean;
  glyphMargin: boolean;
  minimap: { enabled: boolean };
  scrollBeyondLastLine: boolean;
  renderOverviewRuler: boolean;
  fontSize: number;
  lineHeight: number;
  hideUnchangedRegions: { enabled: boolean; contextLineCount: number; minimumLineCount: number };
  scrollbar: { alwaysConsumeMouseWheel: boolean };
};

export type MonacoTypescriptDefaults = {
  setDiagnosticsOptions: (options: {
    noSemanticValidation: boolean;
    noSyntacticValidation: boolean;
    noSuggestionDiagnostics: boolean;
  }) => void;
  getCompilerOptions: () => Record<string, unknown>;
  setCompilerOptions: (options: Record<string, unknown>) => void;
};

export type MonacoApi = {
  editor: {
    createDiffEditor: (host: HTMLElement, options: MonacoDiffEditorOptions) => MonacoDiffEditor;
    createModel: (content: string, language: string, uri: MonacoUri) => MonacoTextModel;
    defineTheme: (
      name: string,
      theme: {
        base: string;
        inherit: boolean;
        rules: unknown[];
        colors: Record<string, string>;
      },
    ) => void;
    setTheme: (name: string) => void;
    MouseTargetType: { GUTTER_GLYPH_MARGIN: number };
  };
  Uri: { parse: (value: string) => MonacoUri };
  Range: new (
    startLineNumber: number,
    startColumn: number,
    endLineNumber: number,
    endColumn: number,
  ) => MonacoRange;
  KeyMod: { Alt: number };
  KeyCode: { KeyN: number };
  languages: {
    typescript: {
      typescriptDefaults: MonacoTypescriptDefaults;
      javascriptDefaults: MonacoTypescriptDefaults;
      JsxEmit: { Preserve: number };
      ScriptTarget: { ESNext: number };
    };
  };
};

/** the amd loader monaco's cdn build brings with it */
export type AmdLoader = {
  config: (options: { paths: Record<string, string> }) => void;
  (modules: string[], onLoaded: () => void): void;
};

declare global {
  interface Window {
    monaco?: MonacoApi;
    require?: AmdLoader;
    MonacoEnvironment?: { getWorkerUrl: () => string; baseUrl?: string };
  }
}
