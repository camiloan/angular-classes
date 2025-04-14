import type { CanMatchFn, Route, UrlSegment } from '@angular/router';

export const isAdminGuard: CanMatchFn = (route:Route, segments:UrlSegment[]) => {
  return true;
};
