type BreakpointLevel = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type BreakpointRangeLimit = 'min' | 'max';
type Breakpoint = Record<BreakpointLevel, number>;

export type { Breakpoint, BreakpointLevel, BreakpointRangeLimit };
