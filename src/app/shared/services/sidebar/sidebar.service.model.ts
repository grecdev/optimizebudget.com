type SidebarObservableState = Partial<{
  parentOpen: boolean;
  childOpen: boolean;
}>;

type ToggleSidebarOptions = SidebarObservableState;

export type { SidebarObservableState, ToggleSidebarOptions };
