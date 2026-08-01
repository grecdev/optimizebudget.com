import { ActivatedRoute } from '@angular/router';

import { RouteSnapshotData } from '@shared/models/interfaces';

/**
 * @summary - Utility class for route specific functionality.
 */
class RouteUtil {
  /**
   * @summary - Maybe we have nested child routes and need to get its route specific data.
   *
   * @private
   * @returns {RouteSnapshotData | void}
   */
  public getDeepestRouteData(
    activatedRouteFirstChild: ActivatedRoute | null
  ): RouteSnapshotData | void {
    let currentRoute = activatedRouteFirstChild;

    if (!currentRoute) {
      return;
    }

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.snapshot.data as RouteSnapshotData;
  }
}

export { RouteUtil };
